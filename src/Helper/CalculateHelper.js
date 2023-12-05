import { logger } from 'log-prettier';

import atkUp from './CalculateHelper/atkUp';
import hpUp from './CalculateHelper/hpUp';
import costDown from './CalculateHelper/costDown';
import cdDown from './CalculateHelper/cdDown';
import combatEffect from './CalculateHelper/combatEffect';

import {
  globalFlag,
  mindRelative,
  recoverRelative,
  groupGlobal,
} from './CalculateHelper/GlobalFlag';
import {
  conditionFlag,
  skillRelative,
} from './CalculateHelper/ConditionFlag';

// eslint-disable-next-line import/prefer-default-export
export function calcSenzai(team) {
  // console.log(team)
  const errorSenzai = [];
  const debug = true;
  const hpa = Array(team.length).fill(0);
  const atka = Array(team.length).fill(0);
  const costa = Array(team.length).fill(0);
  const cdfa = Array(team.length).fill(0);
  const cdsa = Array(team.length).fill(0);
  const flags = { global: {}, certain: [] };
  let effectArr = []; let
    flagArr = [];
  for (let tar = team.length - 1; tar >= 0; tar--) {
    // scan the senzai
    const sz = [...team[tar].sz, ...team[tar].ex];
    for (let j = sz.length - 1; j >= 0; j--) {
      const szData = sz[j].info.length !== 0 ? sz[j]
        : Object.assign(sz[j], { info: sz[j].name });
      // console.log(`szData: ${JSON.stringify(szData)}`)
      try {
        let subEffectArr = []; const
          subFlagArr = [];
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
            subEffectArr = globalFlag(szData, team, tar, debug);
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

        // check if there are undefined value
        for (const subEffect of subEffectArr) {
          for (const key in subEffect) {
            if (typeof subEffect[key] === 'undefined') { throw 'NaN Value Appeared.'; }
          }
        }
        effectArr = [...effectArr, ...subEffectArr];
        for (const subFlag of subFlagArr) {
          for (const key in subFlag) {
            if (typeof subFlag[key] === 'undefined') { throw 'NaN Value Appeared.'; }
          }
        }
        flagArr = [...flagArr, ...subFlagArr];
      } catch (e) {
        logger.error(`Parsing error on senzai ${szData.name}: ${e}`);
        errorSenzai.push(szData.name);
      }
    }
  }

  // console.log([hpa, atka, costa, cdfa, cdsa])
  effectArr.forEach((effect) => {
    // console.log(`Effect: ${JSON.stringify(effect)}`)
    const keys = Object.keys(effect);
    if (keys.indexOf('global') >= 0) {
      if (effect.global) { flags.global = groupGlobal(flags.global, effect); } else {
        for (const idx in effect.target) {
          if (effect.target[idx]) { flags.certain.push(effect); }
        }
      }
    } else {
      for (const idx in effect.target) {
        if (!effect.target[idx]) { continue; }

        if (keys.indexOf('hp') >= 0) { hpa[idx] += effect.hp; }
        if (keys.indexOf('atk') >= 0) { atka[idx] += effect.atk; }
        if (keys.indexOf('cost') >= 0) { costa[idx] += effect.cost; }
        if (keys.indexOf('cdf') >= 0) { cdfa[idx] += effect.cdf; }
        if (keys.indexOf('cds') >= 0) { cdsa[idx] += effect.cds; }
      }
    }
    // console.log([hpa, atka, costa, cdfa, cdsa])
  });
  console.log([hpa, atka, costa, cdfa, cdsa, flags]);

  return {
    calculated: [hpa, atka, costa, cdfa, cdsa, flags],
    errorSenzai,
  };
}
