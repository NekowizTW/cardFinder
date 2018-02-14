import EventEmitter   from 'eventemitter3';
import assign         from "object-assign";
import _              from 'lodash';
import Console        from 'console-browserify';

import CardCollecDispatcher from '../Dispatcher/CardCollecDispatcher';
import {ReduceStore} from 'flux/utils';

import *          as constOptions from '../data_options';

// This mixin is to find that the card's property is in values(array) or not
_.mixin({
  'findByArray': function(collection, property, values) {
    return _.filter(collection, function(item) {
      return _.includes(values, _.get(item, property));
    });
  },
  'findPureProps': function(collection, values) {
    return _.filter(collection, function(item) {
      let p2 = item.prop2 || '';
      return _.includes(values, item.prop) && p2.length === 0;
    });
  }
});

//Parse AS, SS Skill from card source, check if there's any redundent or unknow skill
//This function can be removed when skill auto-parse is done
function genSkillCategoriesFromSource(CardCollecSource, CardSkillCategories){
  let extracted = {};
  let attrsToCheck = [
    {name: 'SKILL_AS', path: 'asData'},
    {name: 'SKILL_SS', path: 'ssData'},
    {name: 'SKILL_AS2', path: 'as2Data'},
    {name: 'SKILL_SS2', path: 'ss2Data'}
  ];

  attrsToCheck.map(item => {
    let originalSkillList = CardSkillCategories[item.name];
    let parsedSkillList = _.uniq(CardCollecSource.map(o => {
      if(o[item.path]['type'] === undefined){
        console.log(item.name, '技能資料未定義', o.id);
      }
      return o[item.path]['type'];
    }));
    //console.log('SKILL_LIST:', item.name, parsedSkillList);
    for(let originslSkillItem of originalSkillList){
      if(parsedSkillList.indexOf(originslSkillItem.value) < 0 && !originslSkillItem.disabled){
        console.error('not used original skill category in', item.name, ':', originslSkillItem.value);
        originalSkillList.splice(originalSkillList.findIndex(o => o.value === originslSkillItem.value), 1);
      }
    }

    for(let parsedSkillItem of parsedSkillList){
      if (!originalSkillList.find(o => o.value === parsedSkillItem)){
        console.error('Unknown skill parsed in', item.name, ':', parsedSkillItem, 'Move to 其他 category.')
        originalSkillList.push({value: parsedSkillItem, label: parsedSkillItem, unknown: true});
      }
    }
  });

  /*CardSkillCategories = assign(CardSkillCategories, {
    SKILL_AS: _.uniq(CardCollecSource.map(obj => obj.asData.type)).filter(Boolean).map(str => ({'label':str, 'value':str})),
    SKILL_SS: _.uniq(CardCollecSource.map(obj => obj.ssData.type)).filter(Boolean).map(str => ({'label':str, 'value':str})),
    SKILL_AS2: _.uniq(CardCollecSource.map(obj => obj.as2Data.type)).filter(Boolean).map(str => ({'label':str, 'value':str})),
    SKILL_SS2: _.uniq(CardCollecSource.map(obj => obj.ss2Data.type)).filter(Boolean).map(str => ({'label':str, 'value':str}))
  });*/
}

// So use findByArray to filter props, breeds and ranks.
function filterCards(source, filterObj) {
  let searchObj = {
    props: _.map(filterObj.props, 'value'),
    props2: _.map(filterObj.props2, 'value'),
    breeds: _.map(filterObj.breeds, 'value'),
    ranks: _.map(filterObj.ranks, 'value'),
    as: _.map(filterObj.as, 'value'),
    ss: _.map(filterObj.ss, 'value'),
    as2: _.map(filterObj.as2, 'value'),
    ss2: _.map(filterObj.ss2, 'value'),
    zz: _.map(filterObj.zz, 'value'),
    filterTexts: filterObj.filterText || ''
  };

  let res = source;

  //Filter card with empty name
  res = res.filter((card) => {
    return !card.name ? false : true;
  })

  if(_.isEmpty(filterObj)){
    return res;
  }
  if(searchObj.filterTexts.length > 0){
    res = _.filter(res, function(card){
      let str = (card.id + card.name).toLowerCase();
      return searchObj.filterTexts.split(' ').some((filterText) => {
        return _.includes(str, filterText.toLowerCase())
      });
    });
  }
  if(searchObj.props.length > 0){
    res = _.findByArray(res, "prop", searchObj.props);
  }
  if(searchObj.props2.length > 0){
    let pure = _.intersection(searchObj.props, searchObj.props2);
    let resPure = _.findPureProps(res, pure);
    res = _.findByArray(res, "prop2", searchObj.props2);
    res = res.concat(resPure);
  }
  if(searchObj.breeds.length > 0){
    res = _.findByArray(res, "breed", searchObj.breeds);
  }
  if(searchObj.ranks.length > 0 && searchObj.ranks.indexOf('X') >= 0){
    searchObj.ranks.splice(searchObj.ranks.indexOf('X'),1);
    res = res.filter(o => !(o.evo_to) );
  }
  if(searchObj.ranks.length > 0){
    res = _.findByArray(res, "rank", searchObj.ranks);
  }
  if(searchObj.as.length > 0){
    res = _.findByArray(res, "asData.type", searchObj.as);
  }
  if(searchObj.ss.length > 0){
    res = _.findByArray(res, "ssData.type", searchObj.ss);
  }
  if(searchObj.as2.length > 0){
    res = _.findByArray(res, "as2Data.type", searchObj.as2);
  }
  if(searchObj.ss2.length > 0){
    res = _.findByArray(res, "ss2Data.type", searchObj.ss2);
  }
  if(searchObj.zz.length > 0){
    res = res.filter(o => {
      function zenzai_matched(zz_regex){
        return [
          o.senzaiL_4, o.senzaiL_3, o.senzaiL_2, o.senzaiL_1,
          o.senzai_10, o.senzai_9, o.senzai_8, o.senzai_7, o.senzai_6,
          o.senzai_5, o.senzai_4, o.senzai_3, o.senzai_2, o.senzai_1
        ].some((zz_string) => zz_regex.test(zz_string));
      }
      return searchObj.zz.some(zenzai_matched);
    });
  }
  return res;
}

function sortCards(list, sortkey, ordering){
    const rank_order = ['C+','B','B+','A','A+','S','S+','SS','SS+','L','LtoL'];
    ordering = ordering == 'desc'? -1 : 1;
    let self = this;
    return list.sort((a, b) => {
      if(sortkey === 'rank'){
        var attrA = rank_order.indexOf(a['rank']),
            attrB = rank_order.indexOf(b['rank']);
      }else{
        var attrA = parseInt(a[sortkey]),
            attrB = parseInt(b[sortkey]);
      }
      if(attrA < 0 || attrB < 0) {
        return (attrA - attrB) * -1;//(attrA - attrB); //Make minus value stay in the last
      }else{
        return (attrA - attrB) * ordering;
      }
    });
  }

function pagingAndSortCards(subset, settings){
  const position = settings['page'] * settings['paging']
  const maxPage = Math.ceil(subset.length / settings['paging']);
  
  const listCards = sortCards(subset, settings['sorting'], settings['ordering']).slice(position, parseInt(position) + parseInt(settings['paging']));

  return {
    listCards: listCards,
    maxPage: maxPage
  }
}

function getCardSubset( source, filter, settings){
  const subset = filterCards(source, filter);
  const {listCards, maxPage} = pagingAndSortCards(subset, settings);
  return {
    ListCards: listCards,
    ListSettings: Object.assign(settings, {maxPage: maxPage})
  }
}

// Object to contact View
class CardCollecStore extends ReduceStore {
//class CardCollecStore{
  getInitialState() {
    //*** INIT DATA AND STATES ***//
    return {
      //Source card data, Should not be changed
      SourceCards: [],
      //Source Senzai data
      SourceSenzai: [],
      //Source card skill categories, should not change
      SourceFilterSettings: {},
      //Current list card data
      ListCards: [],
      //Current settings of how to show cards
      ListSettings: { paging: 10, sorting: 'id', ordering: 'desc', page: 0,  maxPage: 0 },
      //Current card filter configurations
      ListFiltter: {},
      //Current selected and teamup cards
      TeamCards: {
        selected: [],
        team: [],
        helper: -1,
        cnt: 0
      }
    }
  }
  reduce(state, action) {
    switch(action.actionType){
      case 'InitCardData':
        genSkillCategoriesFromSource(action.data.card, constOptions); //remove this when new skill cate is done
        return Object.assign(
          {}, 
          state, 
          { SourceCards: action.data.card,
          SourceSenzai: action.data.senzai,
          SourceFilterSettings: assign(constOptions)}, 
          getCardSubset(action.data.card, state.ListFiltter, state.ListSettings)
        );
      case 'FilterChange':
        const new_filter = action.data;
        return Object.assign({}, state, {ListFiltter: new_filter },
          getCardSubset(state.SourceCards, new_filter, Object.assign(state.ListSettings, {page: 0}))
        );
      case 'ListingChange':
        const new_listing = Object.assign(state.ListSettings, action.data);
        return Object.assign({}, state, {
          ListSettings: new_listing},
          getCardSubset(state.SourceCards, state.ListFiltter, new_listing)
        );
      case 'UpdateTeam':
        return Object.assign({}, state, {
          TeamCards: action.data}
        );
      default:
        return state
    }
  }
  getCardById(id){
    return _.find(this.getState().SourceCards, { id: id })
  }
  getSenzaiList() {
    return this.getState().SourceSenzai;
  }
  getSenzaiByName(name) {
    return _.find(this.getState().SourceSenzai, {'name': name}) || _.find(this.getState().SourceSenzai, {'name': '無'});
  }
  getTeam() {
    return this.getState().TeamCards;
  }
  addChangeListener(callback) {
    this.eventEmitter.addListener(this.changeEvent, callback);
  }
  removeChangeListener(callback) {
    this.eventEmitter.removeAllListeners(this.changeEvent); // dirty code because removelistener cannot remove ...
  }
  displayCards(card_all, filter, listing){
    return card_all;
  }
}

export default new CardCollecStore(CardCollecDispatcher);
