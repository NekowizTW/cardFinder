import { initEffect } from './Utils.js'

export default function atkUp (szData, team, tar) {
  let effectArr = []
  // case: affect cost after atk up
  if (szData.info.indexOf('COST') >= 0) {
    const idx = szData.info.indexOf('COST') + 4
    let effect = initEffect(team.length, 'cost')
    effect.target[tar] = true
    effect.cost -= parseInt(szData.info.slice(idx))
    effectArr.push(effect)
  }
  // case: self atk up
  if (/^攻擊力上升\d+點/.test(szData.info)) {
    let effect = initEffect(team.length, 'atk')
    effect.target[tar] = true
    effect.atk += parseInt(szData.const)
    effectArr.push(effect)
  }
  // case: specified main prop atk up
  // special case: leader
  if (/^(火|水|雷)屬性(的)?(全體)?隊友(的)?攻擊力上升\d+點/.test(szData.info)) {
    let effect = initEffect(team.length, 'atk')
    effect.target = team.map(card => card.prop === szData.elmts)
    if (/若為隊長時又再提升\d+點/.test(szData.info) && tar === 0)
      effect.atk += parseInt(szData.const2)
    else
      effect.atk += parseInt(szData.const)
    effectArr.push(effect)
  }
  // case: specified wildcard main prop atk up
  if (/(火|水|雷)．(火|水|雷)屬性隊友的攻擊力上升\d+點/.test(szData.info) ||
      /^隊友的攻擊力上升\d+點/.test(szData.info)) {
    let effect = initEffect(team.length, 'atk')
    effect.target = team.map(card => szData.elmts.indexOf(card.prop) >= 0)
    effect.atk += parseInt(szData.const)
    effectArr.push(effect)
  }
  // case: wildcard sub prop atk up
  if (/^擁有複屬性/.test(szData.info)) {
    let effect = initEffect(team.length, 'atk')
    effect.target = team.map(card => card.prop2.length > 0)
    effect.atk += parseInt(szData.const)
    effectArr.push(effect)
  }
  if (/複屬性為火、水、雷屬性的隊友攻擊力上升\d+點/.test(szData.info)) {
    let effect = initEffect(team.length, 'atk')
    effect.target = team.map(card => /(火|水|雷)/.test(card.prop2))
    effect.atk += parseInt(szData.const)
    effectArr.push(effect)
  }
  if (/複屬性為(火|水|雷|光|闇)屬性的(全體)?隊友(，)?攻擊力上升\d+點/.test(szData.info)) {
    let effect = initEffect(team.length, 'atk')
    effect.target = team.map(card => card.prop2 === szData.elmts)
    effect.atk += parseInt(szData.const)
    effectArr.push(effect)
  }
  if (/提升複屬性為(火|水|雷|光|闇)屬性的(全體)?隊友(，)?\d+攻擊力/.test(szData.info)) {
    let effect = initEffect(team.length, 'atk')
    effect.target = team.map(card => card.prop2 === szData.elmts)
    effect.atk += parseInt(szData.const)
    effectArr.push(effect)
  }
  // case: single main prop atk up
  if (/^單(色)?(火|水|雷)屬性精靈的攻擊力上升\d+點/.test(szData.info)) {
    let effect = initEffect(team.length, 'atk')
    effect.target = team.map(card => card.prop === szData.elmts && card.prop2.length === 0)
    effect.atk += parseInt(szData.const)
    effectArr.push(effect)
  }
  // case: specified main prop atk up, if specified sub prop atk up more
  if (/(火|水|雷)屬性隊友攻擊力上升\d+點，複屬性為(火|水|雷|光|闇)屬性時又再上升\d+點/.test(szData.info)) {
    let effect1 = initEffect(team.length, 'atk'),
        effect2 = initEffect(team.length, 'atk')
    effect1.target = team.map(card => card.prop === szData.elmts[0])
    effect1.atk += parseInt(szData.const1)
    effect2.target = team.map(card => (card.prop === szData.elmts[0]) && (card.prop2 === szData.elmts[1]))
    effect2.atk += parseInt(szData.const2) - parseInt(szData.const1)
    effectArr.push(effect1, effect2)
  }
  // case: breed atk up
  const breeds = ['龍族', '神族', '魔族', '天使', '妖精', '亞人', '物質', '魔法生物', '戰士', '術士', '道具', 'AbCd']
  let effect = initEffect(team.length, 'atk')
  effect.atk = parseInt(szData.const)
  breeds.forEach(scanWord => {
    if (szData.info.indexOf(scanWord) === -1) return;
    effect.target = effect.target.map((val, idx) => {
      return val || team[idx].breed === scanWord
    })
  })
  effectArr.push(effect)
  return effectArr
}