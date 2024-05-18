import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/footer-theme.css';

function Footer() {
  return (
    <div className="footer">
      <div className="footer-box">
        <div className="footer-container">
          <div className="footer-link">
            <Link to="https://www.spotify.com/us/legal/privacy-policy/" className="a-footer"><p>Spotify&apos;s Privacy Policy</p></Link>
          </div>
          <div className="footer-rule" />
          <div className="footer-link">
            <Link to="https://www.spotify.com/us/safetyandprivacy/personal-data-collected" className="a-footer"><p>Your Collected Data</p></Link>
          </div>
          <div className="footer-rule" />
          <div className="footer-link">
            <Link to="https://www.spotify.com/account/privacy/" className="a-footer"><p>Privacy Controls</p></Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
