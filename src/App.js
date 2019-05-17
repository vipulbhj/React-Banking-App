import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import IndexPage from './Pages/IndexPage/IndexPage';
import HomePage from './Pages/HomePage/HomePage';
import LoanApplicationFormPage from './Pages/LoanApplicationFormPage/LoanApplicationFormPage';
import NoMatch from './Pages/404/NoMatch';
import Navbar from './components/NavBar/Navbar';

import { authenticated } from './auth';
import './App.css';
import './theme.css';

const alertOptions = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER
};

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    authenticated() === true
      ? <Component {...props} />
      : <Redirect to={{
        pathname: '/',
        state: { from: props.location }
      }} />
  )} />
)

class App extends React.Component {
  render() {
    return (
      <Router>
        <Provider template={AlertTemplate} {...alertOptions}>
          <div className="app-container">
            <Navbar />
            <Switch>
              <Route exact path="/" component={IndexPage} />
              <PrivateRoute path="/home" component={HomePage} />
              <PrivateRoute path="/loan" component={LoanApplicationFormPage} />
              <Route component={NoMatch} />
            </Switch>
          </div>
        </Provider>
      </Router>
    )
  }
}

export default App;