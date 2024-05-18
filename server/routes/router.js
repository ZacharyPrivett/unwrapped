const express = require('express');
const querystring = require('querystring');
const request = require('request');
const model = require('../models/user');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const user = require('../models/user');
const songModel = require('../models/song');
const artistModel = require('../models/artist');
const albumModel = require('../models/album');
const streamModel = require('../models/stream');
require('dotenv/config');

const client_secret =  process.env.CLIENT_SECRET;
const client_id = '261705f7cde943808e222fa294d14cec'
const redirect_uri = 'http://localhost:3001/callback'


const router = express.Router();



// registers new user and adds them to data
router.post('/newUser', async(req, res) => {
    let user = new model(req.body)
    await user.save()
    .then(result => {
        if(result) {
            res.json({Signup: true})
        } else {
            res.json({Signup: false})
        }
    })
    .catch(err => {
        console.log(err)
        res.json("Email already in use")
    })    
    res.end()
})

// login using email password. Will be obsolete soon
router.post('/login', async(req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    await model.findOne({ email: email })
    .then(user => {
        console.log(user)
    if(!user) {
        res.send('invalid email address')
    } else {
        user.comparePassword(password)
        .then(result => {
            if(result) {
              const state = 'kdlhglk345345346hglkj4295409876093487tweoiuy';
              const scope = 'user-read-private user-read-email user-top-read user-read-recently-played user-library-read';
              const AUTH_URL = 'https://accounts.spotify.com/authorize?' +
                querystring.stringify({
                  response_type: 'code',
                  client_id: client_id,
                  scope: scope,
                  redirect_uri: redirect_uri,
                  state: state
                });
                res.json({AUTH_URL: AUTH_URL})
                //res.json({Login: true, Message:"Success}"});
            } else {
                res.json({Login: false, Message: 'Wrong password'});
            }  
        })
        .catch(err => console.log(err)) 
    }
    })
    .catch(err => console.log(err))
})

// logs in user using spotify credetials 
router.get('/loginSpotify', function(req, res) {
  const state = 'kdlhglk345345346hglkj4295409876093487tweoiuy';
  const scope = 'user-read-private user-read-email user-top-read user-read-recently-played user-library-read';
  const AUTH_URL = 'https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    });
    res.json({AUTH_URL: AUTH_URL})
});

router.get('/logout', (req, res) => {
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
    res.send({logout: 'true'});
});

// callback function to get access and refresh token
router.get('/callback', function(req, res) {

    const code = req.query.code || null;
    const state = req.query.state || null;
  
    if (state === null) {
      res.redirect('/#' +
        querystring.stringify({
          error: 'state_mismatch'
        }));
    } else {
      const authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
          code: code,
          redirect_uri: redirect_uri,
          grant_type: 'authorization_code'
        },
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
        },
        json: true
      };
      request.post(authOptions, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            const access_token = body.access_token;
            const refresh_token = body.refresh_token;
            res.cookie('access_token', access_token);
            res.cookie('refresh_token', refresh_token);
            res.redirect('http://localhost:3000/profile');
        } else {
            res.redirect('/#' + querystring.stringify({ error: 'invalid_token' }));
        }
    })}
});

// used to generate new access token when current one expires. access tokens from spotify expire in 
// 1 hour. Refressh is not implemented yet on front end. Not sure how yet
router.get('/refresh_token', function(req, res) {

    const refresh_token = req.headers.authorization;
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
      },
      form: {
        grant_type: 'refresh_token',
        refresh_token: refresh_token
      },
      json: true
    };
  
    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        const access_token = body.access_token;
        res.cookie('access_token', access_token);
        res.redirect('http://localhost:3000/profile');
      }
    });
});

var spotifyUsername = null;
// gets user data from spotify api
router.get('/spotify/me', async (req, res) => {
    const accessToken = req.headers.authorization;

    try {
        const response = await axios.get('https://api.spotify.com/v1/me', {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        });

        if (response.status === 200) {
            userData = response.data;
            spotifyUsername = response.data.id;
            res.send(userData);
            //console.log(userData);
        
        } else {
            throw new Error('Failed to fetch data from Spotify API');
        }
    } catch (error) {
        const status = error.response.status;
        res.sendStatus(status); 
    }
});

// gets users top artist from spotify api. crurretnly set to long_term data and limit of 10. can be configured to
// short_term, medium_term, and Long_term && limit up to 50
router.get('/spotify/artists', async (req, res) => {
    const accessToken = req.headers.authorization.split(' ')[1];

    try {
        const response = await axios.get('https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=10&offset=0', {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        });

        if (response.status === 200) {
            const userData = response.data;
            res.send(userData);
            //console.log(userData);
        } else {
            throw new Error('Failed to fetch data from Spotify API');
        }
    } catch (error) {
        console.error('Error:', error);
        
    }
});


// gets users top tracks from spotify api. crurretnly set to long_term data and limit of 10. can be configured to
// short_term, medium_term, and Long_term && limit up to 50
router.get('/spotify/tracks', async (req, res) => {
    const accessToken = req.headers.authorization.split(' ')[1];

    try {
        const response = await axios.get('https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=10&offset=0', {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        });

        if (response.status === 200) {
            const userData = response.data;
            res.send(userData);
            //console.log(userData);
        } else {
            throw new Error('Failed to fetch data from Spotify API');
        }
    } catch (error) {
        console.error('Error:', error);
    }
    
});


router.get('/spotify/recently-played', async (req, res) => {
    const accessToken = req.headers.authorization.split(' ')[1];
    let username;

    try {
        // Fetching the user's name from Spotify
        const userResponse = await axios.get('https://api.spotify.com/v1/me', {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        });

        const username = userResponse.data.id;

        var docs = await streamModel.aggregate([
            {
                $match: { user_id: username } // Filter documents by user_id
            },
            {
                $group: {
                    _id: '$song_id',
                    time: { $first: '$time' },
                    count: { $sum: 1 }
                }
            },
            {
                $lookup: {
                    from: "songs",
                    localField: "_id", // Change localField to _id
                    foreignField: "_id",
                    as: "streamInfo" 
                }
            }
        ]).exec();

        // Send the 'docs' variable as a JSON response
    } catch (error) {        
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while fetching data' });
    }

    try {
        const response = await axios.get('https://api.spotify.com/v1/me/player/recently-played', {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        });

        if (response.status === 200) {
            const userData = response.data;
            items = userData.items;
            const trackURIs = items.map(item => item.track.uri);

            const song_name = [];
            const URIs = [];
            const counts = [];
            docs.forEach(doc => {
                if (doc.streamInfo && doc.streamInfo.length > 0 && doc.streamInfo[0].song_name) {
                    // Check if streamInfo is defined, not empty, and has song_name property
                    song_name.push(doc.streamInfo[0].song_name);
                    URIs.push(doc.streamInfo[0].uri);
                    counts.push(doc.count);
                }
            });

           const filteredSongNames = [];
           const filteredURIs = [];
            const filteredCounts = [];

            URIs.forEach((uri, index) => {
                if (trackURIs.includes(uri)) {
                    filteredSongNames.push(song_name[index]);
                    filteredURIs.push(uri);
                    filteredCounts.push(counts[index]);
                }
            });

            const responseData = {
                songNames: filteredSongNames,
                URIs: filteredURIs,
                counts: filteredCounts
            }

            for (const item of items) {
                const track = item.track;
            
                // Check if artist exists, if not create a new one
                let artist = await artistModel.findOne({ uri: track.artists[0].uri });
                if (!artist) {
                    artist = new artistModel({
                        uri: track.artists[0].uri,
                        artist_name: track.artists[0].name
                    });
                    await artist.save();
                }
            
                // Check if album exists, if not create a new one
                let album = await albumModel.findOne({ uri: track.album.uri });
                if (!album) {
                    album = new albumModel({
                        artist_id: artist._id,
                        uri: track.album.uri,
                        album_name: track.album.name
                    });
                    await album.save();
                }
            
                // Check if song exists, if not create a new one
                let song = await songModel.findOne({ uri: track.uri });
                if (!song) {
                    song = new songModel({
                        album_id: album._id,
                        artist_id: artist._id,
                        uri: track.uri,
                        song_name: track.name,
                    });
                    await song.save();
                }
            
                // Save stream data
                let stream = await streamModel.findOne({ time: item.played_at });
                if (!stream) {
                    stream = new streamModel({
                        user_id: username,
                        song_id: song._id,
                        time: item.played_at
                    });
                    await stream.save();
                } 
            }
            res.json(responseData);
        } else {
            throw new Error('Failed to fetch data from Spotify API');
        }
    } catch (error) {
        console.error('Error:', error);
    }
    

});
module.exports = router