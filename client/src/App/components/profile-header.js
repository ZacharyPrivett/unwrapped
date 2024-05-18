/* eslint-disable */
import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../assets/header-theme.css';

function ProfileHeader() {

const logout = async(res, req) => {

  await axios.get('http://localhost:3001/logout')
  .then(res => {
    if (res.data.logout === 'true') {
      window.location.href = '/';
    } else {
      console.log('failed to logout');
    }
    
  })
  .catch(error => {
    console.error('Error logging out:', error);
  });
}

const handleLogout = (e) => {
  e.preventDefault();
  logout();
}


  return (
    <div className="header">
      <div className="header-title">
        <Link to="/" className="a-header-title"><p>UNWRAPPED</p></Link>
      </div>
      <div className="header-box">
        <div className="header-container">
          <div className="header-rule" />
          <div className="header-link">
            <Link onClick={handleLogout} className="a-header">Logout</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
