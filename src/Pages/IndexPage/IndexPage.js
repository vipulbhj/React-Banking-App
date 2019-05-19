import React, { Component } from 'react';

import LoginForm from '../../components/LoginForm/LoginForm';
import RegisterationForm from '../../components/RegisterationForm/RegisterationForm';

import loginAside from '../../assets/images/login-aside.svg';
import './IndexPage.css';

class IndexPage extends Component {

  state = {
    signUpSectionInView: false,
    loginSectionInView: false
  }

  componentDidMount() {
    
    localStorage.removeItem('token');
    localStorage.removeItem('loan-form');
    localStorage.removeItem('user_id');


    let elements;
    let windowHeight;
    const init = () => {
      elements = [
        {
          ref: this.signUpSection,
          currentState: this.state.signUpSectionInView,
          stateChange: {
            signUpSectionInView: true
          }
        },
        {
          ref: this.loginSection,
          currentState: this.state.loginSectionInView,
          stateChange: {
            loginSectionInView: true
          }
        }
      ];
      windowHeight = window.innerHeight;
      fadeInAnimationHandler();
      checkPosition();
    }
    const fadeInAnimationHandler = () => {
      window.addEventListener('scroll', checkPosition);
      window.addEventListener('resize', init);
    }
    const checkPosition = () => {
      for (let i = 0; i < elements.length; i++) {
        let positionFromTop = elements[i].ref.getBoundingClientRect().top;
        if (positionFromTop - windowHeight <= 0 && !elements[i].currentState) {
          elements[i].currentState = this.state.signUpSectionInView;
          this.setState(elements[i].stateChange);
        }
      }
    }
    init();
  }

  render() {
    return (
      <>
        <div className="strech-full-width-banner"></div>
        <section id="signup" className={
          `section-container ${this.state.signUpSectionInView ? 'fadeIn fadeIn-first' : 'hidden'}`
        }
          ref={(input) => this.signUpSection = input}>
          <div className="section-form">
            <RegisterationForm inView={this.state.signUpSectionInView} />
          </div>
          <div className="section-content has-text-white">
            <p className="is-size-3 has-text-centered">
              Apply For Loan In 4 Easy Steps
        </p>
            <ol className="signup-content">
              <li>Register / Login</li>
              <li>Go to Dashboard and Click on Apply for Loan button</li>
              <li>Fill your details and Income Information</li>
              <li>And you are done in 3 easy steps</li>
            </ol>
          </div>
        </section>
        <section id="login" className={
          `section-container ${this.state.loginSectionInView ? 'fadeIn fadeIn-first' : 'hidden'}`
        }
          ref={(input) => this.loginSection = input}>
          <div className="section-content section-content-login-form">
            <div className="login-aside">
              <img src={loginAside}
                className="svg-update"
                alt="login aside main graphics" />
              <p>Banking designed for Humans</p>
            </div>
          </div>
          <div className="section-form">
            <LoginForm inView={this.state.loginSectionInView} />
          </div>
        </section>
        <footer className="footer has-background-black-bis">
          <div className="content has-text-centered">
            <p className="has-text-white">
              <strong className="has-text-white">Site</strong> by
          <a href="https://github.com/vipulbhj"> Vipul Bhardwaj</a>.
                              The source code is available at
          <a href="https://github.com/vipulbhj"> GitHub</a>
            </p>
          </div>
        </footer>
      </>
    )
  }
}


export default IndexPage;