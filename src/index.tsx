import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Quiz from './pages/quiz';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Quiz/>
  </React.StrictMode>
);


