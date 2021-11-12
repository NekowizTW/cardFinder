import atkUp        from './CalculateHelper/AtkUp.js'
import hpUp         from './CalculateHelper/HpUp.js'
import costDown     from './CalculateHelper/CostDown.js'
import cdDown       from './CalculateHelper/CdDown.js'
import hpatk_Effect from './CalculateHelper/HpAtk_Effect.js'

import { globalFlag,
         mindRelative,
         recoverRelative,
         groupGlobal }     from './CalculateHelper/GlobalFlag.js'
import { conditionFlag,
         skillRelative }   from './CalculateHelper/ConditionFlag.js'

export function calcSenzai (team) {
  // console.log(team)
  const debug = false;
  let hpa   = Array(team.length).fill(0),
      atka  = Array(team.length).fill(0),
      costa = Array(team.length).fill(0),
      cdfa  = Array(team.length).fill(0),
      cdsa  = Array(team.length).fill(0),
      flags = { global: {}, certain: [] }
  let effectArr = [], flagArr = []
  for (let tar = team.length - 1; tar >= 0; tar--) {
    // scan the senzai
    const sz = [...team[tar].sz, ...team[tar].ex];
    for (let j = sz.length - 1; j >= 0; j--) {
      const szData = sz[j].info.length !== 0 ? sz[j] :
                      Object.assign(sz[j], { info: sz[j].name})
      // console.log(`szData: ${JSON.stringify(szData)}`)
      switch(szData.type){
        case '攻擊力上升':
        case '複屬性攻擊力上升':
          effectArr = [...effectArr, ...atkUp(szData, team, tar, debug)]
          break
        case 'HP上升':
        case '複屬性HP上升':
          effectArr = [...effectArr, ...hpUp(szData, team, tar, debug)]
          break
        case '減少COST':
          effectArr = [...effectArr, ...costDown(szData, team, tar, debug)]
          break
        case '快速技能':
          effectArr = [...effectArr, ...cdDown(szData, team, tar, debug)]
          break
        case 'HP上升＆攻擊力下降':
        case '提升傷害＆HP上升':
        case '提升傷害＆HP下降':
        case '攻擊力上升＆HP下降':
        case '攻擊力和HP上升':
        case '攻擊力與HP上升':
        case '種族攻擊力和HP上升':
        case '複屬性攻擊力和HP上升':
        case '複屬性攻擊力與HP上升':
          effectArr = [...effectArr, ...hpatk_Effect(szData, team, tar, debug)]
          break
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
          effectArr = [...effectArr, ...globalFlag(szData, team, tar, debug)]
          break
        case '心眼':
          effectArr = [...effectArr, ...mindRelative(szData, team, debug)]
          break
        case '戰鬥結束後HP回復':
          effectArr = [...effectArr, ...recoverRelative(szData, team, debug)]
          break
        case 'HP‧攻擊力反轉':
        case '九死一生':
        case '更換精靈':
        case '減輕屬性傷害':
        case '減輕種族傷害':
          effectArr = [...effectArr, ...conditionFlag(szData, team, tar, debug)]
          break
        case '答題技能強化':
        case '特殊技能強化':
          effectArr = [...effectArr, ...skillRelative(szData, team, tar, debug)]
          break
        default:
          break
      }
    }
  }

  // console.log([hpa, atka, costa, cdfa, cdsa])
  effectArr.forEach(effect => {
    // console.log(`Effect: ${JSON.stringify(effect)}`)
    const keys = Object.keys(effect)
    if (keys.indexOf('global') >= 0) {
      if (effect.global)
        flags.global = groupGlobal(flags.global, effect)
      else {
        for (const idx in effect.target)
          if (effect.target[idx])
            flags.certain.push(effect)
      }
    } else {
      for (const idx in effect.target) {
        if (!effect.target[idx])
          continue;

        if (keys.indexOf('hp')   >= 0)
          hpa[idx]   += effect.hp
        if (keys.indexOf('atk')  >= 0)
          atka[idx]  += effect.atk
        if (keys.indexOf('cost') >= 0)
          costa[idx] += effect.cost
        if (keys.indexOf('cdf')  >= 0)
          cdfa[idx]  += effect.cdf
        if (keys.indexOf('cds')  >= 0)
          cdsa[idx]  += effect.cds
      }
    }
    // console.log([hpa, atka, costa, cdfa, cdsa])
  })

  return [hpa, atka, costa, cdfa, cdsa, flags];
}