import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import './index.css';
import App from './App';
import Auth from './components/context';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Auth.AuthProvider>
        <App />
      </Auth.AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
