import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { GlobalDataProvider } from './context/GlobalDataContext';
import { ExchangeDataProvider } from './context/ExchangeDataContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalDataProvider>
      <ExchangeDataProvider>
        <App />
      </ExchangeDataProvider>
    </GlobalDataProvider>
  </React.StrictMode>
); 