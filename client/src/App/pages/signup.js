/* eslint-disable */

import React, {useState} from 'react';
import axios from 'axios'
import { Link, useNavigate} from 'react-router-dom';
import Header from '../components/signup-header';
import Footer from '../components/footer';
import '../assets/login-theme.css';

function Signup() {
    const [firstName, setFirstname] = useState('');
    const [lastName, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
  
    const axiosPostData = async() => {
        const postData = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        }

        await axios.post('http://localhost:3001/newUser', postData)
        .then(res => {
            if(res.data.Signup) {
                navigate('/login');
            } else if(res.data.error) {
                setError(res.data.error);
            } else {
                setError(res.data);
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        //console.log(firstName + ' | ' + lastName + ' | ' + email + ' | ' + password)
        if (!firstName || !lastName || !email || !password) {
            setError(<p>Please fill out form.</p>);
        } else {
            setError('');
            axiosPostData();
        } 
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
                <h1 className="login-title">Register</h1>
                <hr className="presentation" />
                <form className="login-form">
                {/* TO DO: This form format will probably change once MongoDB is implemented */}
                <p className="login-label">First Name:</p>
                <br />
                <input type="text" id="firstName" name="firstName" className="login-input" value={firstName} onChange={ (e) => setFirstname(e.target.value)} />
                <br />
                <p className="login-label">Last Name:</p>
                <br />
                <input type="text" id="lastName" name="lastName" className="login-input" value={lastName} onChange={ (e) => setLastname(e.target.value)} />
                <br />
                <p className="login-label">Email:</p>
                <br />
                <input type="text" id="email" name="email" className="login-input" value={email} onChange={ (e) => setEmail(e.target.value)} />
                <br />
                <p className="login-label">Password:</p>
                <br />
                <input type="text" id="pass" name="pass" className="login-input" value={password} onChange={ (e) => setPassword(e.target.value)} />
                <br />
                <div className="error">{error}</div>
                <div className="login-link">
                    <Link to="/profile"><button type="submit" onClick={handleSubmit} className="signup-button">Signup</button></Link>
                </div>
                </form>
            </div>
            </div>
        </div>
        {/* Footer Section */}
        <Footer />
        </div>
    );
}

export default Signup