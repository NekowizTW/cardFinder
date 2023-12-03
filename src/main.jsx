import React from 'react'
import ReactDOM from "react-dom/client"

import App from './App'

import './assets/css/react-select.scss'
import './assets/css/rc-pagination.scss'
import './assets/css/rc-input-number.scss'
import './assets/css/side-menu.scss'

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
