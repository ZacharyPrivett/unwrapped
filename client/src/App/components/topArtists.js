/* eslint-disable */
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TopArtists() {
    const [artistData, setArtistData] = useState([]);
    
    useEffect(() => {
        let processing = true;
        axiosFecthData(processing);
        return () => {
            processing = false;
        };
    }, []);

    const axiosFecthData = async(processing) => {
        const accessToken = document.cookie.split(';').find(cookie => cookie.trim().startsWith('access_token='));
        if (accessToken) {
            const accessTokenValue = accessToken.split('=')[1];
            // Make request to server with access token in headers
            await axios.get('/spotify/artists', {
                headers: {
                    'Authorization': 'Bearer ' + accessTokenValue
                }
            })
            .then(res => {
                if (processing) {
                    setArtistData(res.data)
                }
                //console.log(artistData)
            })
            .catch(err => console.log(err))
        }
    }

    return (
        <div>
            <h1>Your Top {artistData.items?.length} artists</h1>
            <br />
            {artistData.items?.length
                ? (
                    <ul>
                        {artistData.items.map((artist, i) => <li key={i}>{artist?.name}</li>)}
                    </ul>
                ) : <p>NO artists to display</p>
            }
        </div>
    );
}

export default TopArtists;