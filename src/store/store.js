import { configureStore } from '@reduxjs/toolkit';

import cardsReducer from '../reducers/cardsReducer';
import filterReducer from '../reducers/filtersReducer';
import teamReducer from '../reducers/teamReducer';
import userReducer from '../reducers/userReducer';

const store = configureStore({
  reducer: {
    cards: cardsReducer,
    filters: filterReducer,
    user: userReducer,
    team: teamReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export default store;
