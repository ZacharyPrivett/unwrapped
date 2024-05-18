import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/header';
import '../assets/home-theme.css';

function Home() {
  return (
    <div className="home-sections">
      {/* Header Section */}
      <Header />
      {/* Body Section */}
      <div className="home-display">
        <div className="home-box">
          <div className="home-container">
            <h1 className="home-title">UnWrapped</h1>
            <div className="home-description">
              <p>Spotify? Let&apos;s unpack that.</p>
            </div>
            <div className="home-link">
              <Link to="/login"><button type="button" className="home-button">Get Started</button></Link>
            </div>
          </div>
        </div>
      </div>
      {/* Graphic */}
      <div className="playing">
        <span className="bar n1"> </span>
        <span className="bar n2"> </span>
        <span className="bar n3"> </span>
        <span className="bar n4"> </span>
        <span className="bar n5"> </span>
        <span className="bar n6"> </span>
        <span className="bar n7"> </span>
        <span className="bar n8"> </span>
        <span className="bar n1"> </span>
        <span className="bar n2"> </span>
        <span className="bar n3"> </span>
        <span className="bar n4"> </span>
        <span className="bar n5"> </span>
        <span className="bar n6"> </span>
        <span className="bar n7"> </span>
        <span className="bar n8"> </span>
        <span className="bar n1"> </span>
        <span className="bar n2"> </span>
        <span className="bar n3"> </span>
        <span className="bar n4"> </span>
        <span className="bar n5"> </span>
        <span className="bar n6"> </span>
        <span className="bar n7"> </span>
        <span className="bar n8"> </span>
        <span className="bar n1"> </span>
        <span className="bar n2"> </span>
        <span className="bar n3"> </span>
        <span className="bar n4"> </span>
      </div>
    </div>
  );
}

export default Home;
