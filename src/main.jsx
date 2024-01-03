import React from 'react';
import ReactDOM from 'react-dom/client';

import 'purecss-sass';

import App from './App';

import './assets/scss/main.scss';
import './assets/scss/side-menu.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
