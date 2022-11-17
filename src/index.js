import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeContextProvider } from './Contexts/ThemeContext';
import { TimerContextprovider } from './Contexts/TimerContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <ThemeContextProvider>
  <TimerContextprovider>
    <App />
    </TimerContextprovider>
    </ThemeContextProvider>
  </React.StrictMode>
);


