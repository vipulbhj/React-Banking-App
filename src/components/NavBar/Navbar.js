import React, { Component } from 'react';
import NavbarModal from './NavbarModal/NavbarModal';
import './Navbar.css';

class Navbar extends Component {
  state = { modalOpen: false }
  toggleModal = () => {
    this.setState((prevState) => {
      return {
        modalOpen: !prevState.modalOpen
      }
    });
  }
  render() {
    return (
      <div className="navbar-container">
        <NavbarModal modalOpen={this.state.modalOpen} toggleModal={this.toggleModal} />
        <div className="custom-navbar-logo">
          {this.props.logo}
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
                <a className="navbar-item">
                  Home
              	</a>
                <a className="navbar-item">
                  Documentation
              	</a>
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
    )
  };
}

export default Navbar;