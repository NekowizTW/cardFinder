import { createAsyncThunk } from '@reduxjs/toolkit';

import cardsFilter from '../helper/cardsFilter';
import getOptionsFromSource from '../helper/getOptionsFromSource';
import { BASE_URL, JSON_NAMES } from '../model/variables';

export const analyzeCards = createAsyncThunk(
  'cards/analyze',
  async (cards) => {
    try {
      const result = getOptionsFromSource(cards);
      console.log({ result });
      return result;
    } catch (e) {
      console.error(e);
      return {};
    }
  },
);

export const initCards = createAsyncThunk(
  'cards/fetch',
  async (_, thunkAPI) => {
    const cardData = await fetch(BASE_URL + JSON_NAMES['卡片資料'])
      .then((response) => response.json());
    const exs = await fetch(BASE_URL + JSON_NAMES['結晶'])
      .then((response) => response.json())
      .then((data) => data.toSorted(
        (lhs, rhs) => Number.parseInt(lhs.id, 10) - Number.parseInt(rhs.id, 10),
      ));
    const leaderExs = await fetch(BASE_URL + JSON_NAMES['大結晶'])
      .then((response) => response.json())
      .then((data) => data.toSorted(
        (lhs, rhs) => (lhs.name.localeCompare(rhs.name)),
      ));

    await thunkAPI.dispatch(analyzeCards(cardData.card));

    return {
      ...cardData,
      exs,
      leaderExs,
    };
  },
);

export const filterCards = createAsyncThunk(
  'cards/filter',
  async (_, thunkAPI) => {
    const { cards, filters, user } = thunkAPI.getState();
    return cardsFilter(cards.sourceCards, filters, user.selected);
  },
);
