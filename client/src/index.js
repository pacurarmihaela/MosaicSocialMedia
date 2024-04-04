import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from "./store/ReduxStore";
import { Provider } from 'react-redux' ;
import {BrowserRouter, Routes, Route} from "react-router-dom";
import { MantineProvider } from '@mantine/core';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>

  <React.StrictMode>
    <BrowserRouter>
    <MantineProvider
      theme={{
        // Customizations for the theme
        colorScheme: 'light',
      }}
    >

    <Routes>
      <Route path="*" element={<App/>}/>
    </Routes>
    </MantineProvider>
    </BrowserRouter>
  </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
