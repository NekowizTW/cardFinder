import { initEffect,
         fetchValFromInfo } from './Utils'

export default function cdDown (szData, team, tar, debug = false) {
  let effectArr = []
  // case: self first cd down
  if (/縮短首次發動特殊技能回合數\d+回合/.test(szData.info)) {
    let effect = initEffect(team.length, 'cdf')
    effect.target[tar] = true
    effect.cdf -= parseInt(szData.const)
    effectArr.push(effect)
  }
  // case: self second cd down
  if (/縮短第二次之後發動特殊技能回合數\d+回合/.test(szData.info)) {
    let effect = initEffect(team.length, 'cds')
    effect.target[tar] = true
    effect.cds -= parseInt(szData.const)
    effectArr.push(effect)
  }
  // case: specified skill cd down
  if (/縮短特殊技能「\S+」(、「\S+」)?發動回合數\d+回合/.test(szData.info)) {
    let effect1 = initEffect(team.length, 'cdf'),
        effect2 = initEffect(team.length, 'cds')
    const skillType = fetchValFromInfo(szData.info, /縮短特殊技能「(\S+)」/)
    if (team[tar].ssData.type.indexOf(skillType)) {
      effect1.target[tar] = true
      effect2.target[tar] = true
      effect1.cdf -= parseInt(szData.const)
      effect2.cds -= parseInt(szData.const)
    }
    effectArr.push(effect1, effect2)
  }
  if (debug)
    console.log({ szData: szData, effects: effectArr });
  return effectArr
}