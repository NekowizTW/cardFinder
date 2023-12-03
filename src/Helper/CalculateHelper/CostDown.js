import { initEffect,
         fetchValFromInfo } from './Utils'

export default function costDown (szData, team, tar, debug = false) {
  let effectArr = []
  // case: self cost down
  if (/(隊伍)?COST-\d+/.test(szData.info)) {
    let effect = initEffect(team.length, 'cost')
    effect.target[tar] = true
    effect.cost -= parseInt(szData.const)
    effectArr.push(effect)
  }
  // case: side effect hp up
  if (/^減少\d+HP/.test(szData.info)) {
    let effect = initEffect(team.length, 'hp')
    effect.target[tar] = true
    effect.hp -= parseInt(fetchValFromInfo(szData.info, /^減少(\d+)HP/))
    effectArr.push(effect)
  }
  // case: side effect hp down
  if (/^HP上升\d+點/.test(szData.info)) {
    let effect = initEffect(team.length, 'hp')
    effect.target[tar] = true
    effect.hp += parseInt(fetchValFromInfo(szData.info, /^HP上升\d+點/))
    effectArr.push(effect)
  }
  if (debug)
    console.log({ szData: szData, effects: effectArr });
  return effectArr
}