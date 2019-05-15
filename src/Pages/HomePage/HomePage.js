import React from 'react'

import Navbar from '../../components/NavBar/Navbar';
import LoanApplicationCard from './LoanApplicationCard/LoanApplicationCard';

import './HomePage.css';

const HomePage = () => {
  return (
    <>
      <Navbar />
      <div className="filter-menu">
        <button className="button is-primary is-large is-hovered is-focused is-rounded">
          Apply for Loan
        </button>
        <div className="field vertical-space">
          <div className="control">
            <label className="label" htmlFor="application-type">Choose Application Type</label>
            <div className="select is-dark">
              <select>
                <option defaultValue>Completed Applications</option>
                <option>Pending Applications</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="application-display-area">
        {
          [1,2,3,4,5].map((item, index) => {
            return (
            <LoanApplicationCard title="title" 
              content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab dolorem a quod doloremque repellat. Quibusdam, nesciunt accusamus odit aperiam cumque saepe, voluptatibus placeat magnam, provident accusantium reprehenderit blanditiis perferendis expedita." 
            />)
          })
        }
      </div>
    </>
  )
}

export default HomePage;

