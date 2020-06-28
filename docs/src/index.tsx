import React from 'react';
import {render} from 'react-snapshot';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {
  Switch,
  Route,
  BrowserRouter,
} from "react-router-dom"
import { ThemeProvider } from '@material-ui/core';
import { theme } from './theme';
import { getRouteLinks } from './routes';


render((
  <div>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </div>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
