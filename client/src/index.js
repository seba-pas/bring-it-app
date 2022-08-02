import React from "react";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import {store} from "../src/store/index";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import dotenv from "dotenv";
import axios from "axios";
import { PersistGate } from "redux-persist/integration/react";
import {persistor} from '../src/store/index'
import { ChakraProvider } from '@chakra-ui/react'





dotenv.config();

axios.defaults.baseURL = process.env.REACT_APP_API || "http://localhost:3001";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
      <ChakraProvider>
  <StrictMode>
   

    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
    
  </StrictMode>
        </ChakraProvider>
  // document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
