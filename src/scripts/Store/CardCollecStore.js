import EventEmitter   from 'eventemitter3';
import assign         from "object-assign";
import _              from 'lodash';
import Console        from 'console-browserify';

import CardCollecDispatcher from '../Dispatcher/CardCollecDispatcher';

import *          as constOptions from '../data_options';

//*** DATA AND STATES ***//

//Source card ata, Should not be changed
let CardCollecSource = [];
//Source Senzai data
let CardCollecSenzai = [];
//Source card skill categories, should not change
let CardSkillCategories = assign(constOptions);
//Current list card data
let CardCollecList = [];
//Current settings of how to show cards
let ListingSettings = { paging: 10, sorting: 'id', ordering: 'desc', page: 0 };
//Current card filter configurations, need to init "filterText" attribute
let CardCollecFilter = {filterText: ""};
//Current selected and teamup cards
let CardCollecTeam = {
  selected: [],
  team: [],
  helper: -1,
  cnt: 0
};

// This mixin is to find that the card's property is in values(array) or not

_.mixin({
  'findByArray': function(collection, property, values) {
    return _.filter(collection, function(item) {
      return _.includes(values, _.get(item, property));
    });
  }
});

//Parse AS, SS Skill from card source, check if there's any redundent or unknow skill
function genSkillCategoriesFromSource(){
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
function filterChange(formObj, callback) {
  let searchObj = {
    props: _.map(formObj.props, 'value'),
    props2: _.map(formObj.props2, 'value'),
    breeds: _.map(formObj.breeds, 'value'),
    ranks: _.map(formObj.ranks, 'value'),
    as: _.map(formObj.as, 'value'),
    ss: _.map(formObj.ss, 'value'),
    as2: _.map(formObj.as2, 'value'),
    ss2: _.map(formObj.ss2, 'value'),
    zz: _.map(formObj.zz, 'value'),
    filterText: formObj.filterText
  };
  let res = CardCollecSource;

  //Filter card with empty name
  res = res.filter((card) => {
    return !card.name ? false : true;
  })

  if((searchObj.props.length + searchObj.props2.length + searchObj.breeds.length + searchObj.ranks.length + searchObj.filterText.length + searchObj.as.length + searchObj.ss.length + searchObj.as2.length + searchObj.ss2.length + searchObj.zz.length) == 0){
    CardCollecList = res;
    return callback();
  }
  if(searchObj.filterText.length > 0){
    res = _.filter(res, function(item){
      let str = item.id + item.name;
      return str.toLowerCase().indexOf(searchObj.filterText.toLowerCase()) !== -1;
    });
  }
  if(searchObj.props.length > 0){
    res = _.findByArray(res, "prop", searchObj.props);
  }
  if(searchObj.props2.length > 0){
    res = _.findByArray(res, "prop2", searchObj.props2);
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

  CardCollecList = res;
  return callback();
}

// Object to contact View

class CardCollecStore {
  constructor(dispatcher) {
    this.eventEmitter = new EventEmitter();
    this.dispatcher = dispatcher;
    this.changeEvent = 'change';
    this.dispatcher.register((action) => {
      this.invokeOnDispatch(action);
    });
  }
  getCardList() {
    return CardCollecList;
  }
  getCardSourceList() {
    return CardCollecSource;
  }
  getSenzaiList() {
    return CardCollecSenzai;
  }
  getSenzaiByName(name) {
    return _.find(CardCollecSenzai, {'name': name}) || _.find(CardCollecSenzai, {'name': '無'});
  }
  getSkillCategories(){
    return CardSkillCategories;
  }
  getLastFilter() {
    return CardCollecFilter;
  }
  getListing() {
    return ListingSettings;
  }
  getTeam() {
    return CardCollecTeam;
  }
  emitChange() {
    this.eventEmitter.emit(this.changeEvent);
  }
  addChangeListener(callback) {
    this.eventEmitter.addListener(this.changeEvent, callback);
  }
  removeChangeListener(callback) {
    this.eventEmitter.removeAllListeners(this.changeEvent); // dirty code because removelistener cannot remove ...
  }
  invokeOnDispatch(action) {
    switch(action.actionType){
      case 'InitCardData':
        CardCollecSource = action.data;
        CardCollecList = CardCollecSource;
        genSkillCategoriesFromSource();
        filterChange(CardCollecFilter, () => {
          this.emitChange();
        });
        break;
      case 'InitSenzaiData':
        CardCollecSenzai = action.data;
        break;
      case 'FilterChange':
        assign(CardCollecFilter, action.data);
        filterChange(CardCollecFilter, () => {
          this.emitChange();
        });
        break;
      case 'SetListing':
        ListingSettings[action.data[0]] = action.data[1];
        break;
      case 'UpdateTeam':
        CardCollecTeam = action.data;
        break;
      default:
        break;
    }
  }
}

export default new CardCollecStore(CardCollecDispatcher);
