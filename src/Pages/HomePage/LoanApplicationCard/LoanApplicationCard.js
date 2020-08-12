import React from 'react';
import './LoanApplicationCard.css';

const LoanApplicationCard = ({ title, content, handleClick }) => (
  <div data-testid="application-card" className="card application-card" onClick={handleClick}>
    <div className="card-header">
      <div className="card-header-title">
        {title}
      </div>
    </div>
    <div className="card-content">
      {content}
    </div>
  </div>
)
export default LoanApplicationCard;
