import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import IndexPage from './Pages/IndexPage/IndexPage';
import HomePage from './Pages/HomePage/HomePage';
import LoanApplicationFormPage from './Pages/LoanApplicationFormPage/LoanApplicationFormPage';
import NoMatch from './Pages/404/NoMatch';
import Navbar from './components/NavBar/Navbar';

import { authenticated } from './auth';
import './App.css';
import './theme.css';


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
        <div className="app-container">
          <div className="fixed-up-top"><Navbar /></div>
          <Switch>
            <Route exact path="/" component={IndexPage} />
            <PrivateRoute path="/home" component={HomePage} />
            <PrivateRoute path="/loan" component={LoanApplicationFormPage} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;