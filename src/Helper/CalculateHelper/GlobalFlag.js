import { initFlag,
         fetchValFromInfo,
         fullWidthNumber2Integer } from './Utils.js'

export function globalFlag (szData, team, tar) {
  let flagArr = []
  // case: effect on statistics screen
  if (/獲得經驗值為0/.test(szData.info) && tar !== 5) {
    let flag = initFlag(team.length, 'exp')
    flag.global = true
    flag.exp = -100
    flagArr.push(flag)
  }
  if (/(提升)?獲得的經驗值(提升)?/.test(szData.info)) {
    let flag = initFlag(team.length, 'exp')
    flag.global = true
    flag.exp = parseInt(fetchValFromInfo(szData.info, /\d+%/))
    flagArr.push(flag)
  }
  if (/提升獲得的金幣 /.test(szData.info)) {
    let flag = initFlag(team.length, 'coin')
    flag.global = true
    flag.coin = parseInt(fetchValFromInfo(szData.info, /\d+%/))
    flagArr.push(flag)
  }
  if (/經驗值及金幣/.test(szData.info)) {
    let flag1 = initFlag(team.length, 'exp')
    let flag2 = initFlag(team.length, 'coin')
    flag1.global = flag2.global = true
    flag.exp = parseInt(fetchValFromInfo(szData.info, /(\d+)%/))
    flag.coin = parseInt(fetchValFromInfo(szData.info, /(\d+)%/))
    flagArr.push(flag1, flag2)
  }
  if (/金幣\d+%、經驗值\d+%/.test(szData.info)) {
    let flag1 = initFlag(team.length, 'exp')
    let flag2 = initFlag(team.length, 'coin')
    flag1.global = flag2.global = true
    flag1.exp = parseInt(fetchValFromInfo(szData.info, /金幣(\d+)%/))
    flag2.coin = parseInt(fetchValFromInfo(szData.info, /經驗值(\d+)%/))
    flagArr.push(flag1, flag2)
  }
  if (/提升契約經驗值/.test(szData.info)) {
    let flag = initFlag(team.length, 'cardExp')
    flag.global = true
    flag.cardExp = parseInt(fetchValFromInfo(szData.info, /(\d+)%/))
    flagArr.push(flag)
  }
  if (/提升寶箱出現率/.test(szData.info)) {
    let flag = initFlag(team.length, 'boxOccurance')
    flag.global = true
    flag.boxOccurance = true
    flagArr.push(flag)
  }
  if (/提升掉寶率/.test(szData.info)) {
    let flag = initFlag(team.length, 'boxDropChance')
    flag.global = true
    flag.boxDropChance = true
    flagArr.push(flag)
  }
  // case: effect on answer the question
  if (/問答難易度(\S*)下降/.test(szData.info)) {
    let flag = initFlag(team.length, 'difficultyDrop')
    const str = fetchValFromInfo(szData.info, /問答難易度(\S*)下降/)
    const arr = ['微幅', '', '中幅', '大幅', '顯著']
    flag.global = true
    flag.difficultyDrop = arr.indexOf(str)
    flagArr.push(flag)
  }
  if (/(答題技能發動時間延長\d+秒)|(延長\d+秒答題技能時間限制)/.test(szData.info)) {
    let flag = initFlag(team.length, 'answerTime')
    flag.global = true
    flag.answerTime = szData.const
    flagArr.push(flag)
  }
  if (/可以在問答不正確時將解題狀態回復為選擇問題類型之前/.test(szData.info)) {
    let flag = initFlag(team.length, 'answerReset')
    flag.global = true
    flag.answerReset = true
    flagArr.push(flag)
  }
  if (/(火|水|雷)屬性問題類型較容易出現/.test(szData.info)) {
    let flag = initFlag(team.length, 'questionProp')
    flag.global = true
    flag.questionPropUp = {
    	prop: szData.elmts,
    	cnt: 1
    }
    if (szData.info.indexOf('效果值') >= 0) {
      flag.questionPropUp.cnt = fullWidthNumber2Integer(fetchValFromInfo(szData.info, /（效果值：(\S+)）/))
    }
    flagArr.push(flag)
  }
  if (/在四選一問答中較容易出現「\S+」類型/.test(szData.info)) {
    let flag = initFlag(team.length, 'questionCategoryUp')
    flag.global = true
    flag.questionCategoryUp = szData.quest_type
    flagArr.push(flag)
  }
  // case: effect on chain
  if (/於一次任務中，僅限\S次保護連鎖數/.test(szData.info)) {
    let flag = initFlag(team.length, 'chainSecure')
    flag.global = true
    flag.chainSecure = '一二三四五'.indexOf(fetchValFromInfo(szData.info, /僅限(\S)次/)) + 1
    flagArr.push(flag)
  }
  if (/任務開始時賦予連鎖數加\d+的效果/.test(szData.info)) {
    let flag = initFlag(team.length, 'chainBoost')
    flag.global = true
    flag.chainBoost = parseInt(fetchValFromInfo(szData.info, /連鎖數加(\d+)/))
    flagArr.push(flag)
  }
  return flagArr
}

export function recoverRelative (szData, team) {
  let flagArr = []
  // case: recover all
  if (/戰鬥結束後回復全體隊友\d+%HP/.test(szData.info)) {
    let flag = initFlag(team.length, 'recoverAtEnd')
    flag.global = true
    flag.recoverAtEnd = {
      ratio: parseInt(fetchValFromInfo(szData.info, /(\d+)%HP/))
    }
    flagArr.push(flag)
  }
  // case: recover certain source
  if (/戰鬥結束後，回復「\S+」精靈\d+%HP/.test(szData.info)) {
    let flag = initFlag(team.length, 'recoverAtEnd')
    flag.target = team.map(card => {
    	if (card.obtainType === undefined) return false
    	return szData.info.indexOf(card.obtainType.title) >= 0
    })
    flag.recoverAtEnd = {
      ratio: parseInt(fetchValFromInfo(szData.info, /(\d+)%HP/))
    }
    flagArr.push(flag)
  }
  return flagArr
}

export function mindRelative (szData, team) {
  let flagArr = []
  if (/看穿肉眼無從得見的真實/.test(szData.info)) {
    let flag1 = initFlag(team.length, 'answerRatio')
    let flag2 = initFlag(team.length, 'enermyHP')
    flag1.global = flag2.global = true
    flag1.answerRatio = true
    flag2.enermyHP = true
    flagArr.push(flag1, flag2)
  }
  if (/看穿敵方技能反彈時的行動/.test(szData.info)) {
    let flag = initFlag(team.length, 'enermyReflection')
    flag.global = true
    flag.enermyReflection = true
    flagArr.push(flag)
  }
  if (/看穿敵方下次的行動/.test(szData.info)) {
    let flag = initFlag(team.length, 'enermyNext')
    flag.global = true
    flag.enermyNext = true
    flagArr.push(flag)
  }
  if (/識破敵人的憤怒條件/.test(szData.info)) {
    let flag = initFlag(team.length, 'enermyAngerCondition')
    flag.global = true
    flag.enermyAngerCondition = true
    flagArr.push(flag)
  }
  if (/看穿敵方死亡時的行動/.test(szData.info)) {
    let flag = initFlag(team.length, 'enermyDeath')
    flag.global = true
    flag.enermyDeath = true
    flagArr.push(flag)
  }
  if (/可以得知問答的答題成績/.test(szData.info)) {
    let flag = initFlag(team.length, 'answerRatio')
    flag.global = true
    flag.answerRatio = true
    flagArr.push(flag)
  }
  if (/能夠得知敵方的HP/.test(szData.info)) {
    let flag = initFlag(team.length, 'enermyHP')
    flag.global = true
    flag.enermyHP = true
    flagArr.push(flag)
  }
  return flagArr
}

// a reduce function for global effects
export function groupGlobal (globalFlags, effect) {
  if (effect.answerRatio !== undefined) {
    globalFlags.answerRatio = true
  }
  if (effect.answerReset !== undefined) {
    globalFlags.answerReset = true
  }
  if (effect.answerTime !== undefined) {
    globalFlags.answerTime = Math.max(globalFlag.answerTime, effect.answerTime)
  }
  if (effect.boxDropChance !== undefined) {
    globalFlags.boxDropChance = true
  }
  if (effect.boxOccurance !== undefined) {
    globalFlags.boxOccurance = true
  }
  if (effect.cardExp !== undefined) {
    globalFlags.cardExp = globalFlags.cardExp || 0
    globalFlags.cardExp += effects.cardExp
  }
  if (effect.chainBoost !== undefined) {
    globalFlags.chainBoost = globalFlags.chainBoost || 0
    globalFlags.chainBoost += effect.chainBoost
  }
  if (effect.chainSecure !== undefined) {
    globalFlags.chainSecure = globalFlags.chainSecure || 0
    globalFlags.chainSecure = Math.max(globalFlags.chainSecure, effect.chainSecure)
  }
  if (effect.coin !== undefined) {
    globalFlags.coin = globalFlags.coin || 0
    globalFlags.coin += effects.coin
  }
  if (effect.difficultyDrop !== undefined) {
    globalFlags.difficultyDrop = globalFlags.difficultyDrop || 0
    globalFlags.difficultyDrop = Math.max(globalFlags.difficultyDrop, effect.difficultyDrop)
  }
  if (effect.enermyAngerCondition !== undefined) {
    globalFlags.enermyAngerCondition = true
  }
  if (effect.enermyDeath !== undefined) {
    globalFlags.enermyDeath = true
  }
  if (effect.enermyHP !== undefined) {
    globalFlags.enermyHP = true
  }
  if (effect.enermyNext !== undefined) {
    globalFlags.enermyNext = true
  }
  if (effect.enermyReflection !== undefined) {
    globalFlags.enermyReflection = true
  }
  if (effect.exp !== undefined) {
    globalFlags.exp = globalFlags.exp || 0
    globalFlags.exp += effects.exp
  }
  if (effect.questionCategoryUp !== undefined) {
    globalFlags.questionCategoryUp = globalFlags.questionCategoryUp || []
    globalFlags.questionCategoryUp.push(effect.questionCategoryUp)
  }
  if (effect.questionPropUp !== undefined) {
    globalFlags.questionPropUp = globalFlags.questionPropUp || { '火': 0, '水': 0, '雷': 0 }
    globalFlags.questionPropUp[effect.questionPropUp.prop] += effect.questionPropUp.cnt
  }
  if (effect.recoverAtEnd !== undefined) {
    globalFlags.recoverAtEnd = globalFlags.recoverAtEnd || 0
    globalFlags.recoverAtEnd += effect.recoverAtEnd.ratio
  }
  return globalFlags
}