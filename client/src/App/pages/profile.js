/* eslint-disable */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/profile-header';
import Footer from '../components/footer';
import TopArtists from '../components/topArtists';
import TopSongs from '../components/topSongs';
import RecentlyPlayed from '../components/recentlyPlayed';
import '../assets/profile-theme.css';
import Login from './login';

function Profile() {

  const [files, setFiles] = useState("")
  const [exists, setExists] = useState("")
  const [skipped, setSkipped] = useState("")
  const [most, setMost] = useState("")
  const [least, setLeast] = useState("")
  const [timing, setTiming] = useState("")

  const handleSubmit = e => {
    const fileReader = new FileReader();
    console.log(e.target.files[0])
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = e => {
      console.log("e.target.result", e.target.result);

      const obj = JSON.parse(e.target.result)
      console.log(obj[0].artistName)
      setFiles(obj[0].artistName)
      const time = [];
      const name = [];
      const art = [];
      let total_time = 0;
      let listenCountNew = new Map();
      let listenCountOld = new Map();
      let trackToArtist = new Map(); //yes this will break on identical tracknames, no i don't care
      for (const o of obj) {
        trackToArtist.set(o.trackName, o.artistName)
        total_time = total_time + o.msPlayed;
        if (o.msPlayed < 5000 & o.msPlayed > 2000) {
          name.push(o.trackName);
          time.push(o.msPlayed);
          art.push(o.artistName);
        }

        //was the last playtime of this song > 6 months?
        let d = new Date(Date.parse(o.endTime.substring(0,10)))
        let dm6 = new Date(Date.now())
        dm6.setMonth(dm6.getMonth() - 6)
        //console.log(d < dm6, d, dm6)

        if (d < dm6) {
          //older than 6 months
          if(listenCountOld.has(o.trackName)) {
            listenCountOld.set(o.trackName, listenCountOld.get(o.trackName) + 1);
          }
          else {
            listenCountOld.set(o.trackName, 1);
          }
        }
        else {
          //younger than 6 months
          if(listenCountNew.has(o.trackName)) {
            listenCountNew.set(o.trackName, listenCountNew.get(o.trackName) + 1);
          }
          else {
            listenCountNew.set(o.trackName, 1);
          }
        }

      }

      //randomly pick a skipped song
      let randNum = Math.floor(Math.random() * name.length)
      let randName = name[randNum];
      let randTime = time[randNum];
      let randArt = art[randNum]
      console.log(randNum, randName, randArt, randTime); //random song they skipped
      const skip = randName + " by " + randArt
      setSkipped(skip)


      //pick the most frequent song in the last 6 months
      let newMaxName = "...Nothing? You haven't listened to any music in the last 6 months!" 
      let oldMaxName = "...Nothing! You listened to so much music in the last 6 months, it maxed out the file!"
      let newMaxValue = 0
      let oldMaxValue = 0
      for (let [k, v] of listenCountNew) {
        if(v > newMaxValue) {
          newMaxValue = v;
          newMaxName = k;
        }
      }
      //pick the most frequent song past 6 months old
      for(let [k, v] of listenCountOld) {
        if(v > oldMaxValue && !listenCountNew.has(k)) {
          oldMaxValue = v;
          oldMaxName = k;
        }
      }

      console.log(newMaxValue, newMaxName, trackToArtist.get(newMaxName))
      const most_recent = newMaxName + (trackToArtist.get(newMaxName) ? " by " + trackToArtist.get(newMaxName) : "")
      setMost(most_recent)
      console.log(oldMaxValue, oldMaxName, trackToArtist.get(oldMaxName))
      const least_heard = oldMaxName + (trackToArtist.get(oldMaxName) ? " by " + trackToArtist.get(oldMaxName) : "")
      setLeast(least_heard)

      console.log(total_time)
      const hours = total_time / 3600000
      const t_time = "You spent " + Math.floor(hours) + " hours listening to your songs"
      setTiming(t_time)

      setExists("1") //this remains!
    };
  };

  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  axios.defaults.withCredentials = true

  useEffect(() => {
    let processing = true;
    axiosFetchData(processing);
    return () => {
      processing = false;
    };
  }, []);

  const axiosFetchData = async (processing) => {
    try {
      const accessToken = getCookie('access_token');
      if (accessToken) {
        // Make request to server with access token in headers
        const res = await axios.get('/spotify/me', {
          headers: {
            'Authorization': accessToken
          }
        });
        if (processing) {
          setUserData(res.data);
        }
      } else {
        navigate('/login');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Access token expired, attempt to refresh
        await axiosRefresh(processing);
        // Retry axiosFetchData after token refresh
        await axiosFetchData(processing);
      } else {
        console.error('Error fetching data:', error);
      }
    }
  };

  const axiosRefresh = async (processing) => {
    try {
      const refreshToken = getCookie('refresh_token');
      if (refreshToken) {
        const res = await axios.get('/refresh_token', {
          headers: {
            'Authorization': refreshToken
          }
        });
        if (processing) {
          console.log('Access token refreshed:', res.data);
        }
      }
    } catch (error) {
      console.error('Error refreshing access token:', error);
    }
  };

  const getCookie = (name) => {
    const cookie = document.cookie.split(';').find(cookie => cookie.trim().startsWith(`${name}=`));
    return cookie ? cookie.split('=')[1] : null;
  };

     

  return (
    <div className="profile-sections">
      {/* Header Section */}
      <Header />
      {/* Body Section */}
      <div className="profile-display">
        <div className="profile-boxes">
          <div className="profile-side-box">
            <div className="profile-user-container">
              <div>
              {/* Display profile image */}
              {userData && userData.images && userData.images.length > 0 && (
                <img className='profile-user-image' src={userData.images[1].url} alt="Profile Icon" />
              )}
              </div>
              <h1>Hey, {userData?.display_name}!</h1>
            </div>
            <div className="profile-user-container-2">
              <p>Take a quick glance around! <br></br> This is the data present in your Spotify, directly retrieved from your account.</p>
              <br></br>
              <h3 className="text">Seeing something you do not like?</h3>
              <Link to="https://www.spotify.com/us/account/privacy/"><button type="button">Manage Your Spotify Data</button></Link>
            </div>
          </div>
          <div className="profile-space"></div>
          <div className="profile-main-box">
            <div className="profile-test">
              <div className="profile-container">
                <div className="profile-parse">
                  <h1>Have you received your Spotify's History?</h1>
                  <br />
                  <p>Upload your .json file here to parse your data!</p>
                  <br />
                  <input type="file" onChange={handleSubmit}/>
                  <br />
                  <br />
                  {exists > 0 &&
                    <div className="profile-dependent">
                      <div className="profile-recent">
                        <div className="dependent-icon-1" />
                        <div>
                          <h2> Most Recent Top 1! </h2>
                          <p> You have been recently obsessed with this one!</p>
                          <br />
                          <div className="json-song">
                            {most}
                          </div>
                        </div>
                      </div>
                      <div className="profile-skipped">
                        <div className="dependent-icon-2" />
                        <h2> Skip! Skip! </h2>
                        <p>You skipped this song in less than 5 seconds. Maybe you should give it another chance!</p>
                        <br />
                        <div className="json-song">
                          {skipped}
                        </div>
                      </div>
                      <div className="profile-oldest">
                        <div className="dependent-icon-3" />
                        <h2> Remember this? </h2>
                        <p> You used to love this song! Don't leave behind your favorites.</p>
                        <br />
                        <div className="json-song">
                          {least}
                        </div>
                      </div>
                      <div className="profile-time">
                        <div className="dependent-icon-4" />
                        <h2> Time Matters</h2>
                        <p> The time spent listening to good music is never wasted. </p>
                        <br />
                        <div className="json-song">
                          {timing}
                        </div>
                      </div>
                    </div>
                  }
                </div>
              </div>
              <div className="profile-container">
                <div className="profile-feature">
                  <div className="feature-icon-1" />
                  <TopArtists />
                </div>
              </div>
              <div className="profile-container">
                <div className="profile-feature">
                  <div className="feature-icon-2" />
                  <TopSongs />
                </div>
              </div>
              <div className="profile-container">
                <div className="profile-feature">
                  <RecentlyPlayed />
                </div>
              </div>
              <div className="feature-space">
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer Section */}
      <Footer />
    </div>
  );
}

export default Profile;
