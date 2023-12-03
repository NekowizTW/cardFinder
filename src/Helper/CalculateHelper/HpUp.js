import { initEffect } from './Utils'

export default function hpUp (szData, team, tar, debug = false) {
  let effectArr = []
  // case: self hp up
  if (/^HP上升\d+點/.test(szData.info)) {
    let effect = initEffect(team.length, 'hp')
    effect.target[tar] = true
    effect.hp += parseInt(szData.const)
    effectArr.push(effect)
  }
  // case: wildcard all props
  if (/全屬性HP上升\d+點/.test(szData.info)) {
    let effect = initEffect(team.length, 'hp')
    effect.target = team.map(card => true)
    effect.hp += parseInt(szData.const)
    effectArr.push(effect)
  }
  // case: specified main prop hp up
  // special case: leader
  if (/^(火|水|雷)屬性(的)?(全體)?隊友(的)?HP上升\d+點/.test(szData.info)) {
    let effect = initEffect(team.length, 'hp')
    effect.target = team.map(card => card.prop === szData.elmts)
    if (/若為隊長時又再提升\d+點/.test(szData.info) && tar === 0)
      effect.hp += parseInt(szData.const2)
    else
      effect.hp += szData.const2 !== undefined ? parseInt(szData.const1) : parseInt(szData.const)
    effectArr.push(effect)
  }
  // case: specified wildcard main prop hp up
  if (/(火|水|雷)．(火|水|雷)屬性隊友的HP上升\d+點/.test(szData.info) ||
      /^隊友的HP上升\d+點/.test(szData.info)) {
    let effect = initEffect(team.length, 'hp')
    effect.target = team.map(card => szData.elmts.indexOf(card.prop) >= 0)
    effect.hp += parseInt(szData.const)
    effectArr.push(effect)
  }
  // case: wildcard sub prop hp up
  if (/^(隊伍內)?擁有複屬性/.test(szData.info)) {
    let effect = initEffect(team.length, 'hp')
    effect.target = team.map(card => card.prop2.length > 0)
    effect.hp += parseInt(szData.const)
    effectArr.push(effect)
  }
  if (/複屬性為火、水、雷屬性的隊友HP上升\d+點/.test(szData.info)) {
    let effect = initEffect(team.length, 'hp')
    effect.target = team.map(card => /(火|水|雷)/.test(card.prop2))
    effect.hp += parseInt(szData.const)
    effectArr.push(effect)
  }
  if (/複屬性為(火|水|雷|光|闇)屬性的(全體)?隊友(，)?HP上升\d+點/.test(szData.info)) {
    let effect = initEffect(team.length, 'hp')
    effect.target = team.map(card => card.prop2 === szData.elmts)
    effect.hp += parseInt(szData.const)
    effectArr.push(effect)
  }
  // case: single main prop hp up
  if (/^單(色)?(火|水|雷)屬性精靈的HP上升\d+點/.test(szData.info)) {
    let effect = initEffect(team.length, 'hp')
    effect.target = team.map(card => card.prop === szData.elmts && card.prop2.length === 0)
    effect.hp += parseInt(szData.const)
    effectArr.push(effect)
  }
  // case: specified main prop hp up, if specified sub prop hp up more
  if (/(火|水|雷)屬性隊友HP上升\d+點，複屬性為(火|水|雷|光|闇)屬性時又再上升\d+點/.test(szData.info)) {
    let effect1 = initEffect(team.length, 'hp'),
        effect2 = initEffect(team.length, 'hp')
    effect1.target = team.map(card => card.prop === szData.elmts[0])
    effect1.hp += parseInt(szData.const1)
    effect2.target = team.map(card => (card.prop === szData.elmts[0]) && (card.prop2 === szData.elmts[1]))
    effect2.hp += parseInt(szData.const2) - parseInt(szData.const1)
    effectArr.push(effect1, effect2)
  }
  // case: breed hp up
  const breeds = ['龍族', '神族', '魔族', '天使', '妖精', '亞人', '物質', '魔法生物', '戰士', '術士', '道具', 'AbCd']
  let effect = initEffect(team.length, 'hp')
  effect.hp = parseInt(szData.const)
  breeds.forEach(scanWord => {
    if (szData.info.indexOf(scanWord) === -1) return;
    effect.target = effect.target.map((val, idx) => {
      return val || team[idx].breed === scanWord
    })
  })
  effectArr.push(effect)
  if (debug)
    console.log({ szData: szData, effects: effectArr });
  return effectArr
}