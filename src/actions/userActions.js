import { createAsyncThunk } from '@reduxjs/toolkit';

// eslint-disable-next-line import/prefer-default-export
export const toggleCard = createAsyncThunk(
  'user/toggle',
  async ({ id, checked }, thunkAPI) => {
    const { selected } = thunkAPI.getState().user;
    const selectedCardSet = new Set(selected);

    if (checked) {
      selectedCardSet.add(id);
    } else {
      selectedCardSet.delete(id);
    }

    return Array.from(selectedCardSet);
  },
);
