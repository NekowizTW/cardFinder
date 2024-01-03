import atkUp from './atkUp';
import hpUp from './hpUp';
import {
  fetchValFromInfo,
  infoRegexChecker,
  initEffect,
  logDebug,
  strToInt,
} from './utils';

const combatEffectList = [
  {
    name: 'self hp up and atk down',
    regex: /HP上升\d+點，並減少\d+點攻擊力/,
    handler: ({ info }, team, tar) => {
      const effect1 = initEffect(team.length, 'hp');
      effect1.target[tar] = true;
      effect1.hp += strToInt(fetchValFromInfo(info, /HP上升(\d+)點/));

      const effect2 = initEffect(team.length, 'atk');
      effect2.target[tar] = true;
      effect2.atk -= strToInt(fetchValFromInfo(info, /減少(\d+)點攻擊力/));

      return [effect1, effect2];
    },
  },
  {
    name: 'self hp down and atk up',
    regex: /攻擊力上升1000點，並減少2000點HP/,
    handler: ({ info }, team, tar) => {
      const effect1 = initEffect(team.length, 'hp');
      effect1.target[tar] = true;
      effect1.hp += strToInt(fetchValFromInfo(info, /減少(\d+)點HP/));

      const effect2 = initEffect(team.length, 'atk');
      effect2.target[tar] = true;
      effect2.atk -= strToInt(fetchValFromInfo(info, /攻擊力上升(\d+)點/));

      return [effect1, effect2];
    },
  },
  {
    name: 'self damage ratio and affect hp up',
    regex: /將給予敵方的傷害變為\d.\d倍，並增加\d+點HP/,
    handler: ({ info }, team, tar) => {
      // TODO: add damage ratio
      const effect = initEffect(team.length, 'hp');
      effect.target[tar] = true;
      effect.hp += strToInt(fetchValFromInfo(info, /增加(\d+)點HP/));

      return effect;
    },
  },
  {
    name: 'self damage ratio and affect hp down',
    regex: /將給予敵方的傷害變為\d.\d倍，並減少\d+點HP/,
    handler: ({ info }, team, tar) => {
      // TODO: add damage ratio
      const effect = initEffect(team.length, 'hp');
      effect.target[tar] = true;
      effect.hp -= strToInt(fetchValFromInfo(info, /減少(\d+)點HP/));

      return effect;
    },
  },
  {
    name: 'combat hp up and atk up(seperated description)',
    regex: /攻擊力上升\d+點，HP上升\d+點/,
    handler: ({ info, ...attrs }, team, tar) => {
      // NOTE: rewrite senzai for sub calculation
      const { const1: val1, const2: val2 } = attrs;
      return [
        ...hpUp({
          info: info.replace(/攻擊力上升\d+點，/, ''),
          const: val1,
        }, team, tar),
        ...atkUp({
          info: info.replace(/，HP上升\d+點/, ''),
          const: val2,
        }, team, tar),
      ];
    },
  },
  {
    name: 'combat hp up and atk up(combine description)',
    regex: /攻擊力(和|與|及)HP/,
    handler: ({ info, ...attrs }, team, tar) => {
      const { const: val } = attrs;
      // FIXME: threr may be better way to deal this condition
      const costRemovedInfo = info.replace(/COST-\d+/, '');
      return [
        ...hpUp({
          info: costRemovedInfo.replace(/攻擊力(和|與|及)HP/, 'HP'),
          const: val,
        }, team, tar),
        ...atkUp({
          info: info.replace(/攻擊力(和|與|及)HP/, '攻擊力'),
          const: val,
        }, team, tar),
      ];
    },
  },
  {
    name: 'combat hp up and atk up(breed count for addition)',
    regex: /隊伍中(\S+)精靈越多又再上升/,
    handler: ({ info, ...attrs }, team, tar) => {
      const { breed } = attrs;
      const cnt = team.slice(0, 5)
        .reduce((acc, card) => acc + (card.breed === breed), 0);

      return [
        ...hpUp({
          info: `${breed}的HP上升${cnt * 100}點`,
          const: cnt * 100,
        }, team, tar),
        ...atkUp({
          info: `${breed}的攻擊力上升${cnt * 100}點`,
          const: cnt * 100,
        }, team, tar),
      ];
    },
  },
];

export default function combatEffect(szData, team, tar, debug = false) {
  const effectArr = combatEffectList.map(({ name, regex, handler }) => {
    if (!infoRegexChecker(szData.info, regex)) return { name, effect: undefined };

    const effect = handler(szData, team, tar);

    logDebug(`combatEffect/${name}`, effect, debug);

    return { name, effect };
  });

  const statistics = effectArr
    .map(({ effect }) => effect)
    .filter((effect) => !!effect)
    .flatMap((effect) => (Array.isArray(effect) ? effect : [effect]));

  logDebug('combatEffect/statistics', { szData, team, statistics }, debug);

  return statistics;
}
