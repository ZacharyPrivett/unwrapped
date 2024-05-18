/* eslint-disable */
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/login-header';
import Footer from '../components/footer';
import '../assets/login-theme.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  axios.defaults.withCredentials = true

  const axiosPostData = async() => {
    const postData = {
        email: email,
        password: password
    }
    await axios.post('http://localhost:3001/login', postData)
    .then(res => {
        const data = res.data;
        window.location.href = data.AUTH_URL;
    })
    .catch(error => {
      console.error('Error fetching authorization URL:', error);
    });
}

const loginSpotify = async(res, req) => {

  await axios.get('http://localhost:3001/loginSpotify')
  .then(res => {
      const data = res.data;
      window.location.href = data.AUTH_URL;
  })
  .catch(error => {
    console.error('Error fetching authorization URL:', error);
  });
}

const handleLogIn = (e) => {
  e.preventDefault()
  if (!email || !password) {
    setError(<p>Please fill out the form</p>);
  } else {
    setError('');
    axiosPostData();
  }
}

const handleLogInSpotify = (e) => {
  e.preventDefault();
  loginSpotify();
}

  return (
    <div className="login-sections">
      {/* Header Section */}
      <Header />
      {/* Body Section */}
      <div className="login-display">
        <div className="login-box">
          {/* Login container has a title (h1), a division (hr), and a form (div login-form) */}
          <div className="login-container">
            <h1 className="login-title">Have a Spotify Account?</h1>
            <hr className="presentation" />
            <div className="login-form">
              <button type="submit" onClick={handleLogInSpotify} className="login-button">Login With Spotify</button>
            </div>
          </div>
        </div>
      </div>
      {/* Footer Section */}
      <Footer />
    </div>
  );
}

export default Login;