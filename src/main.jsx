import { configureStore } from '@reduxjs/toolkit';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { Provider, } from 'react-redux';
import './index.css';
import TaskReducer from './TaskReducer.jsx';

const store = configureStore({
  reducer: {
    tasks: TaskReducer
  }
})


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
