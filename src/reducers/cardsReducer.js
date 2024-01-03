import { createReducer } from '@reduxjs/toolkit';

import { analyzeCards, filterCards, initCards } from '../actions/cardsActions';
import { FETCH_STATUS } from '../model/variables';

const initialState = {
  status: FETCH_STATUS.IDLE,
  sourceCards: [],
  sourceSenzais: [],
  sourceEXCards: [],
  sourceLeaderEXCards: [],
  uncategorizedOptions: {
    as: [],
    as2: [],
    ss: [],
    ss2: [],
    exasCondition: [],
    exasType: [],
  },
  filteredCards: [],
};

const cardsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(analyzeCards.fulfilled, (state, action) => ({
      ...state,
      uncategorizedOptions: action.payload,
    }))
    .addCase(initCards.pending, (state) => ({
      ...state,
      status: FETCH_STATUS.PENDING,
    }))
    .addCase(initCards.rejected, (state) => ({
      ...state,
      status: FETCH_STATUS.FAILED,
    }))
    .addCase(initCards.fulfilled, (state, action) => ({
      ...state,
      status: FETCH_STATUS.SUCCESS,
      sourceCards: action.payload.card,
      sourceSenzais: action.payload.Senzai,
      sourceEXCards: action.payload.exs,
      sourceLeaderEXCards: action.payload.leaderExs,
    }))
    .addCase(filterCards.fulfilled, (state, action) => ({
      ...state,
      filteredCards: action.payload,
    }));
});

export default cardsReducer;
