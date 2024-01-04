import { createReducer } from '@reduxjs/toolkit';

import { clearSelected, toggleCards } from '../actions/userActions';

const initialState = {
  selected: [],
};

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(toggleCards.fulfilled, (state, action) => ({
      ...state,
      selected: action.payload,
    }))
    .addCase(clearSelected.fulfilled, (state) => ({
      ...state,
      selected: [],
    }));
});

export default userReducer;
