import { createAsyncThunk } from '@reduxjs/toolkit';

import createDebouncedAsyncThunk from '../helper/createDebounceAsyncThunk';

export const resetFilters = createAsyncThunk(
  'filters/reset',
  async () => {},
);

export const setSearchFilter = createDebouncedAsyncThunk(
  'filters/onSearch',
  async ({ search }) => search,
  500,
);

export const setBasicPropsFilter = createAsyncThunk(
  'filters/onBasicPropChanges',
  async ({
    prop, prop2, breed, rank,
  }) => ({
    prop, prop2, breed, rank,
  }),
);

export const setASPropsFilter = createAsyncThunk(
  'filters/onASPropChanges',
  async ({
    as, as2,
  }) => ({
    as, as2,
  }),
);

export const setSSPropsFilter = createAsyncThunk(
  'filters/onSSPropChanges',
  async ({
    ss, ss2,
  }) => ({
    ss, ss2,
  }),
);

export const setEXASPropsFilter = createAsyncThunk(
  'filters/onEXASPropChanges',
  async ({
    exasCondition, exasType,
  }) => ({
    exasCondition, exasType,
  }),
);

export const setSenzaiPropsFilter = createAsyncThunk(
  'filters/onSenzaiPropChanges',
  async ({
    senzai,
  }) => ({
    senzai,
  }),
);

export const setAdditionalPropsFilter = createAsyncThunk(
  'filters/onAdditionalPropChanges',
  async ({
    isHaifu, isMaxEvo, isSelectedOnly,
  }) => ({
    isHaifu, isMaxEvo, isSelectedOnly,
  }),
);

export const setAllPropsFilter = createAsyncThunk(
  'filters/onAllPropChange',
  async (filters) => filters,
);
