/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import { InputForm } from './InputForm/InputForm'
import { InputMDForm } from "./InputMDForm/InputMDForm";
import styles from "./App.module.css"
import { theme } from "./theme";
import { ThemeProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { SimpleForm } from "./SimpleForm/SimpleForm";
import { MultiForm } from "./MultiForm/MultiForm";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const App = () => {
  const [show, setShow] = useState("basic")
  return (
    <Router>
      <div className={styles.App}>
        <nav>
          <ul>
            <li>
              <Link to="/input">InputForm</Link>
            </li>
            <li>
              <Link to="/md">MD</Link>
            </li>
            <li>
              <Link to="/simple">Simple</Link>
            </li>
            <li>
              <Link to="/multi">multi</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/input">
          <h3>Input Form</h3>
          <InputForm />
        </Route>
        <ThemeProvider theme={theme}>
          <Route path="/md">
            <h3>MD Form</h3>
            <InputMDForm />
          </Route>
          <Route path="/simple">
            <h3>Simple Form</h3>
            <SimpleForm />
          </Route>
          <Route path="/multi">
            <h3>Multi Form</h3>
            <MultiForm />
          </Route>
        </ThemeProvider>
      </Switch>
    </div>
  </Router>
  )
}

export default App