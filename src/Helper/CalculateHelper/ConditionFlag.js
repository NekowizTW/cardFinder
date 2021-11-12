import { initFlag,
         fetchValFromInfo } from './Utils.js'

export function conditionFlag (szData, team, tar, debug = false) {
  let flagArr = []
  // case: death escape
  if (/剩餘HP在\d+%以上時，即使遭受致命傷害，也有\d+%的機率存活/.test(szData.info)) {
    let flag = initFlag(team.length, 'deathEscape')
    flag.target[tar] = true
    flag.deathEscape = {
      condition: parseInt(fetchValFromInfo(szData.info, /剩餘HP在(\d+)%以上/)),
      probability: parseInt(fetchValFromInfo(szData.info, /(\d+)%的機率存活/))
    }
    flagArr.push(flag)
  }
  // case: swap hp and atk
  if (/HP與攻擊力的值對調/.test(szData.info)) {
    let flag = initFlag(team.length, 'HPATKSwap')
    flag.target[tar] = true
    flag.HPATKSwap = true
    flagArr.push(flag)
  }
  // case: swap team member and helper
  if (/更換為候補清單中的精靈/.test(szData.info)) {
    let flag = initFlag(team.length, 'memberChange')
    flag.target[tar] = true
    flag.memberChange = szData.info.indexOf('自動') >= 0 ? 'auto' : 'manual'
    flagArr.push(flag)
  }
  // case: emery skill defense
  if (/使敵方技能的(\S+)失效/.test(szData.info)) {
    let flag = initFlag(team.length, 'skillDefense')
    flag.target[tar] = true
    flag.skillDefense = fetchValFromInfo(szData.info, /使敵方技能的(\S+)失效/).split('、')
    flagArr.push(flag)
  }
  if (/使強制前進失效/.test(szData.info)) {
    let flag = initFlag(team.length, 'skillDefense')
    flag.target[tar] = true
    flag.skillDefense = ['強制前進']
    flagArr.push(flag)
  }
  // case: prop defense
  if (/減輕\d+%(\S+)屬性傷害/.test(szData.info)) {
    let flag = initFlag(team.length, 'propDefense')
    flag.target[tar] = true
    flag.propDefense = {
      elmts: szData.elmts,
      ratio: parseInt(szData.ratio)
    }
    flagArr.push(flag)
  }
  if (/減輕\d+點(\S+)屬性傷害/.test(szData.info)) {
    let flag = initFlag(team.length, 'propDefense')
    flag.target[tar] = true
    flag.propDefense = {
      elmts: szData.elmts.split(''),
      const: parseInt(szData.const)
    }
    flagArr.push(flag)
  }
  // case: breed defense
  if (/減輕\d+%(\S+)敵人造成的傷害/.test(szData.info)) {
    let flag = initFlag(team.length, 'breedDefense')
    flag.target[tar] = true
    flag.breedDefense = {
      breed: szData.breed1 !== undefined ? [szData.breed1, szData.breed2] : [szData.breed],
      ratio: parseInt(szData.ratio)
    }
    flagArr.push(flag)
  }
  if (debug)
    console.log({ szData: szData, effects: flagArr });
  
  return flagArr
}

export function skillRelative (szData, team, tar, debug = false) {
  let flagArr = []
  // case: as skill enhance
  if (/答題技能「\S+」的效果值上升\d+點/.test(szData.info)) {
    if (szData.info.indexOf(team[tar].asData.type) >= 0) {
      let flag = initFlag(team.length, 'asUp')
      flag.target[tar] = true
      flag.asUp = {
        type: team[tar].asData.type,
        ratio: parseInt(szData.ratio),
      }
      if (szData.const !== undefined)
        flag.asUp.const = parseInt(szData.const)
      flagArr.push(flag)
    }
  }
  // case: as skill enhance (only for prop2 enhance)
  if (/答題技能「強化複屬性攻擊」之對於複屬性效果值上升\d+點/.test(szData.info)) {
    if ('強化複屬性攻擊' === team[tar].asData.type) {
      let flag = initFlag(team.length, 'asUp')
      flag.target[tar] = true
      flag.asUp = {
        type: team[tar].asData.type,
        ratio: parseInt(szData.ratio),
      }
      flagArr.push(flag)
    }
  }
  // case: as skill enhance (add times on combo)
  if (/答題技能「連擊」的連擊數增加\d+/.test(szData.info)) {
    if (team[tar].asData.type.indexOf('連擊') >= 0) {
      let flag = initFlag(team.length, 'asUp')
      flag.target[tar] = true
      flag.asUp = {
        type: team[tar].asData.type,
        const: parseInt(szData.const),
      }
      flagArr.push(flag)
    }
  }
  // case: as skill enhance (add range on gamble)
  if (/答題技能「賭博攻擊」之效果/.test(szData.info)) {
    if ('賭博攻擊' === team[tar].asData.type) {
      let flag = initFlag(team.length, 'asUp')
      flag.target[tar] = true
      flag.asUp = {
        type: team[tar].asData.type,
        ratio: [parseInt(szData.ratio1), parseInt(szData.ratio2)].sort(),
      }
      flagArr.push(flag)
    }
  }
  // case: ss skill enhance
  if (/特殊技能「\S+」的((初期)|(特效)|(持續)|(弱化)|(傷害上升))?((效果值)|(傷害)|(傷害效果值))(上升|下降)(精靈數x)?\d+(點|%)/.test(szData.info) ||
      /特殊技能「\S+」的(\S)屬性(傷害)?效果值上升\d+點/.test(szData.info) ||
      /特殊技能「\S+」的(效果|強化傷害)上限值上升\d+點/.test(szData.info) ||
      /特殊技能「\S+」的封印延長\d+回合，效果值上升精靈數x\d+點/.test(szData.info) ||
      /特殊技能「\S+」的阻隔效果提升\d+/) {
    if (szData.info.indexOf(team[tar].ssData.type) >= 0) {
      let flag = initFlag(team.length, 'ssUp')
      flag.target[tar] = true
      flag.ssUp = {
        type: team[tar].ssData.type
      }
      // 第一效果值(ratio): const1, ratio1, ratio
      if (szData.ratio1 !== undefined)
        flag.ssUp.ratio = parseInt(szData.ratio1)
      else if (szData.const1 !== undefined)
        flag.ssUp.ratio = parseInt(szData.const1)
      else
        flag.ssUp.ratio = parseInt(szData.ratio)
      // 效果值(ratio), 連擊/持續回合(const)
      if (szData.const !== undefined)
        flag.ssUp.const = parseInt(szData.const)
      // 效果值(const1), 持續回合(const2)
      if (szData.const2 !== undefined) {
        flag.ssUp.const = parseInt(szData.const2)
      }
      // 自我犧牲魔術 (效果值紀錄至ratio, 自傷紀錄至const)
      if (team[tar].ssData.type === '自我犧牲魔術') {
        flag.ssUp.const = flag.ssUp.ratio
        flag.ssUp.ratio = parseInt(fetchValFromInfo(szData.info, /效果值上升(\d+)點/))
      }
      // 炸裂大魔術 (旁邊效果值紀錄至const)
      if (team[tar].ssData.type === '炸裂大魔術') {
        flag.ssUp.const = parseInt(szData.ratio2)
      }
      // 提昇 (效果值紀錄至ratio, 自傷紀錄至const)
      if (team[tar].ssData.type === '提昇') {
        [flag.ssUp.ratio, flag.ssUp.const] = [flag.ssUp.const, flag.ssUp.ratio]
      }
      // 反動大魔術 (封印延長紀錄至const)
      if (team[tar].ssData.type.indexOf('反動大魔術')) {
        flag.ssUp.const = parseInt(fetchValFromInfo(szData.info, /封印延長(\d+)回合/))
      }
      // 特定屬性加成
      if (/裝備此結晶之精靈的主屬性若為\S屬性/.test(szData.info)) {
        const elmts = fetchValFromInfo(szData.info, /主屬性若為(\S)屬性/)
        if (elmts === team[tar].prop)
          flag.ssUp.const = parseInt(szData.ratio1) + parseInt(szData.ratio2)
      }
      flagArr.push(flag)
    }
  }
  // case: ss skill enhance (combo)
  if (/特殊技能「\S+」的連擊數增加\d+/.test(szData.info)) {
    if (szData.info.indexOf(team[tar].ssData.type) >= 0) {
      let flag = initFlag(team.length, 'ssUp')
      flag.target[tar] = true
      flag.ssUp = {
        type: team[tar].ssData.type,
        const: parseInt(szData.const)
      }
      flagArr.push(flag)
    }
  }
  // case: ss skill enhance (during turn)
  if (/特殊技能「\S+」的(強化傷害)持續回合數增加\d+/.test(szData.info)) {
    if (szData.info.indexOf(team[tar].ssData.type) >= 0) {
      let flag = initFlag(team.length, 'ssUp')
      flag.target[tar] = true
      flag.ssUp = {
        type: team[tar].ssData.type,
        const: parseInt(szData.const)
      }
      flagArr.push(flag)
    }
  }
  // case: ss skill enhance (蓄積解放大魔術)
  if (/特殊技能「蓄積解放大魔術‧\S」/.test(szData.info)) {
    if (szData.info.indexOf(team[tar].ssData.type) >= 0) {
      let flag = initFlag(team.length, 'ssUp')
      flag.target[tar] = true
      flag.ssUp = {
        type: team[tar].ssData.type
      }
      if (szData.ratio !== undefined)
        flag.ssUp.ratio = parseInt(szData.const)
      if (/任務開始時/.test(szData.info))
        flag.ssUp.const = parseInt(fetchValFromInfo(szData.info, /(\d+)％/))
      flagArr.push(flag)
    }
  }
  // case: ss skill enhance (賦予雙重AS)
  if (/特殊技能「賦予雙重AS」/.test(szData.info)) {
    if (szData.info.indexOf(team[tar].ssData.type) >= 0) {
      let flag = initFlag(team.length, 'ssUp')
      flag.target[tar] = true
      flag.ssUp = {
        type: team[tar].ssData.type,
        ratio: parseInt(fetchValFromInfo(szData.info, /效果值：(\d+)/))
      }
      flagArr.push(flag)
    }
  }
  // case: ss skill enhance (強化擊破)
  if (/特殊技能「強化擊破」/.test(szData.info)) {
    if (szData.info.indexOf(team[tar].ssData.type) >= 0) {
      let flag = initFlag(team.length, 'ssUp')
      flag.target[tar] = true
      flag.ssUp = {
        type: team[tar].ssData.type,
        const: parseInt(szData.const),
        skillDefense: ['詛咒S'] // 詛咒S: 詛咒 cannot affect some skill
      }
      flagArr.push(flag)
    }
  }
  // case: ss skill enhance (犧牲連鎖強化)
  if (/特殊技能「犧牲連鎖強化」/.test(szData.info)) {
    if (szData.info.indexOf(team[tar].ssData.type) >= 0) {
      let flag = initFlag(team.length, 'ssUp')
      flag.target[tar] = true
      flag.ssUp = {
        type: team[tar].ssData.type,
        chain: parseInt(szData.chain),
        ratio: parseInt(szData.ratio),
        const: parseInt(szData.const)
      }
      flagArr.push(flag)
    }
  }
  // case: ss skill enhance (犧牲連鎖強化)
  if (/特殊技能「犧牲連鎖強化」/.test(szData.info)) {
    if (szData.info.indexOf(team[tar].ssData.type) >= 0) {
      let flag = initFlag(team.length, 'ssUp')
      flag.target[tar] = true
      flag.ssUp = {
        type: team[tar].ssData.type,
        chain: parseInt(szData.chain),
        ratio: parseInt(szData.ratio),
        const: parseInt(szData.const)
      }
      flagArr.push(flag)
    }
  }
  // case: ss skill enhance (犧牲魔術)
  if (/特殊技能「犧牲魔術」/.test(szData.info)) {
    if (szData.info.indexOf(team[tar].ssData.type) >= 0) {
      let flag = initFlag(team.length, 'ssUp')
      flag.target[tar] = true
      flag.ssUp = {
        type: team[tar].ssData.type,
        const: parseInt(szData.ratio)
      }
      flagArr.push(flag)
    }
  }
  // case: ss skill enhance (產生連結問題類型)
  if (/特殊技能「產生連結問題類型」/.test(szData.info)) {
    if (szData.info.indexOf(team[tar].ssData.type) >= 0) {
      let flag = initFlag(team.length, 'ssUp')
      flag.target[tar] = true
      flag.ssUp = {
        type: team[tar].ssData.type,
        ratio: parseInt(szData.ratio)
      }
      flagArr.push(flag)
    }
  }
  // case: ss skill enhance (詠唱大魔術)
  if (/特殊技能「詠唱大魔術」/.test(szData.info)) {
    if (szData.info.indexOf(team[tar].ssData.type) >= 0) {
      let flag = initFlag(team.length, 'ssUp')
      flag.target[tar] = true
      flag.ssUp = {
        type: team[tar].ssData.type,
        const: parseInt(szData.const)
      }
      flagArr.push(flag)
    }
  }
  // case: ss skill enhance (時限大魔術)
  if (/設置時限大魔術/.test(szData.info)) {
    if (szData.info.indexOf(team[tar].ssData.type) >= 0) {
      let flag = initFlag(team.length, 'ssUp')
      flag.target[tar] = true
      flag.ssUp = {
        type: team[tar].ssData.type,
        const: parseInt(szData.const)
      }
      flagArr.push(flag)
    }
  }
  // case: ss skill add (賦予特殊技能「強化精靈」的效果)
  if (/賦予特殊技能「強化精靈」的效果/.test(szData.info)) {
    if (szData.info.indexOf(team[tar].ssData.type) >= 0) {
      let flag = initFlag(team.length, 'ssUp')
      flag.target[tar] = true
      flag.ssUp = {
        type: team[tar].ssData.type,
        ratio: szData.ratio !== undefined ? parseInt(szData.ratio) :
                [parseInt(szData.ratio1), parseInt(szData.ratio2)],
        const: parseInt(fetchValFromInfo(szData.info, /(\d+)回合/))
      }
      flagArr.push(flag)
    }
  }
  if (debug)
    console.log({ szData: szData, effects: flagArr });
  return flagArr
}