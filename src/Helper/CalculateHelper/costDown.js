import {
  initEffect,
  fetchValFromInfo,
  strToInt,
  infoRegexChecker,
  logDebug,
} from './utils';

// case: self cost down
const costDownList = [
  {
    name: 'decrease cost on self',
    regex: /(隊伍)?COST-\d+/,
    handler: ({ const: val }, team, tar) => {
      const effect = initEffect(team.length, 'cost');
      effect.target[tar] = true;
      effect.cost -= strToInt(val);
      return effect;
    },
  },
  {
    name: 'decrease hp on decrease cost',
    regex: /^減少\d+HP/,
    handler: ({ info }, team, tar) => {
      const effect = initEffect(team.length, 'hp');
      effect.target[tar] = true;
      effect.hp -= strToInt(fetchValFromInfo(info, /^減少(\d+)HP/));
      return effect;
    },
  },
  {
    name: 'increase hp on decrease cost',
    regex: /^HP上升\d+點/,
    handler: ({ info }, team, tar) => {
      const effect = initEffect(team.length, 'hp');
      effect.target[tar] = true;
      effect.hp += strToInt(fetchValFromInfo(info, /^HP上升\d+點/));
      return effect;
    },
  },
];

export default function costDown(szData, team, tar, debug = false) {
  const effectArr = costDownList.map(({ name, regex, handler }) => {
    if (infoRegexChecker(szData.info, regex)) return { name, flag: undefined };

    return { name, flag: handler(szData, team, tar) };
  });

  logDebug({
    module: 'costDown', szData, team, effectArr,
  }, debug);

  return effectArr
    .map(({ effect }) => effect)
    .filter((effect) => !!effect)
    .flatMap((effect) => (Array.isArray(effect) ? effect : [effect]));
}
