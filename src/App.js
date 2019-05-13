import React from 'react';
import './App.css';

class Navigation extends React.Component {
  state = {modalOpen: false}
  render() {
  return (
    <div className="navbar-container">
      <div className={this.state.modalOpen ? 'modal is-active' : 'modal'}>
        <div className="modal-background"></div>
          <div className="modal-content">
        </div>
        <button onClick={(e) => this.setState(prevState => {return {modalOpen: !prevState.modalOpen}})} className="modal-close is-large" aria-label="close"></button>
      </div>
      <div className="custom-navbar-logo">
        BULMA
      </div> 
      <div className="custom-navbar">
      <nav className="navbar" role="navigation" aria-label="main navigation">
          <a onClick={(e) => this.setState(prevState => {return {modalOpen: !prevState.modalOpen}})} role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        <div className="navbar-menu">
          <div className="navbar-start">
            <a className="navbar-item">
              Home
            </a>
            <a className="navbar-item">
              Documentation
            </a>
          </div>
        </div>
      </nav>
    </div>
  </div>
        )};
      }
      
const App = () => {
  return (
    <>
      <Navigation />

    </>
  )
}

export default App;
