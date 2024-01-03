import { createReducer } from '@reduxjs/toolkit';

import {
  resetFilters, setAdditionalPropsFilter, setAllPropsFilter,
  setASPropsFilter, setBasicPropsFilter, setEXASPropsFilter,
  setSearchFilter,
  setSenzaiPropsFilter,
  setSSPropsFilter,
} from '../actions/filtersActions';

const initialState = {
  search: '',
  prop: [],
  prop2: [],
  breed: [],
  rank: [],
  as: [],
  as2: [],
  ss: [],
  ss2: [],
  senzai: [],
  exasCondition: [],
  exasType: [],
  isHaifu: false,
  isMaxEvo: true,
};

const filterReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(resetFilters.fulfilled, () => initialState)
    .addCase(setSearchFilter.fulfilled, (state, action) => ({
      ...state,
      search: action.payload,
    }))
    .addCase(setBasicPropsFilter.fulfilled, (state, action) => ({
      ...state,
      prop: action.payload.prop,
      prop2: action.payload.prop2,
      breed: action.payload.breed,
      rank: action.payload.rank,
    }))
    .addCase(setASPropsFilter.fulfilled, (state, action) => ({
      ...state,
      as: action.payload.as,
      as2: action.payload.as2,
    }))
    .addCase(setSSPropsFilter.fulfilled, (state, action) => ({
      ...state,
      ss: action.payload.ss,
      ss2: action.payload.ss2,
    }))
    .addCase(setEXASPropsFilter.fulfilled, (state, action) => ({
      ...state,
      exasCondition: action.payload.exasCondition,
      exasType: action.payload.exasType,
    }))
    .addCase(setSenzaiPropsFilter.fulfilled, (state, action) => ({
      ...state,
      senzai: action.payload.senzai,
    }))
    .addCase(setAdditionalPropsFilter.fulfilled, (state, action) => ({
      ...state,
      isHaifu: action.payload.isHaifu,
      isMaxEvo: action.payload.isMaxEvo,
    }))
    .addCase(setAllPropsFilter.fulfilled, (state, action) => ({
      ...state,
      ...action.payload,
    }));
});

export default filterReducer;
