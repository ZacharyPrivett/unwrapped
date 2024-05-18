import React from 'react';
/* import { Link } from 'react-router-dom'; */
import Header from '../components/about-header';
import Footer from '../components/footer';
import '../assets/about-theme.css';

function About() {
  return (
    <div className="about-sections">
      {/* Header Section */}
      <Header />
      {/* Body Section */}
      <div className="about-display">
        <div className="about-sections">
          <div className="about-box">
            <div className="left-thirty-box">
              <img src="https://www.svgrepo.com/show/360784/spotify.svg" alt="Spotify's logo" />
            </div>
            <div className="about-title">
              <h1>About</h1>
              <p>Unpacking Spotify</p>
            </div>
          </div>
          <div className="about-spotify-box">
            <div className="left-box">
              <h2>What is Spotify?</h2>
              <p className="about-text">
                {`
                Spotify is one of the most widely used streaming services in the world. It provides an enormous library of audio-based media, including songs, podcasts, audiobooks, and more.
              `}
              </p>
              <p className="about-text">
                {`
                Users with Spotify accounts automatically generate a large amount of data as they use the app. Spotify gathers this data and uses it for a number of purposes, one of which is the "Spotify Wrapped" service.
              `}
              </p>
            </div>
            <div className="middle-box">
              <h2>What is Spotify Wrapped?</h2>
              <p className="about-text">
                {`
                Spotify Wrapped is a viral marketing campaign that Spotify releases each year. It is a compliation of a user's listening data, assumulated over the course of the year. 
                `}
              </p>
              <p className="about-text">
                {`
                In spite of a number of criticisms and concerns, it is very popular among its users and is almost universally well-received when it releases each December.
                `}
              </p>
            </div>
            <div className="right-box">
              <h2>Why UNWRAPPED?</h2>
              <p className="about-text">
                {`
                Despite both the popularity of Spotify Wrapped and the concerns about how user data is affected, Spotify does not make this data easily available.
                `}
              </p>
              <p className="about-text">
                {`
                For those who don't have a good grasp of data manipulation, understanding this data can be a daunting challenge. That's what UNWRAPPED is for - with it, the data can be easily visualized, and you can create a Wrapped-like summary of your music whenever you want!
                `}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Footer Section */}
      <Footer />
    </div>
  );
}

export default About;
