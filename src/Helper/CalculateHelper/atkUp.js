import {
  initEffect, strToInt, infoRegexChecker, logDebug,
} from './utils';
import { BREEDS } from '../DataOptions';

const atkUpList = [
  {
    name: 'increase cost after atk up',
    regex: /COST/,
    handler: ({ info }, team, tar) => {
      const costIndex = info.indexOf('COST');
      if (!costIndex) return undefined;

      const effect = initEffect(team.length, 'cost');
      effect.target[tar] = true;
      effect.cost -= strToInt(info.slice(costIndex));
      return effect;
    },
  },
  {
    name: 'increase atk of self',
    regex: /^攻擊力上升\d+點/,
    handler: ({ const: val }, team, tar) => {
      const effect = initEffect(team.length, 'atk');
      effect.target[tar] = true;
      effect.atk += strToInt(val);
      return effect;
    },
  },
  {
    name: 'increase atk of specified main prop',
    regex: /^(火|水|雷)屬性(的)?(全體)?隊友(的)?攻擊力上升\d+點/,
    handler: ({
      info, elmts, const: val, const1: val1, const2: val2,
    }, team, tar) => {
      const effect = initEffect(team.length, 'atk');
      effect.target = team.map((card) => card.prop === elmts);
      // special case: leader
      if (/若為隊長時又再提升\d+點/.test(info) && tar === 0) {
        effect.atk += strToInt(val2, 10);
      } else {
        effect.atk += strToInt(val1) ?? strToInt(val);
      }
      return effect;
    },
  },
  {
    name: 'increase atk of specified wildcard main prop',
    regex: [
      /(火|水|雷)．(火|水|雷)屬性隊友的攻擊力上升\d+點/,
      /^隊友的攻擊力上升\d+點/,
    ],
    handler: ({ elmts = ['火', '水', '雷'], const: val }, team) => {
      const effect = initEffect(team.length, 'atk');
      effect.target = team.map((card) => elmts.includes(card.prop) >= 0);
      effect.atk += strToInt(val);
      return effect;
    },
  },
  {
    name: 'increase atk of all sub prop',
    regex: /^擁有複屬性/,
    handler: ({ const: val }, team) => {
      const effect = initEffect(team.length, 'atk');
      effect.target = team.map((card) => !!card.prop2.length);
      effect.atk += strToInt(val);
      return effect;
    },
  },
  {
    name: 'increase atk of non-light-dark sub prop',
    regex: /複屬性為火、水、雷屬性的隊友攻擊力上升\d+點/,
    handler: ({ const: val }, team) => {
      const effect = initEffect(team.length, 'atk');
      effect.target = team.map((card) => /(火|水|雷)/.test(card.prop2));
      effect.atk += strToInt(val);
      return effect;
    },
  },
  {
    name: 'increase atk of specified sub prop(condition value split)',
    regex: /複屬性為(火|水|雷|光|闇)屬性的(全體)?隊友(，)?攻擊力上升\d+點/,
    handler: ({ elmts, const: val }, team) => {
      const effect = initEffect(team.length, 'atk');
      effect.target = team.map((card) => elmts.includes(card.prop2));
      effect.atk += strToInt(val);
      return effect;
    },
  },
  {
    name: 'increase atk of specified sub prop(condition value merged)',
    regex: /提升複屬性為(火|水|雷|光|闇)屬性的(全體)?隊友(，)?\d+攻擊力/,
    handler: ({ elmts, const: val }, team) => {
      const effect = initEffect(team.length, 'atk');
      effect.target = team.map((card) => card.prop2 === elmts);
      effect.atk += strToInt(val);
      return effect;
    },
  },
  {
    name: 'increase atk of main prop only',
    regex: /^單(色)?(火|水|雷)屬性精靈的攻擊力上升\d+點/,
    handler: ({ elmts, const: val }, team) => {
      const effect = initEffect(team.length, 'atk');
      effect.target = team.map((card) => `${card.prop}${card.prop2}` === elmts);
      effect.atk += strToInt(val);
      return effect;
    },
  },
  {
    name: 'increase atk up of specified props(main required sub optional)',
    regex: /(火|水|雷)屬性隊友攻擊力上升\d+點，複屬性為(火|水|雷|光|闇)屬性時又再上升\d+點/,
    handler: ({ elmts, const1: val1, const2: val2 }, team) => {
    // main prop effect
      const effect1 = initEffect(team.length, 'atk');
      effect1.target = team.map((card) => card.prop === elmts[0]);
      effect1.atk += strToInt(val1);
      // sub prop optional
      const effect2 = initEffect(team.length, 'atk');
      effect2.target = team.map((card) => `${card.prop}${card.prop2}` === elmts);
      effect2.atk += strToInt(val2) - strToInt(val1);

      return [effect1, effect2];
    },
  },
  {
    name: 'increase atk of specified breed',
    regex: BREEDS.map(({ value }) => new RegExp(`${value}`)),
    handler: ({ info, const: val }, team) => {
      const affectBreeds = BREEDS.map(({ value }) => value).filter((breed) => info.includes(breed));
      const effect = initEffect(team.length, 'atk');
      effect.atk += strToInt(val);
      effect.target = team.map(
        (card) => affectBreeds.includes(card.breed),
      );
      return effect;
    },
  },
];

export default function atkUp(szData, team, tar, debug = false) {
  const effectArr = atkUpList.map(({ name, regex, handler }) => {
    if (infoRegexChecker(szData.info, regex)) return { name, flag: undefined };

    logDebug(`atkUp/${name}`, { szData, team }, debug);

    return { name, effect: handler(szData, team, tar) };
  });

  return effectArr
    .map(({ effect }) => effect)
    .filter((effect) => !!effect)
    .flatMap((effect) => (Array.isArray(effect) ? effect : [effect]));
}
