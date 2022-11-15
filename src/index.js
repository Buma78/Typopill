import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { TimerContextprovider } from './Contexts/TimerContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <TimerContextprovider>
    <App />
    </TimerContextprovider>
  </React.StrictMode>
);


