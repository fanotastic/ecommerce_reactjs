import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { rootReducers } from './redux/reducers';
import ReduxThunk from 'redux-thunk';

const globalStore = createStore(rootReducers, {}, applyMiddleware(ReduxThunk))
// setelah rootReducers ada {} itu utk mengosongkan parameter kedua agar reduxthunk jd parameter ke3
ReactDOM.render(
  <Provider store={globalStore}> 
  {/* store ini seperti gudangnya/warehouse */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
