import {
  BREEDS,
  EXAS_CONDITIONS,
  EXAS_TYPES,
  PROPS2,
  PROPS,
  RANKS,
  SKILL_AS2,
  SKILL_AS,
  SKILL_SS2,
  SKILL_SS,
} from '../model/variables';

const defaultFilters = {
  search: '',
  prop: PROPS,
  prop2: PROPS2,
  breed: BREEDS,
  rank: RANKS,
  as: SKILL_AS,
  as2: SKILL_AS2,
  ss: SKILL_SS,
  ss2: SKILL_SS2,
  exasCondition: EXAS_CONDITIONS,
  exasType: EXAS_TYPES,
  isHaifu: false,
  isMaxEvo: true,
};

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
