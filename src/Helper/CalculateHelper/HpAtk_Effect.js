import { initEffect,
         fetchValFromInfo } from './Utils.js'
import atkUp from './AtkUp.js'
import hpUp  from './HpUp.js'

export default function hpatk_Effect (szData, team, tar, debug = false) {
  let effectArr = []
  // case: hp up, atk down
  if (/HP上升\d+點，並減少\d+點攻擊力/.test(szData.info)) {
    let effect1 = initEffect(team.length, 'hp'),
        effect2 = initEffect(team.length, 'atk')
    effect1.target[tar] = true
    effect2.target[tar] = true
    effect1.hp  += parseInt(fetchValFromInfo(szData.info, /HP上升(\d+)點/))
    effect2.atk -= parseInt(fetchValFromInfo(szData.info, /減少(\d+)點攻擊力/))
    effectArr.push(effect1, effect2)
  }
  // case: atk up, hp down
  if (/攻擊力上升1000點，並減少2000點HP/.test(szData.info)) {
    let effect1 = initEffect(team.length, 'atk'),
        effect2 = initEffect(team.length, 'hp')
    effect1.target[tar] = true
    effect2.target[tar] = true
    effect1.atk += parseInt(fetchValFromInfo(szData.info, /攻擊力上升(\d+)點/))
    effect2.hp  -= parseInt(fetchValFromInfo(szData.info, /減少(\d+)點HP/))
    effectArr.push(effect1, effect2)
  }
  // case: hp up
  if (/將給予敵方的傷害變為\d.\d倍，並增加\d+點HP/.test(szData.info)) {
    let effect = initEffect(team.length, 'hp')
    effect.target[tar] = true
    effect.hp += parseInt(fetchValFromInfo(szData.info, /增加(\d+)點HP/))
    effectArr.push(effect)
  }
  // case: hp down
  if (/將給予敵方的傷害變為\d.\d倍，並減少\d+點HP/.test(szData.info)) {
    let effect = initEffect(team.length, 'hp')
    effect.target[tar] = true
    effect.hp -= parseInt(fetchValFromInfo(szData.info, /減少(\d+)點HP/))
    effectArr.push(effect)
  }
  // case: hp up, atk up (Senzai Rewrite)
  if (/攻擊力上升\d+點，HP上升\d+點/.test(szData.info)) {
    let szData1 = Object.assign({const: 0}, szData),
        szData2 = Object.assign({const: 0}, szData)
    szData1.info = szData1.info.replace(/，HP上升\d+點/, '')
    szData1.const = szData1.const1
    szData2.info = szData2.info.replace(/攻擊力上升\d+點，/, '')
    szData2.const = szData2.const2
    effectArr = [...effectArr, ...atkUp(szData1, team, tar), ...hpUp(szData2, team, tar)]
  }
  if (/攻擊力(和|與|及)HP/.test(szData.info)) {
    let szData1 = Object.assign({const: 0}, szData),
        szData2 = Object.assign({const: 0}, szData)
    szData1.info = szData1.info.replace(/攻擊力(和|與|及)HP/, '攻擊力')
    szData1.const = szData1.const
    szData2.info = szData2.info.replace(/攻擊力(和|與|及)HP/, 'HP')
    szData2.const = szData2.const
    if (/COST-\d+/.test(szData.info))
      szData2.info = szData2.info.replace(/COST-\d+/, '')
    effectArr = [...effectArr, ...atkUp(szData1, team, tar), ...hpUp(szData2, team, tar)]
  }
  if (/隊伍中(\S+)精靈越多又再上升/.test(szData.info)) {
    const breed = szData.breed
    const cnt = team.slice(0, 5).reduce( (cnt, card) => cnt + (card.breed === breed) )
    let szData1 = Object.assign({const: 0}, szData),
        szData2 = Object.assign({const: 0}, szData)
    szData1.info = `${breed}的攻擊力上升${cnt * 100}點`
    szData1.const = cnt * 100
    szData2.info = `${breed}的HP上升${cnt * 100}點`
    szData2.const = cnt * 100
    effectArr = [...effectArr, ...atkUp(szData1, team, tar), ...hpUp(szData2, team, tar)]
  }
  if (debug)
    console.log({ szData: szData, effects: effectArr });
  return effectArr
}