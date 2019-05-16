import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import IndexPage from './Pages/IndexPage/IndexPage';
import HomePage from './Pages/HomePage/HomePage';
import LoanApplicationFormPage from './Pages/LoanApplicationFormPage/LoanApplicationFormPage';
import NoMatch from './Pages/404/NoMatch';
import Navbar from './components/NavBar/Navbar';
import './App.css';
import './theme.css';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="app-container">
          <Navbar />
          <Switch>
            <Route exact path="/" component={IndexPage} />
            <Route path="/home" component={HomePage} />
            <Route path="/loan" component={LoanApplicationFormPage} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;