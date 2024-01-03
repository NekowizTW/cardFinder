import {
  EXAS_CONDITIONS,
  EXAS_TYPES,
  SKILL_AS,
  SKILL_AS2,
  SKILL_SS,
  SKILL_SS2,
} from '../model/variables';

import { constructRegExp } from './cardsFilter';
import flattenOptions from './flattenOptions';

const EXAS_CONDITIONS_FLATTEN = flattenOptions(EXAS_CONDITIONS);
const EXAS_TYPES_FLATTEN = flattenOptions(EXAS_TYPES);
const SKILL_AS_FLATTEN = flattenOptions(SKILL_AS);
const SKILL_AS2_FLATTEN = flattenOptions(SKILL_AS2);
const SKILL_SS_FLATTEN = flattenOptions(SKILL_SS);
const SKILL_SS2_FLATTEN = flattenOptions(SKILL_SS2);

const isOptionExist = (target, sourceOtions, additionalOptions, useInclude = false) => {
  if (useInclude) {
    return sourceOtions.some((option) => option.value === target)
      || additionalOptions.some((option) => option.value === target);
  }

  return sourceOtions.some((option) => constructRegExp(option.value).test(target))
    || additionalOptions.some((option) => constructRegExp(option.value).test(target));
};

const generateUncategoriedOption = (target, noRegex = false) => {
  const regex = noRegex ? undefined : constructRegExp(target);

  return {
    label: target,
    value: noRegex ? target : { source: regex.source, flags: regex.flags },
  };
};

export default function getOptionsFromSource(sourceCards) {
  const additionalOptions = sourceCards.reduce((acc, card) => {
    if (card.asData.type) {
      const asTypes = card.asData.type.split(/[・‧]+/);

      const asTypeUnCagorized = asTypes
        .filter((asType) => !!asType && !isOptionExist(asType, SKILL_AS_FLATTEN, acc.as))
        .map(generateUncategoriedOption);

      acc.as.push(...asTypeUnCagorized);
    }

    if (card.as2Data.type) {
      const as2Types = card.as2Data.type.split(/[・‧]+/);

      const as2TypeUnCagorized = as2Types
        .filter((as2Type) => !!as2Type && !isOptionExist(as2Type, SKILL_AS2_FLATTEN, acc.as2))
        .map(generateUncategoriedOption);

      acc.as2.push(...as2TypeUnCagorized);
    }

    if (card.ssData.type) {
      const ssType = card.ssData.type;

      if (!isOptionExist(ssType, SKILL_SS_FLATTEN, acc.ss, true)) {
        acc.ss.push(generateUncategoriedOption(ssType, true));
      }
    }

    if (card.ss2Data.type) {
      const ss2Type = card.ss2Data.type;

      if (!isOptionExist(ss2Type, SKILL_SS2_FLATTEN, acc.ss2, true)) {
        acc.ss2.push(generateUncategoriedOption(ss2Type, true));
      }
    }

    if (card.EXASData?.condition) {
      const exasCondition = card.EXASData.condition;

      if (!isOptionExist(exasCondition, EXAS_CONDITIONS_FLATTEN, acc.exasCondition)) {
        acc.exasCondition.push(generateUncategoriedOption(exasCondition));
      }
    }

    if (card.EXASData?.type) {
      const exasTypes = card.EXASData.type.split(/[・‧]+/);

      const exasTypesUnCagorized = exasTypes
        .filter((exasType) => (
          !!exasType && !isOptionExist(exasType, EXAS_TYPES_FLATTEN, acc.exasType)
        ))
        .map(generateUncategoriedOption);

      acc.as.push(...exasTypesUnCagorized);
    }

    return acc;
  }, {
    as: [],
    as2: [],
    ss: [],
    ss2: [],
    exasCondition: [],
    exasType: [],
  });

  return additionalOptions;
}
