// A filter function has two parts.
// 1. prepare: some common work should be done here.
// 2. handler: only compare here

/**
 * Constructs a regular expression object from a string or a regular expression object.
 *
 * @param {string|{ source: string; flags: string; }}
 *        value - The string or objectto construct the regular expression from.
 * @returns {RegExp} The constructed regular expression object.
 */
export const constructRegExp = (value) => {
  if (typeof value === 'string') {
    return new RegExp(`^${value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')}$`);
  }

  return new RegExp(value.source, value.flags);
};

const emptyNameFilter = {
  handler: (card) => card.name.trim().length > 0,
};

const searchFilter = {
  prepare: ({ search }) => search
    .trim()
    .split(' ')
    .filter((token) => token.length > 0),
  handler: (card, { search }) => {
    const tokens = search;
    if (!tokens.length) return true;
    return tokens.every(
      (token) => card.id.includes(token) || card.name.includes(token),
    );
  },
};

const basicPropsFilter = {
  prepare: ({
    prop, prop2, breed, rank,
  }) => {
    const nextProp = prop.map((item) => item.value);
    const nextProp2 = prop2.map((item) => {
      if (nextProp.includes(item.value)) return '';
      return item.value;
    });
    return {
      prop: nextProp,
      prop2: nextProp2,
      breed: breed.map((item) => item.value),
      rank: rank.map((item) => item.value),
    };
  },
  handler: (card, {
    prop, prop2, breed, rank,
  }) => {
    if (prop.length && !prop.includes(card.prop)) return false;
    if (prop2.length && !prop2.includes(card.prop2)) return false;
    if (breed.length && !breed.includes(card.breed)) return false;
    if (rank.length) {
      if (rank.includes('X') && card.evo_to !== '') return false;
      if (!rank.includes(card.rank)) return false;
    }
    return true;
  },
};

const asPropsFilter = {
  prepare: ({
    as, as2,
  }) => ({
    as: as.map((item) => constructRegExp(item.value)),
    as2: as2.map((item) => constructRegExp(item.value)),
  }),
  handler: (card, {
    as, as2,
  }) => {
    if (as.length) {
      if (!card.asData || !card.asData.type) return false;
      const cardASTypes = card.asData.type.split(/[・‧]+/);
      if (
        !as.every((asRegExp) => cardASTypes.some((type) => asRegExp.test(type)))
      ) return false;
    }
    if (as2.length) {
      if (!card.as2Data || !card.as2Data.type) return false;
      const cardASTypes = card.as2Data.type.split(/[・‧]+/);
      if (
        !as2.every((asRegExp) => cardASTypes.some((type) => asRegExp.test(type)))
      ) return false;
    }
    return true;
  },
};

const ssPropsFilter = {
  prepare: ({
    ss, ss2,
  }) => ({
    ss: ss.map((item) => item.value),
    ss2: ss2.map((item) => item.value),
  }),
  handler: (card, {
    ss, ss2,
  }) => {
    if (ss.length) {
      if (!card.ssData || !card.ssData.type) return false;
      if (!ss.includes(card.ssData.type)) return false;
    }
    if (ss2.length) {
      if (!card.ss2Data || !card.ss2Data.type) return false;
      if (!ss2.includes(card.ss2Data.type)) return false;
    }
    return true;
  },
};

const exasPropsFilter = {
  prepare: ({
    exasCondition, exasType,
  }) => ({
    exasCondition: exasCondition.map((item) => constructRegExp(item.value)),
    exasType: exasType.map((item) => constructRegExp(item.value)),
  }),
  handler: (card, {
    exasCondition, exasType,
  }) => {
    if (exasCondition.length) {
      if (!card.EXASData || !card.EXASData.condition) return false;
      if (
        !exasCondition.some((exasRegExp) => exasRegExp.test(card.EXASData.condition))
      ) return false;
    }
    if (exasType.length) {
      if (!card.EXASData || !card.EXASData.type) return false;
      const cardEXASTypes = card.EXASData.type.split(/[・‧]+/);
      if (
        !exasType.every((exasRegExp) => cardEXASTypes.some((type) => exasRegExp.test(type)))
      ) return false;
    }
    return true;
  },
};

const senzaiPropsFilter = {
  prepare: ({
    senzai,
  }) => ({
    senzai: senzai.map((item) => constructRegExp(item.value)),
  }),
  handler: (card, { senzai }) => {
    if (senzai.length) {
      const cardSenzais = [
        card.senzaiL_4, card.senzaiL_3, card.senzaiL_2, card.senzaiL_1,
        card.senzai_10, card.senzai_9, card.senzai_8, card.senzai_7, card.senzai_6,
        card.senzai_5, card.senzai_4, card.senzai_3, card.senzai_2, card.senzai_1,
      ].filter((szString) => {
        if (!szString) return false;
        return senzai.some((szRegex) => szRegex.test(szString));
      });
      if (!cardSenzais.length) return false;
    }
    return true;
  },
};

const additionalPropsFilter = {
  prepare: ({
    isHaifu, isMaxEvo, isSelectedOnly,
  }, selected) => ({
    isHaifu, isMaxEvo, isSelectedOnly, selectedSet: new Set(selected),
  }),
  handler: (card, {
    isHaifu, isMaxEvo, isSelectedOnly, selectedSet,
  }) => {
    if (isHaifu && !(card.obtainType?.type === 'haifu')) return false;
    if (isMaxEvo && card.evo_to !== '') return false;
    if (isSelectedOnly && !selectedSet.has(card.id)) return false;
    return true;
  },
};

export default function cardsFilter(cards, filters, selected = []) {
  const nextFilters = {
    search: searchFilter.prepare(filters),
    ...basicPropsFilter.prepare(filters),
    ...asPropsFilter.prepare(filters),
    ...ssPropsFilter.prepare(filters),
    ...exasPropsFilter.prepare(filters),
    ...senzaiPropsFilter.prepare(filters),
    ...additionalPropsFilter.prepare(filters, selected),
  };

  const result = cards.reduce((acc, card) => {
    if (!emptyNameFilter.handler(card)) return acc;
    if (!searchFilter.handler(card, nextFilters)) return acc;
    if (!basicPropsFilter.handler(card, nextFilters)) return acc;
    if (!asPropsFilter.handler(card, nextFilters)) return acc;
    if (!ssPropsFilter.handler(card, nextFilters)) return acc;
    if (!exasPropsFilter.handler(card, nextFilters)) return acc;
    if (!senzaiPropsFilter.handler(card, nextFilters)) return acc;
    if (!additionalPropsFilter.handler(card, nextFilters)) return acc;

    // add passed card into result
    acc.push(card);
    return acc;
  }, []);

  return result;
}
