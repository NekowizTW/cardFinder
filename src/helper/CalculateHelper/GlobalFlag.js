import {
  fetchValFromInfo,
  fullWidthNumber2Integer,
  infoRegexChecker,
  initFlag,
  logDebug,
  strToInt,
} from './utils';

// effect on statistics screen
const statisticsFlagList = [
  {
    name: 'gain zero experience',
    regex: /獲得經驗值為0/,
    handler: (_, team, tar) => {
      if (tar === 5) return undefined;
      const flag = initFlag(team.length, 'exp');
      flag.global = true;
      flag.exp = -100;
      return flag;
    },
  },
  {
    name: 'gain more experience',
    regex: /(提升)?獲得的經驗值(提升)?/,
    handler: ({ info }, team) => {
      const flag = initFlag(team.length, 'exp');
      flag.global = true;
      flag.exp = strToInt(fetchValFromInfo(info, /\d+%/));
      return flag;
    },
  },
  {
    name: 'gain more coins',
    regex: /提升獲得的金幣/,
    handler: ({ info }, team) => {
      const flag = initFlag(team.length, 'coin');
      flag.global = true;
      flag.coin = strToInt(fetchValFromInfo(info, /\d+%/));
      return flag;
    },
  },
  {
    name: 'gain more experience and coins(without value)',
    regex: /經驗值及金幣/,
    handler: ({ info }, team) => {
      const flag1 = initFlag(team.length, 'exp');
      flag1.global = true;
      flag1.exp = strToInt(fetchValFromInfo(info, /\d+%/));
      const flag2 = initFlag(team.length, 'coin');
      flag2.global = true;
      flag2.coin = strToInt(fetchValFromInfo(info, /\d+%/));
      return [flag1, flag2];
    },
  },
  {
    name: 'gain more experience and coins(with value)',
    regex: /金幣\d+%、經驗值\d+%/,
    handler: ({ info }, team) => {
      const flag1 = initFlag(team.length, 'exp');
      flag1.global = true;
      flag1.exp = strToInt(fetchValFromInfo(info, /經驗值(\d+)%/));
      const flag2 = initFlag(team.length, 'coin');
      flag2.global = true;
      flag2.coin = strToInt(fetchValFromInfo(info, /金幣(\d+)%/));
      return [flag1, flag2];
    },
  },
  {
    name: 'gain more card experience',
    regex: /提升契約經驗值/,
    handler: ({ info }, team) => {
      const flag = initFlag(team.length, 'cardExp');
      flag.global = true;
      flag.cardExp = strToInt(fetchValFromInfo(info, /\d+%/));
      return flag;
    },
  },
  {
    name: 'gain more box occurance',
    regex: /提升寶箱出現率/,
    handler: (_, team) => {
      const flag = initFlag(team.length, 'boxOccurance');
      flag.global = true;
      flag.boxOccurance = true;
      return flag;
    },
  },
  {
    name: 'gain more rare item drop change',
    regex: /提升掉寶率/,
    handler: (_, team) => {
      const flag = initFlag(team.length, 'boxDropChance');
      flag.global = true;
      flag.boxDropChance = true;
      return flag;
    },
  },
];

// effect on answer the question
const questionConfigList = [
  {
    name: 'drop question difficulty',
    regex: /問答難易度(\S*)下降/,
    handler: ({ info }, team) => {
      const flag = initFlag(team.length, 'difficultyDrop');
      const str = fetchValFromInfo(info, /問答難易度(\S*)下降/);
      const arr = ['微幅', '', '中幅', '大幅', '顯著'];
      flag.global = true;
      flag.difficultyDrop = arr.indexOf(str);
      return flag;
    },
  },
  {
    name: 'extend answer skill time',
    regex: /(答題技能發動時間延長\d+秒)|(延長\d+秒答題技能時間限制)/,
    handler: ({ const: val }, team) => {
      const flag = initFlag(team.length, 'answerTime');
      flag.global = true;
      flag.answerTime = strToInt(val);
      return flag;
    },
  },
  {
    name: 'reset answer state if answer wrong',
    regex: /可以在問答不正確時將解題狀態回復為選擇問題類型之前/,
    handler: (_, team) => {
      const flag = initFlag(team.length, 'answerReset');
      flag.global = true;
      flag.answerReset = true;
      return flag;
    },
  },
  {
    name: 'increase prop occurance for questions',
    regex: /(火|水|雷)屬性問題類型較容易出現/,
    handler: ({ info, elmts }, team) => {
      const flag = initFlag(team.length, 'questionProp');
      flag.global = true;
      flag.questionPropUp = {
        prop: elmts,
        cnt: fullWidthNumber2Integer(fetchValFromInfo(info, /（效果值：(\S+)）/)) ?? 1,
      };
      return flag;
    },
  },
  {
    name: 'increase category occurance for questions',
    regex: /在四選一問答中較容易出現「\S+」類型/,
    handler: ({ quest_type: questCategory }, team) => {
      const flag = initFlag(team.length, 'questionCategoryUp');
      flag.global = true;
      flag.questionCategoryUp = questCategory;
      return flag;
    },
  },
];

// effect on chain
const chainEffectList = [
  {
    name: 'secure chain',
    regex: /於一次任務中，僅限\S次保護連鎖數/,
    handler: ({ info }, team) => {
      const flag = initFlag(team.length, 'chainSecure');
      flag.global = true;
      flag.chainSecure = '一二三四五'.indexOf(fetchValFromInfo(info, /僅限(\S)次/)) + 1;
      return flag;
    },
  },
  {
    name: 'boost chain at startup',
    regex: /任務開始時賦予連鎖數加\d+的效果/,
    handler: ({ info }, team) => {
      const flag = initFlag(team.length, 'chainBoost');
      flag.global = true;
      flag.chainBoost = strToInt(fetchValFromInfo(info, /連鎖數加(\d+)/));
      return flag;
    },
  },
];

export function globalFlag(szData, team, debug = false) {
  const statisticsFlagArr = statisticsFlagList.map(({ name, regex, handler }) => {
    if (!infoRegexChecker(szData.info, regex)) return { name, flag: undefined };

    const flag = handler(szData, team);

    logDebug(`globalFlag/statisticsFlag/${name}`, flag, debug);

    return { name, flag };
  });

  const questionConfigFlagArr = questionConfigList.map(({ name, regex, handler }) => {
    if (!infoRegexChecker(szData.info, regex)) return { name, flag: undefined };

    const flag = handler(szData, team);

    logDebug(`globalFlag/questionConfig/${name}`, flag, debug);

    return { name, flag };
  });

  const chainEffectFlagArr = chainEffectList.map(({ name, regex, handler }) => {
    if (!infoRegexChecker(szData.info, regex)) return { name, flag: undefined };

    const flag = handler(szData, team);

    logDebug(`globalFlag/chainEffect/${name}`, flag, debug);

    return { name, flag };
  });

  const statistics = [...statisticsFlagArr, ...questionConfigFlagArr, ...chainEffectFlagArr]
    .map(({ flag }) => flag)
    .filter((flag) => !!flag)
    .flatMap((flag) => (Array.isArray(flag) ? flag : [flag]));

  logDebug('globalFlag/statistics', { szData, team, statistics }, debug);

  return statistics;
}

// recover at end
const recoverAtEndList = [
  {
    name: 'recover all at end',
    regex: /戰鬥結束後回復全體隊友\d+%HP/,
    handler: ({ info }, team) => {
      const flag = initFlag(team.length, 'recoverAtEnd');
      flag.target = Array.from(new Array(team.length), () => true);
      flag.recoverAtEnd = {
        ratio: strToInt(fetchValFromInfo(info, /(\d+)%HP/)),
      };
      if (team.length === 6) flag.target[5] = false;
      return flag;
    },
  },
  {
    name: 'recover specified seirei at end',
    regex: /戰鬥結束後，回復「\S+」精靈\d+%HP/,
    handler: ({ info }, team) => {
      const flag = initFlag(team.length, 'recoverAtEnd');
      flag.target = team.map((card) => {
        if (card.obtainType === undefined) return false;
        return info.includes(card.obtainType.title);
      });
      flag.recoverAtEnd = {
        ratio: strToInt(fetchValFromInfo(info, /(\d+)%HP/)),
      };
      return flag;
    },
  },
];

export function recoverRelative(szData, team, debug = false) {
  const flagArr = recoverAtEndList.map(({ name, regex, handler }) => {
    if (!infoRegexChecker(szData.info, regex)) return { name, flag: undefined };

    const flag = handler(szData, team);

    logDebug(`recoverRelative/${name}`, flag, debug);

    return { name, flag };
  });

  const statistics = flagArr
    .map(({ flag }) => flag)
    .filter((flag) => !!flag)
    .flatMap((flag) => (Array.isArray(flag) ? flag : [flag]));

  logDebug('recoverRelative/statistics', { szData, team, statistics }, debug);

  return statistics;
}

// mind senzai
const viewHiddenDataList = [
  {
    name: 'view answer ratio and enermy hp',
    regex: /看穿肉眼無從得見的真實/,
    handler: (_, team) => [
      {
        ...initFlag(team.length, 'answerRatio'),
        global: true,
        answerRatio: true,
      },
      {
        ...initFlag(team.length, 'enermyHP'),
        global: true,
        enermyHP: true,
      },
    ],
  },
  {
    name: 'view enermy reflection',
    regex: /看穿敵方技能反彈時的行動/,
    handler: (_, team) => ({
      ...initFlag(team.length, 'enermyReflection'),
      global: true,
      enermyReflection: true,
    }),
  },
  {
    name: 'view enermy next action',
    regex: /看穿敵方技能反彈時的行動/,
    handler: (_, team) => ({
      ...initFlag(team.length, 'enermyNext'),
      global: true,
      enermyNext: true,
    }),
  },
  {
    name: 'view enermy anger condition',
    regex: /識破敵人的憤怒條件/,
    handler: (_, team) => ({
      ...initFlag(team.length, 'enermyAngerCondition'),
      global: true,
      enermyAngerCondition: true,
    }),
  },
  {
    name: 'view enermy death action',
    regex: /看穿敵方死亡時的行動/,
    handler: (_, team) => ({
      ...initFlag(team.length, 'enermyDeath'),
      global: true,
      enermyDeath: true,
    }),
  },
  {
    name: 'view answer ratio',
    regex: /可以得知問答的答題成績/,
    handler: (_, team) => ({
      ...initFlag(team.length, 'answerRatio'),
      global: true,
      answerRatio: true,
    }),
  },
  {
    name: 'view enermy hp',
    regex: /能夠得知敵方的HP/,
    handler: (_, team) => ({
      ...initFlag(team.length, 'enermyHP'),
      global: true,
      enermyHP: true,
    }),
  },
];

export function mindRelative(szData, team, debug = false) {
  const flagArr = viewHiddenDataList.map(({ name, regex, handler }) => {
    if (!infoRegexChecker(szData.info, regex)) return { name, flag: undefined };

    const flag = handler(szData, team);

    logDebug(`mindRelative/${name}`, flag, debug);

    return { name, flag };
  });

  const statistics = flagArr
    .map(({ flag }) => flag)
    .filter((flag) => !!flag)
    .flatMap((flag) => (Array.isArray(flag) ? flag : [flag]));

  logDebug('mindRelative/statistics', { szData, team, statistics }, debug);

  return statistics;
}

// a reduce function for global effects
export function groupGlobal(globalFlags, effect) {
  const nextGlobalFlags = { ...globalFlags };
  if (effect.answerRatio !== undefined) {
    nextGlobalFlags.answerRatio = true;
  }
  if (effect.answerReset !== undefined) {
    nextGlobalFlags.answerReset = true;
  }
  if (effect.answerTime !== undefined) {
    nextGlobalFlags.answerTime = Math.max(globalFlag.answerTime, effect.answerTime);
  }
  if (effect.boxDropChance !== undefined) {
    nextGlobalFlags.boxDropChance = true;
  }
  if (effect.boxOccurance !== undefined) {
    nextGlobalFlags.boxOccurance = true;
  }
  if (effect.cardExp !== undefined) {
    nextGlobalFlags.cardExp = globalFlags.cardExp || 0;
    nextGlobalFlags.cardExp += effect.cardExp;
  }
  if (effect.chainBoost !== undefined) {
    nextGlobalFlags.chainBoost = globalFlags.chainBoost || 0;
    nextGlobalFlags.chainBoost += effect.chainBoost;
  }
  if (effect.chainSecure !== undefined) {
    nextGlobalFlags.chainSecure = globalFlags.chainSecure || 0;
    nextGlobalFlags.chainSecure += effect.chainSecure;
  }
  if (effect.coin !== undefined) {
    nextGlobalFlags.coin = globalFlags.coin || 0;
    nextGlobalFlags.coin += effect.coin;
  }
  if (effect.difficultyDrop !== undefined) {
    nextGlobalFlags.difficultyDrop = globalFlags.difficultyDrop || 0;
    nextGlobalFlags.difficultyDrop = Math.max(globalFlags.difficultyDrop, effect.difficultyDrop);
  }
  if (effect.enermyAngerCondition !== undefined) {
    nextGlobalFlags.enermyAngerCondition = true;
  }
  if (effect.enermyDeath !== undefined) {
    nextGlobalFlags.enermyDeath = true;
  }
  if (effect.enermyHP !== undefined) {
    nextGlobalFlags.enermyHP = true;
  }
  if (effect.enermyNext !== undefined) {
    nextGlobalFlags.enermyNext = true;
  }
  if (effect.enermyReflection !== undefined) {
    nextGlobalFlags.enermyReflection = true;
  }
  if (effect.exp !== undefined) {
    nextGlobalFlags.exp = globalFlags.exp || 0;
    nextGlobalFlags.exp += effect.exp;
  }
  if (effect.questionCategoryUp !== undefined) {
    nextGlobalFlags.questionCategoryUp = globalFlags.questionCategoryUp || [];
    nextGlobalFlags.questionCategoryUp.push(effect.questionCategoryUp);
  }
  if (effect.questionPropUp !== undefined) {
    nextGlobalFlags.questionPropUp = globalFlags.questionPropUp || { 火: 0, 水: 0, 雷: 0 };
    nextGlobalFlags.questionPropUp[effect.questionPropUp.prop] += effect.questionPropUp.cnt;
  }
  if (effect.recoverAtEnd !== undefined) {
    nextGlobalFlags.recoverAtEnd = globalFlags.recoverAtEnd || 0;
    nextGlobalFlags.recoverAtEnd += effect.recoverAtEnd.ratio;
  }
  return nextGlobalFlags;
}
