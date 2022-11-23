import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AlerContextProvider } from './Contexts/AlertContext';
import { ThemeContextProvider } from './Contexts/ThemeContext';
import { TimerContextprovider } from './Contexts/TimerContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <ThemeContextProvider>
  <TimerContextprovider>
  <AlerContextProvider>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </AlerContextProvider>
  </TimerContextprovider>
   </ThemeContextProvider>
  </React.StrictMode>
);


