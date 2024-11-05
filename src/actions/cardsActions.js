import { createAsyncThunk } from '@reduxjs/toolkit';

import cardsFilter from '../helper/cardsFilter';
import getOptionsFromSource from '../helper/getOptionsFromSource';
import { CDN_URL, JSON_NAMES } from '../model/variables';

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
    const cardData = { card: [], Senzai: [] };
    const source = await fetch(CDN_URL + JSON_NAMES['卡片資料'], { cache: 'no-cache' })
      .then((response) => response.json());
    const exs = await fetch(CDN_URL + JSON_NAMES['結晶'], { cache: 'no-cache' })
      .then((response) => response.json())
      .then((data) => data.toSorted(
        (lhs, rhs) => Number.parseInt(lhs.id, 10) - Number.parseInt(rhs.id, 10),
      ));
    const leaderExs = await fetch(CDN_URL + JSON_NAMES['大結晶'], { cache: 'no-cache' })
      .then((response) => response.json())
      .then((data) => data.toSorted(
        (lhs, rhs) => (lhs.name.localeCompare(rhs.name)),
      ));

    // NOTE: Handling old and new format
    cardData.Senzai = source.Senzai;
    if (source.card) {
      cardData.card = source.card;
    } else {
      const { prefix, count } = source;
      const chunks = await Promise.all(
        [...Array(count)].map(
          (__, idx) => {
            const url = `${CDN_URL}${prefix}${idx}.json`;
            return fetch(url, { cache: 'no-cache' }).then((response) => response.json());
          },
        ),
      );
      cardData.card = chunks.reduce((acc, chunk) => acc.concat(chunk), []);
    }

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
