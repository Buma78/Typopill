import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ThemeContextProvider } from './Contexts/ThemeContext';
import { TimerContextprovider } from './Contexts/TimerContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <ThemeContextProvider>
  <TimerContextprovider>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </TimerContextprovider>
   </ThemeContextProvider>
  </React.StrictMode>
);


