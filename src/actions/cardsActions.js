import { createAsyncThunk } from '@reduxjs/toolkit';

import cardsFilter from '../helper/cardsFilter';
import getOptionsFromSource from '../helper/getOptionsFromSource';
import { JSON_NAMES, JSON_ROUTE_SOURCES } from '../model/variables';

const DEFAULT_FETCH_TIMEOUT = 2500;

const buildJsonRouteUrls = (relativePath) => JSON_ROUTE_SOURCES.map((source) => ({
  label: source.name,
  url: `${source.baseUrl}${relativePath}`,
}));

const fetchJsonWithMultiRoute = async (relativePath, timeoutMs = DEFAULT_FETCH_TIMEOUT) => {
  const controllers = new Map();
  const routeUrls = buildJsonRouteUrls(relativePath);
  let winnerUrl = null;

  const abortOtherRoutes = (winningUrl) => {
    for (const [url, controller] of controllers.entries()) {
      if (url !== winningUrl) {
        controller.abort();
      }
    }
  };

  const fetchPromises = routeUrls.map(({ label, url }) => {
    const controller = new AbortController();
    controllers.set(url, controller);

    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    return fetch(url, {
      signal: controller.signal,
      cache: 'no-cache',
    })
      .then((response) => {
        clearTimeout(timeoutId);
        if (!response.ok) {
          throw new Error(`${label} ${url} responded with ${response.status}`);
        }

        if (!winnerUrl) {
          winnerUrl = url;
          abortOtherRoutes(url);
        }

        return response.json();
      })
      .catch((error) => {
        clearTimeout(timeoutId);
        const details = error?.name === 'AbortError'
          ? 'timeout'
          : error?.message ?? 'unknown error';
        throw new Error(`${label} ${url} failed: ${details}`);
      });
  });

  try {
    return await Promise.any(fetchPromises);
  } catch (error) {
    controllers.forEach((controller) => controller.abort());
    const errorMessages = error?.errors?.map((err) => err.message).join(' | ') || error.message;
    throw new Error(`Failed to fetch ${relativePath} from all routes: ${errorMessages}`);
  }
};

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
    const source = await fetchJsonWithMultiRoute(JSON_NAMES['卡片資料']);
    const exs = await fetchJsonWithMultiRoute(JSON_NAMES['結晶'])
      .then((data) => data.toSorted(
        (lhs, rhs) => Number.parseInt(lhs.id, 10) - Number.parseInt(rhs.id, 10),
      ));
    const leaderExs = await fetchJsonWithMultiRoute(JSON_NAMES['大結晶'])
      .then((data) => data.toSorted(
        (lhs, rhs) => lhs.name.localeCompare(rhs.name),
      ));

    // NOTE: Handling old and new format
    cardData.Senzai = source.Senzai;
    if (source.card) {
      cardData.card = source.card;
    } else {
      const { prefix, count } = source;
      const chunks = await Promise.all(
        [...Array(count)].map(
          (__, idx) => fetchJsonWithMultiRoute(`${prefix}${idx}.json`),
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
