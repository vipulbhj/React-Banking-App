import React, { Component } from 'react';
import NavbarModal from './NavbarModal/NavbarModal';
import { Link, withRouter } from 'react-router-dom';
import './Navbar.css';

import { authenticated, logout } from '../../auth';

import logo from '../../assets/images/logo.png';

class Navbar extends Component {
  state = { modalOpen: false }
  toggleModal = (event, callback) => {
    this.setState((prevState) => {
      return {
        modalOpen: !prevState.modalOpen
      }
    }, () => {
      if(callback) callback();
    })
  }

  render() {
    return (
      <div className="navbar-container">
        <NavbarModal history={this.props.history} 
          modalOpen={this.state.modalOpen} toggleModal={this.toggleModal} />
        <div className="custom-navbar-logo">
          <a href="/assets/images/logo.png">
            <img src={logo} alt="Company Logo" />
          </a>
           
        </div>
        <div className="custom-navbar">
          <nav className="navbar" role="navigation" aria-label="main navigation">
            <a onClick={this.toggleModal} role="button" className="navbar-burger burger"
              aria-label="menu" aria-expanded="false">
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
            <div className="navbar-menu">
              <div className="navbar-start">
                <Link to="/home" className="navbar-item">
                  Home
              	</Link>
                {
                  authenticated() ? 
                    <button onClick={() => {
                      logout();
                      this.props.history.push('/');
                    }} className="navbar-item">Logout</button> :
                    (<>
                      <a href="#signup" className="navbar-item">
                        Signup
                      </a>
                      <a href="#login" className="navbar-item">
                        Login
                      </a>
                    </>)  
                  }
                </div>
            </div>
          </nav>
        </div>
      </div>
    )
  };
}

export default withRouter(Navbar);