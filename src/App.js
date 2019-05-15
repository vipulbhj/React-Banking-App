import React from 'react';
import IndexPage from './Pages/IndexPage/IndexPage';
import HomePage from './Pages/HomePage/HomePage';
import LoanApplicationFormPage from './Pages/LoanApplicationFormPage/LoanApplicationFormPage';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="app-container">
        <LoanApplicationFormPage />
      </div>
    )
  }
}

export default App;