import { createReducer } from '@reduxjs/toolkit';

import {
  setOrderBy, setPageNum, setPaging, setSortBy,
} from '../actions/sortsActions';

const initialState = {
  sortBy: 'id',
  orderBy: -1,
  paging: 10,
  pageNum: 0,
};

const sortsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setSortBy.fulfilled, (state, action) => ({
      ...state,
      sortBy: action.payload,
    }))
    .addCase(setOrderBy.fulfilled, (state, action) => ({
      ...state,
      setOrderBy: action.payload,
    }))
    .addCase(setPaging.fulfilled, (state, action) => ({
      ...state,
      paging: action.payload,
    }))
    .addCase(setPageNum.fulfilled, (state, action) => ({
      ...state,
      pageNum: action.payload,
    }));
});

export default sortsReducer;
