import React from 'react'
import { withRouter } from 'react-router-dom';
import LoanApplicationCard from './LoanApplicationCard/LoanApplicationCard';
import { getLoanByStatus } from '../../auth';

import './HomePage.css';
import { toast } from 'react-toastify';

class HomePage extends React.Component {
  state = {
    loanData: [],
    loanStatus: "1"
  }

  handleStateChange = (status, data) => {
    this.setState({
      loanData: data,
      loanStatus: status
    });
  }

  componentDidMount() {
    localStorage.removeItem('loan-form');
    localStorage.removeItem('loan-form-id');
    getLoanByStatus(this.state.loanStatus, this.handleStateChange);
  }


  render() {
    const props = this.props;
    return (
      <>
        <div className="filter-menu">
          <button onClick={() => props.history.push('/loan')}
            className="button is-primary is-large is-hovered is-focused is-rounded">
            Apply for Loan
        </button>
          <div className="field vertical-space">
            <div className="control">
              <label className="label" htmlFor="application-type">Choose Application Type</label>
              <div className="select is-dark">
                <select data-testid="dropdown" value={this.state.loanStatus}
                onChange={(e) => {
                  getLoanByStatus(e.target.value, this.handleStateChange );
                }}>
                  <option value="1">Completed Applications</option>
                  <option value="0">Pending Applications</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="application-display-area">
          {
            this.state.loanData.length < 1 ? "On Applications as Yet" :
            this.state.loanData.map((item, index) => {
              return (
                <LoanApplicationCard title={this.state.loanStatus === "0" ?
                `Pending Application ${item.id}` : `Completed Application ${item.id}`} key={index}
                content="Lorem ipsum dolor sit at  adipsicing elit. Ab dolorem a quod doloremque repellat. Quibusdam, nesciunt accusamus odit aperiam cumque saepe, voluptatibus placeat magnam, provident accusantium reprehenderit blanditiis perferendis expedita."
                handleClick={() => {
                  if(this.state.loanStatus === "1") {
                    toast.info("Completed Applications can't be modified, please try pending ones");
                  } else {
                    localStorage.setItem('loan-form', item['data']);
                    props.history.push({
                      pathname: '/loan',
                      state: {form_id: item.id}
                    });
                  }
                }}
              />)
            })
          }
        </div>
      </>
    )
  }
}
export default withRouter(HomePage);

