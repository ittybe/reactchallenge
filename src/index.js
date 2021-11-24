import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {
  BrowserRouter,
  HashRouter,
  Routes,
  Route
} from "react-router-dom";
ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/employees" element={<App />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);