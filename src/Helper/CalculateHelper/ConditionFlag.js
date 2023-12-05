import {
  initFlag,
  fetchValFromInfo,
  strToInt,
  removeUndefinedProp,
  mutualInput,
  infoRegexChecker,
  logDebug,
} from './utils';

const conditionalFlagList = [
  {
    name: 'escape from death',
    regex: /剩餘HP在\d+%以上時，即使遭受致命傷害，也有\d+%的機率存活/,
    handler: ({ info }, team, tar) => {
      const flag = initFlag(team.length, 'deathEscape');
      flag.target[tar] = true;
      flag.deathEscape = {
        condition: strToInt(fetchValFromInfo(info, /剩餘HP在(\d+)%以上/)),
        probability: strToInt(fetchValFromInfo(info, /(\d+)%的機率存活/)),
      };
      return flag;
    },
  },
  {
    name: 'swap hp and atk',
    regex: /HP與攻擊力的值對調/,
    handler: (_, team, tar) => {
      const flag = initFlag(team.length, 'HPATKSwap');
      flag.target[tar] = true;
      flag.HPATKSwap = true;
      return flag;
    },
  },
  {
    name: 'swap team member and helper',
    regex: /更換為候補清單中的精靈/,
    handler: ({ info }, team, tar) => {
      const flag = initFlag(team.length, 'memberChange');
      flag.target[tar] = true;
      flag.memberChange = info.includes('自動') ? 'auto' : 'manual';
      return flag;
    },
  },
  {
    name: 'defend from enermy status skill',
    regex: /使敵方技能的(\S+)失效/,
    handler: ({ info }, team, tar) => {
      const flag = initFlag(team.length, 'skillDefense');
      flag.target[tar] = true;
      flag.skillDefense = fetchValFromInfo(info, /使敵方技能的(\S+)失效/).split('、');
      return flag;
    },
  },
  {
    name: 'defend from enermy pass turn skill',
    regex: /使強制前進失效/,
    handler: (_, team, tar) => {
      const flag = initFlag(team.length, 'skillDefense');
      flag.target[tar] = true;
      flag.skillDefense = ['強制前進'];
      return flag;
    },
  },
  {
    name: 'defend direct damage from prop enermy by ratio',
    regex: /減輕\d+%(\S+)屬性傷害/,
    handler: ({ elmts, ratio }, team, tar) => {
      const flag = initFlag(team.length, 'propDefense');
      flag.target[tar] = true;
      flag.propDefense = {
        elmts,
        ratio: strToInt(ratio),
      };
      return flag;
    },
  },
  {
    name: 'defend direct damage from prop enermy by constant',
    regex: /減輕\d+點(\S+)屬性傷害/,
    handler: ({ elmts, const: val }, team, tar) => {
      const flag = initFlag(team.length, 'propDefense');
      flag.target[tar] = true;
      flag.propDefense = {
        elmts: elmts.split(''),
        const: strToInt(val),
      };
      return flag;
    },
  },
  {
    name: 'defend direct damage from breed enermy by ratio',
    regex: /減輕\d+%(\S+)敵人造成的傷害/,
    handler: ({
      breed, breed1, breed2, ratio,
    }, team, tar) => {
      const flag = initFlag(team.length, 'breedDefense');
      flag.target[tar] = true;
      flag.breedDefense = {
        breed: mutualInput(breed, breed1, breed2),
        ratio: Number.parseInt(ratio, 10),
      };
      return flag;
    },
  },
];

export function conditionFlag(szData, team, tar, debug = false) {
  const flagArr = conditionalFlagList.map(({ name, regex, handler }) => {
    if (!regex.test(szData.info)) return { name, flag: undefined };

    return { name, flag: handler(szData, team, tar) };
  });

  logDebug({
    module: 'conditionFlag', szData, team, flagArr,
  }, debug);

  return flagArr
    .map(({ flag }) => flag)
    .filter((flag) => !!flag)
    .flatMap((flag) => (Array.isArray(flag) ? flag : [flag]));
}

const asRelativeList = [
  {
    name: 'as skill enhance',
    regex: /答題技能「\S+」的效果值上升\d+點/,
    handler: ({ ratio, const: val }, team, tar) => {
      const flag = initFlag(team.length, 'asUp');
      flag.target[tar] = true;
      flag.asUp = {
        type: team[tar].asData.type,
        ratio: strToInt(ratio),
        const: strToInt(val),
      };
      return flag;
    },
  },
  {
    name: 'as skill enhance (only for prop2 enhance)',
    regex: /答題技能「強化複屬性攻擊」之對於複屬性效果值上升\d+點/,
    handler: ({ ratio }, team, tar) => {
      if (team[tar].asData.type !== '強化複屬性攻擊') return undefined;

      const flag = initFlag(team.length, 'asUp');
      flag.target[tar] = true;
      flag.asUp = {
        type: team[tar].asData.type,
        ratio: strToInt(ratio),
      };
      return flag;
    },
  },
  {
    name: 'as skill enhance (add times on combo)',
    regex: /答題技能「連擊」的連擊數增加\d+/,
    handler: ({ const: val }, team, tar) => {
      if (team[tar].asData.type !== '強化複屬性攻擊') return undefined;

      const flag = initFlag(team.length, 'asUp');
      flag.target[tar] = true;
      flag.asUp = {
        type: team[tar].asData.type,
        const: strToInt(val),
      };
      return flag;
    },
  },
  {
    name: 'as skill enhance (add range on gamble)',
    regex: /答題技能「賭博攻擊」之效果/,
    handler: ({ ratio1, ratio2 }, team, tar) => {
      if (team[tar].asData.type !== '強化複屬性攻擊') return undefined;

      const flag = initFlag(team.length, 'asUp');
      flag.target[tar] = true;
      flag.asUp = {
        type: team[tar].asData.type,
        ratio: [
          Number.parseInt(ratio1, 10),
          Number.parseInt(ratio2, 10),
        ].sort(),
      };
      return flag;
    },
  },
];

const ssRelativeList = [
  {
    name: 'ss skill enhance',
    regex: [
      /特殊技能「\S+」的((初期)|(特效)|(持續)|(弱化)|(傷害上升))?((效果值)|(傷害)|(傷害效果值))(上升|下降)(精靈數x)?\d+(點|%)/,
      /特殊技能「\S+」的(\S)屬性(傷害)?效果值上升\d+點/,
      /特殊技能「\S+」的(效果|強化傷害)上限值上升\d+點/,
      /特殊技能「\S+」的封印延長\d+回合，效果值上升精靈數x\d+點/,
      /特殊技能「\S+」的阻隔效果提升\d+/,
    ],
    handler: ({
      info, ratio, ratio1, ratio2, const: val, const1: val1, const2: val2,
    }, team, tar) => {
      if (!info.includes(team[tar].ssData.type)) return undefined;

      const flag = initFlag(team.length, 'ssUp');
      flag.target[tar] = true;
      flag.ssUp = {
        type: team[tar].ssData.type,
      };
      // 第一效果值(ratio): const1, ratio1, ratio
      if (ratio1 !== undefined) {
        flag.ssUp.ratio = strToInt(ratio1);
      } else if (val1 !== undefined) {
        flag.ssUp.ratio = strToInt(val1);
      } else {
        flag.ssUp.ratio = strToInt(ratio);
      }
      // 效果值(ratio), 連擊/持續回合(const)
      if (val !== undefined) {
        flag.ssUp.const = strToInt(val);
      }
      // 效果值(const1), 持續回合(const2)
      if (val2 !== undefined) {
        flag.ssUp.const = strToInt(val2);
      }
      // 自我犧牲魔術 (效果值紀錄至ratio, 自傷紀錄至const)
      if (team[tar].ssData.type === '自我犧牲魔術') {
        flag.ssUp.const = flag.ssUp.ratio;
        flag.ssUp.ratio = strToInt(
          fetchValFromInfo(info, /效果值上升(\d+)點/),
        );
      }
      // 炸裂大魔術 (旁邊效果值紀錄至const)
      if (team[tar].ssData.type === '炸裂大魔術') {
        flag.ssUp.const = strToInt(ratio2);
      }
      // 提昇 (效果值紀錄至ratio, 自傷紀錄至const)
      if (team[tar].ssData.type === '提昇') {
        [flag.ssUp.ratio, flag.ssUp.const] = [flag.ssUp.const, flag.ssUp.ratio];
      }
      // 反動大魔術 (封印延長紀錄至const)
      if (team[tar].ssData.type.indexOf('反動大魔術')) {
        flag.ssUp.const = strToInt(
          fetchValFromInfo(info, /封印延長(\d+)回合/),
        );
      }
      // 特定屬性加成
      if (/裝備此結晶之精靈的主屬性若為\S屬性/.test(info)) {
        const elmts = fetchValFromInfo(info, /主屬性若為(\S)屬性/);
        if (elmts === team[tar].prop) {
          flag.ssUp.const = strToInt(ratio1) + strToInt(ratio2);
        }
      }
      return flag;
    },
  },
  {
    name: 'ss skill enhance (combo)',
    regex: /特殊技能「\S+」的連擊數增加\d+/,
    handler: ({ info, const: val }, team, tar) => {
      if (!info.includes(team[tar].ssData.type)) return undefined;

      const flag = initFlag(team.length, 'ssUp');
      flag.target[tar] = true;
      flag.ssUp = {
        type: team[tar].ssData.type,
        const: strToInt(val),
      };
      return flag;
    },
  },
  {
    name: 'ss skill enhance (during turn)',
    regex: /特殊技能「\S+」的(強化傷害)持續回合數增加\d+/,
    handler: ({ const: val }, team, tar) => {
      const flag = initFlag(team.length, 'ssUp');
      flag.target[tar] = true;
      flag.ssUp = {
        type: team[tar].ssData.type,
        const: strToInt(val),
      };
      return flag;
    },
  },
  {
    name: 'ss skill enhance (蓄積解放大魔術)',
    regex: /特殊技能「蓄積解放大魔術‧\S」/,
    handler: ({ info, ratio, const: val }, team, tar) => {
      const flag = initFlag(team.length, 'ssUp');
      flag.target[tar] = true;
      flag.ssUp = removeUndefinedProp({
        type: team[tar].ssData.type,
        ratio: ratio ? strToInt(val) : undefined,
        const: /任務開始時/.test(info) ? strToInt(fetchValFromInfo(info, /(\d+)％/)) : undefined,
      });
      return flag;
    },
  },
  {
    name: 'ss skill enhance (賦予雙重AS)',
    regex: /特殊技能「賦予雙重AS」/,
    handler: ({ info }, team, tar) => {
      const flag = initFlag(team.length, 'ssUp');
      flag.target[tar] = true;
      flag.ssUp = {
        type: team[tar].ssData.type,
        ratio: strToInt(fetchValFromInfo(info, /效果值：(\d+)/)),
      };
      return flag;
    },
  },
  {
    name: 'ss skill enhance (強化擊破)',
    regex: /特殊技能「強化擊破」/,
    handler: ({ const: val }, team, tar) => {
      const flag = initFlag(team.length, 'ssUp');
      flag.target[tar] = true;
      flag.ssUp = {
        type: team[tar].ssData.type,
        const: strToInt(val),
        skillDefense: ['詛咒S'], // 詛咒S: 詛咒 cannot affect some skill
      };
      return flag;
    },
  },
  {
    name: 'ss skill enhance (犧牲連鎖強化)',
    regex: /特殊技能「犧牲連鎖強化」/,
    handler: ({ chain, ratio, const: val }, team, tar) => {
      const flag = initFlag(team.length, 'ssUp');
      flag.target[tar] = true;
      flag.ssUp = {
        type: team[tar].ssData.type,
        chain: strToInt(chain),
        ratio: strToInt(ratio),
        const: strToInt(val),
      };
      return flag;
    },
  },
  {
    name: 'ss skill enhance (犧牲魔術)',
    regex: /特殊技能「犧牲魔術」/,
    handler: ({ ratio }, team, tar) => {
      const flag = initFlag(team.length, 'ssUp');
      flag.target[tar] = true;
      flag.ssUp = {
        type: team[tar].ssData.type,
        const: strToInt(ratio),
      };
      return flag;
    },
  },
  {
    name: 'ss skill enhance (產生連結問題類型)',
    regex: /特殊技能「產生連結問題類型」/,
    handler: ({ ratio }, team, tar) => {
      const flag = initFlag(team.length, 'ssUp');
      flag.target[tar] = true;
      flag.ssUp = {
        type: team[tar].ssData.type,
        ratio: strToInt(ratio),
      };
      return flag;
    },
  },
  {
    name: 'ss skill enhance (產生連結問題類型)',
    regex: /特殊技能「詠唱大魔術」/,
    handler: ({ const: val }, team, tar) => {
      const flag = initFlag(team.length, 'ssUp');
      flag.target[tar] = true;
      flag.ssUp = {
        type: team[tar].ssData.type,
        const: strToInt(val),
      };
      return flag;
    },
  },
  {
    name: 'ss skill enhance (時限大魔術)',
    regex: /設置時限大魔術/,
    handler: ({ const: val }, team, tar) => {
      const flag = initFlag(team.length, 'ssUp');
      flag.target[tar] = true;
      flag.ssUp = {
        type: team[tar].ssData.type,
        const: strToInt(val),
      };
      return flag;
    },
  },
  {
    name: 'ss skill add (賦予特殊技能「強化精靈」的效果)',
    regex: /賦予特殊技能「強化精靈」的效果/,
    handler: ({
      info, ratio, ratio1, ratio2,
    }, team, tar) => {
      const flag = initFlag(team.length, 'ssUp');
      flag.target[tar] = true;
      flag.ssUp = {
        type: team[tar].ssData.type,
        ratio: mutualInput(strToInt(ratio), strToInt(ratio1), strToInt(ratio2)),
        const: strToInt(fetchValFromInfo(info, /(\d+)回合/)),
      };
      return flag;
    },
  },
];

export function skillRelative(szData, team, tar, debug = false) {
  const asTypes = team[tar].asData.type.split(/[・‧]+/);
  const asFlagArr = asRelativeList.map(({ name, regex, handler }) => {
    if (asTypes.every((asType) => !szData.info.includes(asType))) return { name, flag: undefined };
    if (infoRegexChecker(szData.info, regex)) return { name, flag: undefined };

    const flag = handler(szData, team, tar);
    flag.asUp = removeUndefinedProp(flag.asUp);

    return { name, flag };
  });

  logDebug({
    module: 'skillRelative: AS', szData, team, asFlagArr,
  }, debug);

  const ssFlagArr = ssRelativeList.map(({ name, regex, handler }) => {
    if (!szData.info.includes(team[tar].ssData.type)) return { name, flag: undefined };
    if (infoRegexChecker(szData.info, regex)) return { name, flag: undefined };

    const flag = handler(szData, team, tar);
    flag.ssUp = removeUndefinedProp(flag.ssUp);

    return { name, flag };
  });

  logDebug({
    module: 'skillRelative: SS', szData, team, ssFlagArr,
  }, debug);

  return [...asFlagArr, ...ssFlagArr]
    .map(({ flag }) => flag)
    .filter((flag) => !!flag)
    .flatMap((flag) => (Array.isArray(flag) ? flag : [flag]));
}
