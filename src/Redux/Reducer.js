import assign     from "object-assign";
import _          from 'lodash';
import { logger } from 'log-prettier';

import * as constOptions from '../Helper/DataOptions.js';

// This mixin is to find that the card's property is in values(array) or not
_.mixin({
  'findByArray': (collection, property, values) => {
    return _.filter(collection, item => {
      return _.includes(values, _.get(item, property));
    });
  },
  'findPureProps': (collection, values) => {
    return _.filter(collection, item => {
      let p2 = item.prop2 || '';
      return _.includes(values, item.prop) && p2.length === 0;
    });
  }
});

//Parse AS, SS Skill from card source, check if there's any redundent or unknow skill
//This function can be removed when skill auto-parse is done
function genSkillCategoriesFromSource(CardCollecSource, CardSkillCategories){
  let extracted = {}
  let attrsToCheck = [
    { name: 'SKILL_AS', path: 'asData' },
    { name: 'SKILL_SS', path: 'ssData' },
    { name: 'SKILL_AS2', path: 'as2Data' },
    { name: 'SKILL_SS2', path: 'ss2Data' },
    { name: 'EXAS_Type', path: 'EXASData' }
  ]

  attrsToCheck.map(item => {
    // modified for two layer skill list
    let originalSkillList = CardSkillCategories[item.name].reduce((collection, item) => {
      if (Object.keys(item).indexOf('options') >= 0) collection.push(...item.options);
      else collection.push(item);
      return collection;
    }, []);
    let parsedSkillList = _.uniq(CardCollecSource.reduce((r, o) => {
      if (o[item.path] === undefined) return r;
      if (o[item.path]['type'] === undefined) {
        logger.info(`[Skill Scanner: ${item.name}] No. ${o.id} 的技能資料未定義`);
      }
      r.push(o[item.path]['type']);
      return r;
    }, []))

    if (item.name.indexOf('AS') >= 0) {
      // convert regex to string in CardSkillCategories
      originalSkillList = originalSkillList.map(o => {
        let r = Object.assign({}, o);
        r.value = r.value.toString().substring(1, r.value.toString().length - 1)
                    .replaceAll(/[\\\^\$]/g, '');
        return r;
      });
      // split all parsedSkill in parsedSkillList, and uniq again
      let parsedSkillListReCollect = [];
      parsedSkillList.forEach(o => {
        if (typeof o === 'undefined') return;
        let parsedSkillListItemSplit = o.split(/[・‧]+/);
        parsedSkillListReCollect = [...parsedSkillListReCollect, ...parsedSkillListItemSplit];
      });
      parsedSkillList = _.uniq(parsedSkillListReCollect);
    }

    // logger.debug('SKILL_LIST:', item.name, parsedSkillList);
    for (let originslSkillItem of originalSkillList) {
      if (parsedSkillList.indexOf(originslSkillItem.value) < 0 && !originslSkillItem.isDisabled) {
        logger.warn(`[Skill Scanner: ${item.name}] Category not used: ${originslSkillItem.value}`);
        originalSkillList.splice(originalSkillList.findIndex(o => o.value === originslSkillItem.value), 1);
      }
    }

    for (let parsedSkillItem of parsedSkillList) {
      if (!originalSkillList.find(o => o.value === parsedSkillItem)) {
        logger.warn(`[Skill Scanner: ${item.name}] Unknown skill ${parsedSkillItem}, move to 其他 category.`)
        originalSkillList.push({value: parsedSkillItem, label: parsedSkillItem, unknown: true});
      }
    }
  })

  /*CardSkillCategories = assign(CardSkillCategories, {
    SKILL_AS: _.uniq(CardCollecSource.map(obj => obj.asData.type)).filter(Boolean).map(str => ({'label':str, 'value':str})),
    SKILL_SS: _.uniq(CardCollecSource.map(obj => obj.ssData.type)).filter(Boolean).map(str => ({'label':str, 'value':str})),
    SKILL_AS2: _.uniq(CardCollecSource.map(obj => obj.as2Data.type)).filter(Boolean).map(str => ({'label':str, 'value':str})),
    SKILL_SS2: _.uniq(CardCollecSource.map(obj => obj.ss2Data.type)).filter(Boolean).map(str => ({'label':str, 'value':str}))
  });*/
}

// So use findByArray to filter props, breeds and ranks.
function filterCards (source, filterObj) {
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
    onlyHaifu: filterObj.onlyHaifu || false,
    exasCondition: _.map(filterObj.exasCondition, 'value'),
    exasType: _.map(filterObj.exasType, 'value'),
    filterTexts: filterObj.filterText || ''
  }

  let res = source;

  //Filter card with empty name
  res = res.filter(card => {
    return !card.name ? false : true;
  })

  if (_.isEmpty(filterObj)) {
    return res;
  }
  if (searchObj.filterTexts.length > 0) {
    res = _.filter(res, card => {
      let str = (card.id + card.name).toLowerCase();
      return searchObj.filterTexts.split(' ').every(filterText => {
        return _.includes(str, filterText.toLowerCase())
      });
    });
  }
  if (searchObj.props.length > 0) {
    res = _.findByArray(res, "prop", searchObj.props);
  }
  if (searchObj.props2.length > 0) {
    let pure = _.intersection(searchObj.props, searchObj.props2);
    let resPure = _.findPureProps(res, pure);
    res = _.findByArray(res, "prop2", searchObj.props2);
    res = res.concat(resPure);
  }
  if (searchObj.breeds.length > 0) {
    res = _.findByArray(res, "breed", searchObj.breeds);
  }
  if (searchObj.onlyHaifu) {
    res = _.filter(res, o => {
      return o.obtainType !== undefined && o.obtainType.type === 'haifu';
    });
  }
  if (searchObj.ranks.length > 0 && searchObj.ranks.indexOf('X') >= 0) {
    searchObj.ranks.splice(searchObj.ranks.indexOf('X'),1);
    res = res.filter(o => !(o.evo_to) );
  }
  if (searchObj.ranks.length > 0) {
    res = _.findByArray(res, "rank", searchObj.ranks);
  }
  if (searchObj.as.length > 0) {
    res = res.filter(o => {
      if (o.asData === undefined || o.asData.type === undefined) return false;
      const asTypeMatched = asTypeRegex => {
        return o.asData.type.split(/[・‧]+/)
          .some(asTypeString => asTypeRegex.test(asTypeString));
      }
      return searchObj.as.every(asTypeMatched);
    });
  }
  if (searchObj.ss.length > 0) {
    res = _.findByArray(res, "ssData.type", searchObj.ss);
  }
  if (searchObj.as2.length > 0) {
    res = res.filter(o => {
      if (o.as2Data === undefined || o.as2Data.type === undefined) return false;
      const as2TypeMatched = as2TypeRegex => {
        return o.as2Data.type.split(/[・‧]+/)
          .some(as2TypeString => as2TypeRegex.test(as2TypeString));
      }
      return searchObj.as2.every(as2TypeMatched);
    });
  }
  if (searchObj.ss2.length > 0) {
    res = _.findByArray(res, "ss2Data.type", searchObj.ss2);
  }
  if (searchObj.zz.length > 0) {
    res = res.filter(o => {
      const zenzai_matched = zz_regex => {
        return [
          o.senzaiL_4, o.senzaiL_3, o.senzaiL_2, o.senzaiL_1,
          o.senzai_10, o.senzai_9, o.senzai_8, o.senzai_7, o.senzai_6,
          o.senzai_5, o.senzai_4, o.senzai_3, o.senzai_2, o.senzai_1
        ].some(zz_string => zz_regex.test(zz_string));
      }
      return searchObj.zz.every(zenzai_matched);
    });
  }
  if (searchObj.exasCondition.length > 0) {
    res = res.filter(o => {
      if (typeof o.EXASData === 'undefined') return false;
      const exasConditionMatched = exasConditionRegex => {
        return exasConditionRegex.test(o.EXASData.condition);
      }
      return searchObj.exasCondition.every(exasConditionMatched);
    });
  }
  if (searchObj.exasType.length > 0) {
    res = res.filter(o => {
      if (typeof o.EXASData === 'undefined') return false;
      const exasTypeMatched = exasTypeRegex => {
        return o.EXASData.type.split(/[・‧]+/)
          .some(exasTypeString => exasTypeRegex.test(exasTypeString));
      }
      return searchObj.exasType.every(exasTypeMatched);
    });
  }
  return res;
}

function sortCards (list, sortkey, ordering) {
  const rank_order = ['C+','B','B+','A','A+','S','S+','SS','SS+','L','LtoL']
  ordering = ordering === 'desc' ? -1 : 1
  return list.sort((a, b) => {
    let attrA, attrB;
    if (sortkey === 'rank') {
      attrA = rank_order.indexOf(a['rank']);
      attrB = rank_order.indexOf(b['rank']);
    } else if (sortkey === 'cdf' || sortkey === 'cds') {
      attrA = a.ssData[sortkey] !== null ? parseInt(a.ssData[sortkey]) : 99;
      attrB = b.ssData[sortkey] !== null ? parseInt(b.ssData[sortkey]) : 99;
    } else {
      attrA = parseInt(a[sortkey]);
      attrB = parseInt(b[sortkey]);
    }
    if (attrA === attrB) {
      attrA = parseInt(a['id']);
      attrB = parseInt(b['id']);
    }
    if (attrA < 0 || attrB < 0) {
      return (attrA - attrB) * -1; // (attrA - attrB); //Make minus value stay in the last
    } else {
      return (attrA - attrB) * ordering;
    }
  });
}

function pagingAndSortCards (subset, settings) {
  const position = settings['page'] * settings['paging']
  const totalCount = subset.length
  const maxPage = Math.ceil(totalCount / settings['paging'])
  
  const listCards = sortCards(subset, settings['sorting'], settings['ordering'])
                      .slice(position, parseInt(position) + parseInt(settings['paging']))

  return {
    listCards: listCards,
    totalCount: totalCount,
    maxPage: maxPage
  }
}

function getCardSubset (source, filter, settings) {
  const subset = filterCards(source, filter);
  const { listCards, totalCount, maxPage } = pagingAndSortCards(subset, settings);
  return {
    ListCards: listCards,
    ListSettings: Object.assign(settings, {totalCount: totalCount, maxPage: maxPage})
  }
}

export default function Reducer (state, action) {
  switch (action.type) {
    case 'InitCardData':
      genSkillCategoriesFromSource(action.payload.card, constOptions); //remove this when new skill cate is done
      return Object.assign({}, state, 
        {
          SourceCards: action.payload.card,
          SourceSenzai: action.payload.senzai,
          SourceEXCards: action.payload.exCard,
          SourceLeaderEXCards: action.payload.leaderEXCards,
          SourceFilterSettings: assign(constOptions)
        }, 
        getCardSubset(action.payload.card, state.ListFiltter, state.ListSettings)
      )
    case 'FilterChange':
      const new_filter = action.payload;
      return Object.assign({}, state,
        {
          ListFiltter: new_filter
        },
        getCardSubset(state.SourceCards, new_filter, Object.assign(state.ListSettings, { page: 0 }))
      )
    case 'ListingChange':
      const new_listing = Object.assign(state.ListSettings, action.payload);
      return Object.assign({}, state,
        {
          ListSettings: new_listing
        },
        getCardSubset(state.SourceCards, state.ListFiltter, new_listing)
      )
    case 'UpdateTeam':
      return Object.assign({}, state, { TeamCards: action.payload })
    default:
      return state;
  }
}