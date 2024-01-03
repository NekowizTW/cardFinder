import {
  BREEDS,
  EXAS_CONDITIONS_FLATTEN,
  EXAS_TYPES_FLATTEN,
  PROPS,
  PROPS2,
  RANKS,
  SKILL_AS_FLATTEN,
  SKILL_AS2_FLATTEN,
  SKILL_SS_FLATTEN,
  SKILL_SS2_FLATTEN,
} from '../model/variables';

const defaultFilters = {
  search: '',
  prop: PROPS,
  prop2: PROPS2,
  breed: BREEDS,
  rank: RANKS,
  as: SKILL_AS_FLATTEN,
  as2: SKILL_AS2_FLATTEN,
  ss: SKILL_SS_FLATTEN,
  ss2: SKILL_SS2_FLATTEN,
  exasCondition: EXAS_CONDITIONS_FLATTEN,
  exasType: EXAS_TYPES_FLATTEN,
  isHaifu: false,
  isMaxEvo: true,
};

// eslint-disable-next-line import/prefer-default-export
export function searchParamsToFilters(params) {
  const result = Object.entries(defaultFilters).map(([key, defaultValue]) => {
    if (key === 'search') return ['search', params.get('search') ?? ''];
    if (key === 'isHaifu') return ['isHaifu', params.get('isHaifu') ?? false];
    if (key === 'isMaxEvo') return ['isMaxEvo', params.get('isMaxEvo') ?? true];

    const val = params.get(key);
    return [key, defaultValue.filter((o) => o.value === val) ?? []];
  });
  return Object.fromEntries(result);
}

export function dataToSearchString(card, pickArray) {
  const result = pickArray.map((pickEntry) => {
    switch (pickEntry) {
      case 'prop': return [pickEntry, [card.prop]];
      case 'prop2': return [pickEntry, [card.prop2]];
      case 'breed': return [pickEntry, [card.breed]];
      default: return [];
    }
  });
  return new URLSearchParams(Object.fromEntries(result)).toString();
}
