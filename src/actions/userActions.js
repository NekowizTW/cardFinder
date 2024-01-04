import { createAsyncThunk } from '@reduxjs/toolkit';

export const toggleCards = createAsyncThunk(
  'user/toggle',
  async ({ ids, checked }, thunkAPI) => {
    const { selected } = thunkAPI.getState().user;
    const selectedCardSet = new Set(selected);

    ids.forEach((id) => {
      if (checked) {
        selectedCardSet.add(id);
      } else {
        selectedCardSet.delete(id);
      }
    });

    return Array.from(selectedCardSet);
  },
);

export const clearSelected = createAsyncThunk(
  'user/clear',
);
