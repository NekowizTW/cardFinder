import React from 'react'

import { twFilenameFix,
         linkGenerator   } from '../../Helper/RenderHelper'

const noteObj = {
  answerRatio: { fmt: '得知盤面答對率', image: 'Senzai_心眼.png'},
  answerReset: { fmt: '答題重置', image: 'Senzai_Answer_reset.png' },
  answerTime: { fmt: '答題技能延長秒數', image: 'Senzai_AS.png' },
  boxDropChance: { fmt: '微幅提升掉寶率', image: 'Senzai_Drop.png' },
  boxOccurance: { fmt: '寶箱出現率上升', image: 'Senzai_Drop.png' },
  cardExp: { fmt: '提升契約經驗值', image: 'ExAwake_契約經驗值上升.png' },
  chainBoost: { fmt: '任務開始時賦予增加連鎖數', image: 'Senzai_Chain_boost.png' },
  chainSecure: { fmt: '保護連鎖回合數', image: 'Senzai_Chain_guard.png' },
  coin: { fmt: '提升獲得的金幣', image: 'Senzai_Gold.png' },
  difficultyDrop: { fmt: '問答難易度下降等級', image: 'Senzai_Difficulty_down.png'},
  enermyAngerCondition: { fmt: '識破敵人的憤怒條件', image: 'Senzai_心眼・怒.png' },
  enermyDeath: { fmt: '看穿敵方死亡時的行動', image: 'Senzai_心眼・逝.png' },
  enermyHP: { fmt: '看見敵方HP', image: 'Senzai_心眼.png' },
  enermyNext: { fmt: '看穿敵方下次的行動', image: 'Senzai_心眼・絕.png' },
  enermyReflection: { fmt: '看穿敵方技能反彈時的行動', image: 'Senzai_心眼・絕.png' },
  exp: { fmt: '提升獲得的經驗值', image: 'Senzai_EXP.png' },
  questionCategoryUp: {
    '常識': { fmt: '「常識」相關的問題增加', image: 'ExAwake_常識.png'},
    '文科': { fmt: '「文科」相關的問題增加', image: 'ExAwake_文科.png'},
    '體育': { fmt: '「體育」相關的問題增加', image: 'ExAwake_體育.png'},
    '演藝': { fmt: '「演藝」相關的問題增加', image: 'ExAwake_演藝.png'},
    '動漫': { fmt: '「動漫」相關的問題增加', image: 'ExAwake_動漫.png'},
    '理科': { fmt: '「理科」相關的問題增加', image: 'ExAwake_理科.png'},
    '時事': { fmt: '「時事」相關的問題增加', image: 'ExAwake_時事.png'},
    '計算': { fmt: '「計算」相關的問題增加', image: 'ExAwake_計算.png'},
    '英文': { fmt: '「英文」相關的問題增加', image: 'ExAwake_英文.png'},
    '國語': { fmt: '「國語」相關的問題增加', image: 'ExAwake_國語.png'}
  },
  questionPropUp: {
    '火': { fmt: '火屬性問題類型較容易出現', image: 'Senzai_Panel_boost_F.png' },
    '水': { fmt: '水屬性問題類型較容易出現', image: 'Senzai_Panel_boost_W.png' },
    '雷': { fmt: '雷屬性問題類型較容易出現', image: 'Senzai_Panel_boost_T.png' }
  },
  recoverAtEnd: { fmt: '戰鬥結束後回復全體隊友', image: 'Senzai_Recover.png' },
}

String.prototype.format = function() {
  const args = arguments;
  return this.replace(/{(\d+)}/g, (match, number) => { 
    return typeof args[number] !== 'undefined' ? args[number] : match
  })
}


class RenderGlobalSenzai extends React.Component {
  constructor (props) {
    super(props)
  }
  render () {
    if (this.props.calculated.length === 0)
      return <div></div>
    const flags = this.props.calculated[5].global
    return <div className={'pure-g'}>
      <div className={'pure-u-1 pure-u-md-1-2'}>
        <h4>心眼/答題相關</h4>
        <ul>
          {flags.answerRatio && <li key={`answerRatio`}>
            <img src={linkGenerator(noteObj.answerRatio.image)} style={{ verticalAlign: 'middle' }} />
            {noteObj.answerRatio.fmt}
          </li>}
          {flags.answerReset && <li key={`answerReset`}>
            <img src={linkGenerator(noteObj.answerReset.image)} style={{ verticalAlign: 'middle' }} />
            {noteObj.answerReset.fmt}
          </li>}
          {flags.answerTime && <li key={`answerTime`}>
            <img src={linkGenerator(noteObj.answerTime.image)} style={{ verticalAlign: 'middle' }} />
            {noteObj.answerTime.fmt}：{flags.answerTime}秒
          </li>}
          {flags.enermyAngerCondition && <li key={`enermyAngerCondition`}>
            <img src={linkGenerator(noteObj.enermyAngerCondition.image)} style={{ verticalAlign: 'middle' }} />
            {noteObj.enermyAngerCondition.fmt}：{flags.enermyAngerCondition}
          </li>}
          {flags.enermyDeath && <li key={`enermyDeath`}>
            <img src={linkGenerator(noteObj.enermyDeath.image)} style={{ verticalAlign: 'middle' }} />
            {noteObj.enermyDeath.fmt}
          </li>}
          {flags.enermyHP && <li key={`enermyHP`}>
            <img src={linkGenerator(noteObj.enermyHP.image)} style={{ verticalAlign: 'middle' }} />
            {noteObj.enermyHP.fmt}
          </li>}
          {flags.enermyNext && <li key={`enermyNext`}>
            <img src={linkGenerator(noteObj.enermyNext.image)} style={{ verticalAlign: 'middle' }} />
            {noteObj.enermyNext.fmt}
          </li>}
          {flags.enermyReflection && <li key={`enermyReflection`}>
            <img src={linkGenerator(noteObj.enermyReflection.image)} style={{ verticalAlign: 'middle' }} />
            {noteObj.enermyReflection.fmt}
          </li>}
        </ul>
      </div>
      <div className={'pure-u-1 pure-u-md-1-2'}>
        <h4>連鎖相關/戰後回復</h4>
        <ul>
          {flags.chainBoost && <li key={`chainBoost`}>
            <img src={linkGenerator(noteObj.chainBoost.image)} style={{ verticalAlign: 'middle' }} />
            {noteObj.chainBoost.fmt}：{flags.chainBoost}
          </li>}
          {flags.chainSecure && <li key={`chainSecure`}>
            <img src={linkGenerator(noteObj.chainSecure.image)} style={{ verticalAlign: 'middle' }} />
            {noteObj.chainSecure.fmt}：{flags.chainSecure}回合
          </li>}
          {flags.recoverAtEnd && <li key={`recoverAtEnd`}>
            <img src={linkGenerator(noteObj.recoverAtEnd.image)} style={{ verticalAlign: 'middle' }} />
            {noteObj.recoverAtEnd.fmt}：{flags.recoverAtEnd}%
          </li>}
        </ul>
      </div>
      <div className={'pure-u-1 pure-u-md-1-2'}>
        <h4>盤面屬性/問題類型</h4>
        <ul>
          {flags.questionCategoryUp && flags.questionCategoryUp.map(category => {
            return <li key={`questionCategoryUp_${category}`}>
              <img src={linkGenerator(noteObj.questionCategoryUp[category].image)} style={{ verticalAlign: 'middle' }} />
              {noteObj.questionCategoryUp[category].fmt}
            </li>
          })}
          {flags.questionPropUp !== undefined && flags.questionPropUp['火'] !== 0 && <li key={`questionPropUp_火`}>
            <img src={linkGenerator(noteObj.questionPropUp['火'].image)} style={{ verticalAlign: 'middle' }} />
            {noteObj.questionPropUp['火'].fmt}：{flags.questionPropUp['火']}
          </li>}
          {flags.questionPropUp !== undefined && flags.questionPropUp['水'] !== 0 && <li key={`questionPropUp_水`}>
            <img src={linkGenerator(noteObj.questionPropUp['水'].image)} style={{ verticalAlign: 'middle' }} />
            {noteObj.questionPropUp['水'].fmt}：{flags.questionPropUp['水']}
          </li>}
          {flags.questionPropUp !== undefined && flags.questionPropUp['雷'] !== 0 && <li key={`questionPropUp_雷`}>
            <img src={linkGenerator(noteObj.questionPropUp['雷'].image)} style={{ verticalAlign: 'middle' }} />
            {noteObj.questionPropUp['雷'].fmt}：{flags.questionPropUp['雷']}
          </li>}
          {flags.difficultyDrop !== undefined && <li key={`difficultyDrop`}>
            <img src={linkGenerator(noteObj.difficultyDrop.image)} style={{ verticalAlign: 'middle' }} />
            {noteObj.difficultyDrop.fmt}：{flags.difficultyDrop + 1}
          </li>}
        </ul>
      </div>
      <div className={'pure-u-1 pure-u-md-1-2'}>
        <h4>結算部份</h4>
        <ul>
          {flags.coin && <li key={`coin`}>
            <img src={linkGenerator(noteObj.coin.image)} style={{ verticalAlign: 'middle' }} />
            {noteObj.coin.fmt}：+{flags.coin}%
          </li>}
          {flags.exp && <li key={`exp`}>
            <img src={linkGenerator(noteObj.exp.image)} style={{ verticalAlign: 'middle' }} />
            {noteObj.exp.fmt}：+{flags.exp}%
          </li>}
          {flags.cardExp && <li key={`cardExp`}>
            <img src={linkGenerator(noteObj.cardExp.image)} style={{ verticalAlign: 'middle' }} />
            {noteObj.cardExp.fmt}：+{flags.cardExp}%
          </li>}
          {flags.boxOccurance && <li key={`boxOccurance`}>
            <img src={linkGenerator(noteObj.boxOccurance.image)} style={{ verticalAlign: 'middle' }} />
            {noteObj.boxOccurance.fmt}
          </li>}
          {flags.boxDropChance && <li key={`boxDropChance`}>
            <img src={linkGenerator(noteObj.boxDropChance.image)} style={{ verticalAlign: 'middle' }} />
            {noteObj.boxDropChance.fmt}
          </li>}
        </ul>
      </div>
    </div>
  }
}

export default RenderGlobalSenzai
