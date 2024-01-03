import React from 'react';
import PropTypes from 'prop-types';

import { WikiImage } from '../../../components';

import './styles.scss';

const noteObj = {
  answerRatio: { fmt: '得知盤面答對率', image: 'Senzai_心眼.png' },
  answerReset: { fmt: '答題重置', image: 'Senzai_Answer_reset.png' },
  answerTime: { fmt: '答題技能延長秒數', image: 'Senzai_AS.png' },
  boxDropChance: { fmt: '微幅提升掉寶率', image: 'Senzai_Drop.png' },
  boxOccurance: { fmt: '寶箱出現率上升', image: 'Senzai_Drop.png' },
  cardExp: { fmt: '提升契約經驗值', image: 'ExAwake_契約經驗值上升.png' },
  chainBoost: { fmt: '任務開始時賦予增加連鎖數', image: 'Senzai_Chain_boost.png' },
  chainSecure: { fmt: '保護連鎖回合數', image: 'Senzai_Chain_guard.png' },
  coin: { fmt: '提升獲得的金幣', image: 'Senzai_Gold.png' },
  difficultyDrop: { fmt: '問答難易度下降等級', image: 'Senzai_Difficulty_down.png' },
  enermyAngerCondition: { fmt: '識破敵人的憤怒條件', image: 'Senzai_心眼・怒.png' },
  enermyDeath: { fmt: '看穿敵方死亡時的行動', image: 'Senzai_心眼・逝.png' },
  enermyHP: { fmt: '看見敵方HP', image: 'Senzai_心眼.png' },
  enermyNext: { fmt: '看穿敵方下次的行動', image: 'Senzai_心眼・絕.png' },
  enermyReflection: { fmt: '看穿敵方技能反彈時的行動', image: 'Senzai_心眼・絕.png' },
  exp: { fmt: '提升獲得的經驗值', image: 'Senzai_EXP.png' },
  questionCategoryUp: {
    常識: { fmt: '「常識」相關的問題增加', image: 'ExAwake_常識.png' },
    文科: { fmt: '「文科」相關的問題增加', image: 'ExAwake_文科.png' },
    體育: { fmt: '「體育」相關的問題增加', image: 'ExAwake_體育.png' },
    演藝: { fmt: '「演藝」相關的問題增加', image: 'ExAwake_演藝.png' },
    動漫: { fmt: '「動漫」相關的問題增加', image: 'ExAwake_動漫.png' },
    理科: { fmt: '「理科」相關的問題增加', image: 'ExAwake_理科.png' },
    時事: { fmt: '「時事」相關的問題增加', image: 'ExAwake_時事.png' },
    計算: { fmt: '「計算」相關的問題增加', image: 'ExAwake_計算.png' },
    英文: { fmt: '「英文」相關的問題增加', image: 'ExAwake_英文.png' },
    國語: { fmt: '「國語」相關的問題增加', image: 'ExAwake_國語.png' },
  },
  questionPropUp: {
    火: { fmt: '火屬性問題類型較容易出現', image: 'Senzai_Panel_boost_F.png' },
    水: { fmt: '水屬性問題類型較容易出現', image: 'Senzai_Panel_boost_W.png' },
    雷: { fmt: '雷屬性問題類型較容易出現', image: 'Senzai_Panel_boost_T.png' },
  },
  recoverAtEnd: { fmt: '戰鬥結束後回復全體隊友', image: 'Senzai_Recover.png' },
};

// const senzaiStringBuilder = (...args) => {
//   const str = args[0];
//   return str.replace(
//    /{(\d+)}/g,
//    (match, number) => (typeof args[number] !== 'undefined' ? args[number] : match),
//   );
// };

export default function GlobalSenzai({ globalFlags }) {
  return (
    <div className="pure-g globalFlags">
      <div className="pure-u-1 pure-u-md-1-2">
        <h4>心眼/答題相關</h4>
        <ul>
          {globalFlags.answerRatio && (
          <li key="answerRatio">
            <WikiImage filename={noteObj.answerRatio.image} width={24} height={24} />
            {noteObj.answerRatio.fmt}
          </li>
          )}
          {globalFlags.answerReset && (
          <li key="answerReset">
            <WikiImage filename={noteObj.answerReset.image} width={24} height={24} />
            {noteObj.answerReset.fmt}
          </li>
          )}
          {globalFlags.answerTime && (
          <li key="answerTime">
            <WikiImage filename={noteObj.answerTime.image} width={24} height={24} />
            {noteObj.answerTime.fmt}
            ：
            {globalFlags.answerTime}
            秒
          </li>
          )}
          {globalFlags.enermyAngerCondition && (
          <li key="enermyAngerCondition">
            <WikiImage filename={noteObj.enermyAngerCondition.image} width={24} height={24} />
            {noteObj.enermyAngerCondition.fmt}
            ：
            {globalFlags.enermyAngerCondition}
          </li>
          )}
          {globalFlags.enermyDeath && (
          <li key="enermyDeath">
            <WikiImage filename={noteObj.enermyDeath.image} width={24} height={24} />
            {noteObj.enermyDeath.fmt}
          </li>
          )}
          {globalFlags.enermyHP && (
          <li key="enermyHP">
            <WikiImage filename={noteObj.enermyHP.image} width={24} height={24} />
            {noteObj.enermyHP.fmt}
          </li>
          )}
          {globalFlags.enermyNext && (
          <li key="enermyNext">
            <WikiImage filename={noteObj.enermyNext.image} width={24} height={24} />
            {noteObj.enermyNext.fmt}
          </li>
          )}
          {globalFlags.enermyReflection && (
          <li key="enermyReflection">
            <WikiImage filename={noteObj.enermyReflection.image} width={24} height={24} />
            {noteObj.enermyReflection.fmt}
          </li>
          )}
        </ul>
      </div>
      <div className="pure-u-1 pure-u-md-1-2">
        <h4>連鎖相關/戰後回復</h4>
        <ul>
          {!!globalFlags.chainBoost && (
          <li key="chainBoost">
            <WikiImage filename={noteObj.chainBoost.image} width={24} height={24} />
            {noteObj.chainBoost.fmt}
            ：
            {globalFlags.chainBoost}
          </li>
          )}
          {!!globalFlags.chainSecure && (
          <li key="chainSecure">
            <WikiImage filename={noteObj.chainSecure.image} width={24} height={24} />
            {noteObj.chainSecure.fmt}
            ：
            {globalFlags.chainSecure}
            回合
          </li>
          )}
          {!!globalFlags.recoverAtEnd && (
          <li key="recoverAtEnd">
            <WikiImage filename={noteObj.recoverAtEnd.image} width={24} height={24} />
            {noteObj.recoverAtEnd.fmt}
            ：
            {globalFlags.recoverAtEnd}
            %
          </li>
          )}
        </ul>
      </div>
      <div className="pure-u-1 pure-u-md-1-2">
        <h4>盤面屬性/問題類型</h4>
        <ul>
          {globalFlags.questionCategoryUp && globalFlags.questionCategoryUp.map((category) => (
            <li key={`questionCategoryUp_${category}`}>
              <WikiImage
                filename={noteObj.questionCategoryUp[category].image}
                width={60}
                height={60}
              />
              {noteObj.questionCategoryUp[category].fmt}
            </li>
          ))}
          {globalFlags.questionPropUp !== undefined && globalFlags.questionPropUp['火'] !== 0 && (
          <li key="questionPropUp_火">
            <WikiImage filename={noteObj.questionPropUp['火'].image} width={24} height={24} />
            {noteObj.questionPropUp['火'].fmt}
            ：
            {globalFlags.questionPropUp['火']}
          </li>
          )}
          {globalFlags.questionPropUp !== undefined && globalFlags.questionPropUp['水'] !== 0 && (
          <li key="questionPropUp_水">
            <WikiImage filename={noteObj.questionPropUp['水'].image} width={24} height={24} />
            {noteObj.questionPropUp['水'].fmt}
            ：
            {globalFlags.questionPropUp['水']}
          </li>
          )}
          {globalFlags.questionPropUp !== undefined && globalFlags.questionPropUp['雷'] !== 0 && (
          <li key="questionPropUp_雷">
            <WikiImage filename={noteObj.questionPropUp['雷'].image} width={24} height={24} />
            {noteObj.questionPropUp['雷'].fmt}
            ：
            {globalFlags.questionPropUp['雷']}
          </li>
          )}
          {globalFlags.difficultyDrop !== undefined && (
          <li key="difficultyDrop">
            <WikiImage filename={noteObj.difficultyDrop.image} width={24} height={24} />
            {noteObj.difficultyDrop.fmt}
            ：
            {globalFlags.difficultyDrop + 1}
          </li>
          )}
        </ul>
      </div>
      <div className="pure-u-1 pure-u-md-1-2">
        <h4>結算部份</h4>
        <ul>
          {globalFlags.coin && (
          <li key="coin">
            <WikiImage filename={noteObj.coin.image} width={24} height={24} />
            {noteObj.coin.fmt}
            ：+
            {globalFlags.coin}
            %
          </li>
          )}
          {globalFlags.exp && (
          <li key="exp">
            <WikiImage filename={noteObj.exp.image} width={24} height={24} />
            {noteObj.exp.fmt}
            ：+
            {globalFlags.exp}
            %
          </li>
          )}
          {globalFlags.cardExp && (
          <li key="cardExp">
            <WikiImage filename={noteObj.cardExp.image} width={24} height={24} />
            {noteObj.cardExp.fmt}
            ：+
            {globalFlags.cardExp}
            %
          </li>
          )}
          {globalFlags.boxOccurance && (
          <li key="boxOccurance">
            <WikiImage filename={noteObj.boxOccurance.image} width={24} height={24} />
            {noteObj.boxOccurance.fmt}
          </li>
          )}
          {globalFlags.boxDropChance && (
          <li key="boxDropChance">
            <WikiImage filename={noteObj.boxDropChance.image} width={24} height={24} />
            {noteObj.boxDropChance.fmt}
          </li>
          )}
        </ul>
      </div>
    </div>
  );
}

GlobalSenzai.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  globalFlags: PropTypes.object.isRequired,
};
