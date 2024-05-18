import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/header-theme.css';

function AboutHeader() {
  return (
    <div className="header">
      <div className="header-title">
        <Link to="/" className="a-header-title"><p>UNWRAPPED</p></Link>
      </div>
      <div className="header-box">
        <div className="header-container">
          <div className="header-link">
            <Link to="/login" className="a-header"><p>Log in</p></Link>
          </div>
          <div className="header-rule" />
        </div>
      </div>
    </div>
  );
}

export default AboutHeader;
