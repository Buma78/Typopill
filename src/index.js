import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AlertContextProvider } from './Contexts/AlertContext';
import { ThemeContextProvider } from './Contexts/ThemeContext';
import { TestModeContextprovider } from './Contexts/TestMode';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <ThemeContextProvider>
  <TestModeContextprovider>
  <AlertContextProvider>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </AlertContextProvider>
  </TestModeContextprovider>
   </ThemeContextProvider>
  </React.StrictMode>
);


