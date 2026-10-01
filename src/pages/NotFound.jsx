import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-page">
      <div className="not-found-content">
        <div className="not-found-illustration">
          <h1 className="error-code">404</h1>
        </div>
        <h2>Page Not Found</h2>
        <p>The page you are looking for does not exist.</p>
        <Link to="/" className="go-home-button">
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
