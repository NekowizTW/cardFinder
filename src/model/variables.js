export const BASE_URL = 'https://nekowiztw.github.io/wikidata-sync/cards/';

export const WIKI_URL = 'https://nekowiz.fandom.com/zh/wiki/';

export const JSON_NAMES = {
  卡片資料: 'cardData.json',
  AS技能: 'AnswerSkill.json',
  SS技能: 'SpecialSkill.json',
  AS2技能: 'Answer2Skill.json',
  SS2技能: 'Special2Skill.json',
  EXAS技能: 'EXASSkill.json',
  潛在能力: 'SenzaiSkill.json',
  結晶: 'exCard.json',
  大結晶: 'leaderEX.json',
};

export const FETCH_STATUS = {
  IDLE: 'IDLE',
  PENDING: 'PENDING',
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED',
  refetchReady: (status) => (
    status === 'IDLE' || status === 'FAILED'
  ),
};

export * from './InGameVariables/ASProps';
export * from './InGameVariables/BasicProps';
export * from './InGameVariables/EXASProps';
export * from './InGameVariables/SenzaiProps';
export * from './InGameVariables/SSProps';
