import React from 'react';
import { Provider } from 'react-redux';
import { createHashRouter, RouterProvider } from 'react-router-dom';

import store from './store/store';
import {
  Card, Cards, EXCards, Root, Team,
} from './views';

const router = createHashRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        element: <Cards />,
      },
      {
        path: 'card/:cardId',
        element: <Card />,
      },
      {
        path: 'ex',
        element: <EXCards />,
      },
      {
        path: 'team',
        element: <Team />,
      },
      {
        path: 'team/:team',
        element: <Team />,
      },
    ],
  },
]);

export default function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}
