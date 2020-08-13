import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, withRouter } from "react-router-dom";
import IndexPage from './Pages/IndexPage/IndexPage';
import HomePage from './Pages/HomePage/HomePage';
import LoanApplicationFormPage from './Pages/LoanApplicationFormPage/LoanApplicationFormPage';
import NoMatch from './Pages/404/NoMatch';
import Navbar from './components/NavBar/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

class ScrollToTop extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return this.props.children;
  }
}

const ScrollTop = withRouter(ScrollToTop);

export const Routes = () => {
  return (<Switch>
    <Route exact path="/" component={IndexPage}/>
    <PrivateRoute path="/home" component={HomePage}/>
    <PrivateRoute path="/loan" component={LoanApplicationFormPage}/>
    <Route component={NoMatch}/>
  </Switch>)
}

class App extends Component {
  render() {
    return (
      <Router onUpdate={() => window.scrollTo(0, 0)}>
        <ScrollTop>
          <div className="app-container">
            <div className="fixed-up-top"><Navbar /></div>
            <Routes/>
            <ToastContainer autoClose={8000} />
          </div>
        </ScrollTop>
      </Router>
    )
  }
}

export default App;
