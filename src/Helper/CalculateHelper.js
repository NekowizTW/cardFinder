function initEffect (len, type) {
  return {target: Array(len).fill(false), [type]: 0}
}

function fetchValFromInfo (info, re) {
  const m = re.exec(info)
  if (m !== null)
    return m[1]
  else
    return 0
}

function atkUp (szData, team, tar) {
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

function hpUp (szData, team, tar) {
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
      effect.hp += parseInt(szData.const)
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
  if (/^(隊伍內)擁有複屬性/.test(szData.info)) {
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
  return effectArr
}

function costDown (szData, team, tar) {
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
  return effectArr
}

function cdDown (szData, team, tar) {
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
  if (/縮短特殊技能「\S+」(、「\S+」)?發動回合數1回合/.test(szData.info)) {
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
  return effectArr
}

function hpatk_Effect (szData, team, tar) {
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
    szData1.const = szData1.const1
    szData2.info = szData2.info.replace(/攻擊力(和|與|及)HP/, 'HP')
    szData2.const = szData2.const2
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
  return effectArr
}

export function calcSenzai (team) {
  // console.log(team)
  let hpa   = Array(team.length).fill(0),
      atka  = Array(team.length).fill(0),
      costa = Array(team.length).fill(0),
      cdfa  = Array(team.length).fill(0),
      cdsa  = Array(team.length).fill(0)
  let effectArr = []
  for (let tar = team.length - 1; tar >= 0; tar--) {
    // scan the senzai
    const sz = [...team[tar].sz, ...team[tar].ex];
    for (let j = sz.length - 1; j >= 0; j--) {
      const szData = sz[j];
      // console.log(`szData: ${JSON.stringify(szData)}`)
      switch(szData.type){
        case '攻擊力上升':
        case '複屬性攻擊力上升':
          effectArr = [...effectArr, ...atkUp(szData, team, tar)]
          break;
        case 'HP上升':
        case '複屬性HP上升':
          effectArr = [...effectArr, ...hpUp(szData, team, tar)]
          break;
        case '減少COST':
          effectArr = [...effectArr, ...costDown(szData, team, tar)]
          break;
        case '快速技能':
          effectArr = [...effectArr, ...cdDown(szData, team, tar)]
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
          effectArr = [...effectArr, ...hpatk_Effect(szData, team, tar)]
          break;
        default:
          break;
      }
    }
  }

  // console.log([hpa, atka, costa, cdfa, cdsa])
  effectArr.forEach(effect => {
    // console.log(`Effect: ${JSON.stringify(effect)}`)
    const keys = Object.keys(effect)
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
      if (keys.indexOf('cda')  >= 0)
        cdsa[idx]  += effect.cds
    }
    // console.log([hpa, atka, costa, cdfa, cdsa])
  })

  return [hpa, atka, costa, cdfa, cdsa];
}