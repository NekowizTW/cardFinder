import {
  initEffect,
  fetchValFromInfo,
  strToInt,
  logDebug,
} from './utils';
import atkUp from './atkUp';
import hpUp from './hpUp';

// case: self hp up and atk down
const selfHpUpAtkDown = ({ info }, team, tar) => {
  if (!/HP上升\d+點，並減少\d+點攻擊力/.test(info)) return undefined;

  const effect1 = initEffect(team.length, 'hp');
  effect1.target[tar] = true;
  effect1.hp += strToInt(fetchValFromInfo(info, /HP上升(\d+)點/));
  const effect2 = initEffect(team.length, 'atk');
  effect2.target[tar] = true;
  effect2.atk -= strToInt(fetchValFromInfo(info, /減少(\d+)點攻擊力/));
  return [effect1, effect2];
};

// case: self hp down and atk up
const selfHpDownAtkUp = ({ info }, team, tar) => {
  if (!/攻擊力上升1000點，並減少2000點HP/.test(info)) return undefined;

  const effect1 = initEffect(team.length, 'hp');
  effect1.target[tar] = true;
  effect1.hp += strToInt(fetchValFromInfo(info, /減少(\d+)點HP/));
  const effect2 = initEffect(team.length, 'atk');
  effect2.target[tar] = true;
  effect2.atk -= strToInt(fetchValFromInfo(info, /攻擊力上升(\d+)點/));
  return [effect1, effect2];
};

// case: self damage ratio and affect hp up
// TODO: add damage ratio
const selfDamageRatioAffectHpUp = ({ info }, team, tar) => {
  if (!/將給予敵方的傷害變為\d.\d倍，並增加\d+點HP/.test(info)) return undefined;

  const effect = initEffect(team.length, 'hp');
  effect.target[tar] = true;
  effect.hp += strToInt(fetchValFromInfo(info, /增加(\d+)點HP/));
  return effect;
};

// case: self damage ratio and affect hp down
// TODO: add damage ratio
const selfDamageRatioAffectHpDown = ({ info }, team, tar) => {
  if (!/將給予敵方的傷害變為\d.\d倍，並減少\d+點HP/.test(info)) return undefined;

  const effect = initEffect(team.length, 'hp');
  effect.target[tar] = true;
  effect.hp -= strToInt(fetchValFromInfo(info, /減少(\d+)點HP/));
  return effect;
};

// case: combat hp up and atk up
// note: rewrite senzai for sub calculation
const combatHpUpAtkUp1 = ({ info, ...attrs }, team, tar) => {
  if (!/攻擊力上升\d+點，HP上升\d+點/.test(info)) return undefined;

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
};
const combatHpUpAtkUp2 = ({ info, ...attrs }, team, tar) => {
  if (!/攻擊力(和|與|及)HP/.test(info)) return undefined;

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
};
const combatHpUpAtkUp3 = ({ info, ...attrs }, team, tar) => {
  if (!/隊伍中(\S+)精靈越多又再上升/.test(info)) return undefined;
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
};

export default function combatEffect(szData, team, tar, debug = false) {
  const effectArr = [
    selfHpUpAtkDown,
    selfHpDownAtkUp,
    selfDamageRatioAffectHpUp,
    selfDamageRatioAffectHpDown,
    combatHpUpAtkUp1,
    combatHpUpAtkUp2,
    combatHpUpAtkUp3,
  ].map((func) => ({
    trace: func.name,
    effect: func(szData, team, tar),
  }));

  logDebug({
    module: 'combatEffect', szData, team, effectArr,
  }, debug);

  return effectArr
    .map(({ effect }) => effect)
    .filter((effect) => !!effect)
    .flatMap((effect) => (Array.isArray(effect) ? effect : [effect]));
}
