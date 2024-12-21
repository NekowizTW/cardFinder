import atkUp from './atkUp';
import cdDown from './cdDown';
import combatEffect from './combatEffect';
import {
  conditionFlag,
  skillRelative,
} from './ConditionFlag';
import costDown from './costDown';
import {
  globalFlag,
  groupGlobal,
  mindRelative,
  recoverRelative,
} from './GlobalFlag';
import hpUp from './hpUp';
import { logDebug } from './utils';

export default function CalculateHelper(team) {
  // 1. variable initialize
  const errorSenzai = [];
  const debug = import.meta.env.MODE === 'development';
  const calculated = Array.from(
    { length: team.length },
    () => ({
      hp: 0,
      atk: 0,
      cost: 0,
      cdf: 0,
      cds: 0,
    }),
  );
  const certainFlags = [];
  let globalFlags = {};
  let effectArr = [];
  let flagArr = [];

  // 2. prepare pure function
  function handleEffectAndFlags(effect, targetIndex) {
    const keys = Object.keys(effect);

    if (keys.indexOf('global') >= 0) {
      if (effect.global) {
        globalFlags = groupGlobal(globalFlags, effect);
      } else {
        certainFlags.push(effect);
      }
    } else if (effect.target[targetIndex]) {
      if (keys.indexOf('hp') >= 0) calculated[targetIndex].hp += effect.hp;
      if (keys.indexOf('atk') >= 0) calculated[targetIndex].atk += effect.atk;
      if (keys.indexOf('cost') >= 0) calculated[targetIndex].cost += effect.cost;
      if (keys.indexOf('cdf') >= 0) calculated[targetIndex].cdf += effect.cdf;
      if (keys.indexOf('cds') >= 0) calculated[targetIndex].cds += effect.cds;
    }
  }

  function handleSenzai(szData, tar) {
    let subEffectArr = [];
    const subFlagArr = [];

    switch (szData.type) {
      case '攻擊力上升':
      case '複屬性攻擊力上升':
        subEffectArr = atkUp(szData, team, tar, debug);
        break;
      case 'HP上升':
      case '複屬性HP上升':
        subEffectArr = hpUp(szData, team, tar, debug);
        break;
      case '減少COST':
        subEffectArr = costDown(szData, team, tar, debug);
        break;
      case '快速技能':
        subEffectArr = cdDown(szData, team, tar, debug);
        break;
      case 'HP上升＆攻擊力下降':
      case '提升傷害＆HP上升':
      case '提升傷害＆HP下降':
      case '攻擊力上升＆HP下降':
      case '攻擊力和HP上升':
      case '攻擊力與HP上升':
      case '種族攻擊力和HP上升':
      case '複屬性攻擊力和HP上升':
      case '複屬性攻擊力與HP上升':
        subEffectArr = combatEffect(szData, team, tar, debug);
        break;
      case 'EXP0':
      case 'EXP上升':
      case 'EXP和金幣上升':
      case '契約經驗值上升':
      case '寶箱出現率上升':
      case '掉寶率上升':
      case '減少難易度':
      case '答題技能延長':
      case '答題重置':
      case '問題類型屬性提昇':
      case '問題類型提昇':
      case '防禦連鎖':
      case '提升連鎖':
        subEffectArr = globalFlag(szData, team, debug);
        break;
      case '心眼':
        subEffectArr = mindRelative(szData, team, debug);
        break;
      case '戰鬥結束後HP回復':
        subEffectArr = recoverRelative(szData, team, debug);
        break;
      case 'HP‧攻擊力反轉':
      case '九死一生':
      case '更換精靈':
      case '減輕屬性傷害':
      case '減輕種族傷害':
        subEffectArr = conditionFlag(szData, team, tar, debug);
        break;
      case '答題技能強化':
      case '特殊技能強化':
        subEffectArr = skillRelative(szData, team, tar, debug);
        break;
      default:
        break;
    }

    for (const subEffect of subEffectArr) {
      for (const [key, value] of Object.entries(subEffect)) {
        if (typeof value === 'undefined' || Number.isNaN(value)) {
          throw new Error(`NaN Value Appeared in key: ${key}`);
        }
      }
    }
    effectArr = [...effectArr, ...subEffectArr];

    for (const subFlag of subFlagArr) {
      for (const [key, value] of Object.entries(subFlag)) {
        if (typeof value === 'undefined') {
          throw new Error(`NaN Value Appeared in key: ${key}`);
        }
      }
    }
    flagArr = [...flagArr, ...subFlagArr];
  }

  for (const [tar, teamSlot] of team.entries()) {
    const sz = [...teamSlot.sz, ...teamSlot.exs];

    for (const szData of sz) {
      const updatedSzData = szData.info.length !== 0
        ? szData
        : { ...szData, info: szData.name };

      try {
        if (debug) {
          // eslint-disable-next-line no-console
          logDebug('index/pending', szData, debug);
        }
        handleSenzai(updatedSzData, tar);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(`Parsing error on senzai ${updatedSzData.name}(${updatedSzData.info}): ${e}`);
        errorSenzai.push(`${updatedSzData.name}: ${updatedSzData.info}`);
      }
    }
  }

  effectArr.forEach((effect, index) => {
    handleEffectAndFlags(effect, index);
  });

  logDebug('index/statistics', {
    calculated, globalFlags, certainFlags, errorSenzai,
  }, debug);

  return {
    calculated,
    globalFlags,
    certainFlags,
    errorSenzai,
  };
}
