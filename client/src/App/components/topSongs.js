/* eslint-disable */
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TopSongs() {
    const [songData, setSongData] = useState([]);

    useEffect( () => {
        let processing = true;
        axiosFecthData(processing)
        return () => {
            processing = false;
        }
    }, [])

    const axiosFecthData = async(processing) => {
        const accessToken = document.cookie.split(';').find(cookie => cookie.trim().startsWith('access_token='));
        if (accessToken) {
            const accessTokenValue = accessToken.split('=')[1];
            // Make request to server with access token in headers
            await axios.get('/spotify/tracks', {
                headers: {
                    'Authorization': 'Bearer ' + accessTokenValue
                }
            })
            .then(res => {
                if (processing) {
                    setSongData(res.data)
                }
                //console.log(songData)
            })
            .catch(err => console.log(err))
        }
    }

    return (
        <div>
            <h1>Your Top {songData.items?.length} tracks</h1>
            <br />
            {songData.items?.length
                ? (
                    <ul>
                        {songData.items.map((track, i) => <li key={i}>{track?.name}</li>)}
                    </ul>
                ) : <p>NO tracks to display</p>
            }
        </div>
    );
}

export default TopSongs;