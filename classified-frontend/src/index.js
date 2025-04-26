import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import {Provider} from "react-redux"
import './index.css'; 
import store from './Store/configureStore.js'

import ClassifiedApp from './Classified[1]/Classified/ClassifiedApp.js';
console.log(store.getState())

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store = {store}>
    <BrowserRouter>
     <ClassifiedApp/>
    </BrowserRouter>
  </Provider>
);