import React from 'react';
import { createRoot } from 'react-dom/client';
import { store } from './store';
import { Provider } from 'react-redux';
import App from './App';

const root = createRoot(document.getElementById('app'));

root.render(
  <Provider store={store}>
    <App/>
  </Provider>
);