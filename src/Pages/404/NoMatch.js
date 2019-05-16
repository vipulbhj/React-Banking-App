import React from 'react';
import {Link} from 'react-router-dom';
import './NoMatch.css';

const NoMatch = () => {
  return (
    <div id="notfound">
      <div className="notfound">
        <div className="notfound-404">
          <h1>:(</h1>
        </div>
        <h2>404 - Page Not Found</h2>
        <p>
          The page you are looking for might have been removed, had its name changed or is 
          temperorily unavailable. 
        </p>
        <Link to="/">Home Page</Link>
      </div>
    </div>
  )
}

export default NoMatch;
