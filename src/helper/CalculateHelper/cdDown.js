import {
  fetchValFromInfo,
  infoRegexChecker,
  initEffect,
  logDebug,
  strToInt,
} from './utils';

const specialSkillCdDown = [
  {
    name: 'decrease first skill cd down of self',
    regex: /縮短首次發動特殊技能回合數\d+回合/,
    handler: ({ info, ...attrs }, team, tar) => {
      const effect = initEffect(team.length, 'cdf');
      const { const: val } = attrs;
      effect.target[tar] = true;
      effect.cdf -= strToInt(val);
      return effect;
    },
  },
  {
    name: 'decrease second skill cd down of self',
    regex: /縮短第二次之後發動特殊技能回合數\d+回合/,
    handler: ({ info, ...attrs }, team, tar) => {
      const effect = initEffect(team.length, 'cds');
      const { const: val } = attrs;
      effect.target[tar] = true;
      effect.cds -= strToInt(val);
      return effect;
    },
  },
  {
    name: 'decrease specified skill cd down of',
    regex: /縮短特殊技能「\S+」(、「\S+」)?發動回合數\d+回合/,
    handler: ({ info, ...attrs }, team, tar) => {
      const skillType = fetchValFromInfo(info, /縮短特殊技能「(\S+)」/);
      if (!team[tar].ssData.type.indexOf(skillType)) return undefined;

      const { const: val } = attrs;
      const effect1 = initEffect(team.length, 'cdf');
      effect1.target[tar] = true;
      effect1.cdf -= strToInt(val);
      const effect2 = initEffect(team.length, 'cds');
      effect2.target[tar] = true;
      effect2.cds -= strToInt(val);
      return [effect1, effect2];
    },
  },
];

export default function cdDown(szData, team, tar, debug = false) {
  const effectArr = specialSkillCdDown.map(({ name, regex, handler }) => {
    if (!infoRegexChecker(szData.info, regex)) return { name, effect: undefined };

    const effect = handler(szData, team, tar);

    logDebug(`cdDown/${name}`, effect, debug);

    return { name, effect };
  });

  const statistics = effectArr
    .map(({ effect }) => effect)
    .filter((effect) => !!effect)
    .flatMap((effect) => (Array.isArray(effect) ? effect : [effect]));

  logDebug('cdDown/statistics', { szData, team, statistics }, debug);

  return statistics;
}
