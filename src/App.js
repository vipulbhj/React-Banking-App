import React from 'react';
import Cookies from 'js-cookie';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import IndexPage from './Pages/IndexPage/IndexPage';
import HomePage from './Pages/HomePage/HomePage';
import LoanApplicationFormPage from './Pages/LoanApplicationFormPage/LoanApplicationFormPage';
import NoMatch from './Pages/404/NoMatch';
import Navbar from './components/NavBar/Navbar';
import './App.css';
import './theme.css';

// const fakeAuth = {
//   isAuthenticated: false,
//   authenticate(cb) {
//     this.isAuthenticated = true
//     setTimeout(cb, 100)
//   },
//   signout(cb) {
//     this.isAuthenticated = false
//     setTimeout(cb, 100)
//   }
// }

// const PrivateRoute = ({ component: Component, ...rest }) => (
//   <Route {...rest} render={(props) => (
//     fakeAuth.isAuthenticated === true
//       ? <Component {...props} />
//       : <Redirect to={{
//           pathname: '/login',
//           state: { from: props.location }
//         }} />
//   )} />
// )

export const getSession = () => {
  const jwt = Cookies.get('__session')
  let session
  try {
    if (jwt) {
      const base64Url = jwt.split('.')[1]
      const base64 = base64Url.replace('-', '+').replace('_', '/')
      session = JSON.parse(window.atob(base64))
    }
  } catch (error) {
    console.log(error)
  }
  return session
}

export const logOut = () => {
  Cookies.remove('__session')
}

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="app-container">
          {console.log("Session",getSession())}
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