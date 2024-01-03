import { createReducer } from '@reduxjs/toolkit';

import { toggleCard } from '../actions/userActions';

const initialState = {
  selected: [],
};

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(toggleCard.fulfilled, (state, action) => ({
      ...state,
      selected: action.payload,
    }));
});

export default userReducer;
