/* eslint-disable */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';

function RecentlyPlayed() {
  const [recentData, setRecentData] = useState([]);

  const axiosFecthData = async (processing) => {
    const accessToken = document.cookie
      .split(';')
      .find((cookie) => cookie.trim().startsWith('access_token='));
    if (accessToken) {
      const accessTokenValue = accessToken.split('=')[1];
      await axios
        .get('/spotify/recently-played', {
          headers: {
            Authorization: `Bearer ${accessTokenValue}`,
          },
        })
        .then((res) => {    
          if (processing) {
            setRecentData(res.data);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    let processing = true;
    axiosFecthData(processing);
    return () => {
      processing = false;
    };
  }, []);

  return (
    <div>
        <h1>Your Most Recent Songs</h1>
        <br />
        <br />
        <br />
        <br />
    <div style={{ width: '700px', height: '400px' }}>
        
        <Bar
  data={{
    labels: recentData.songNames, // Assuming song names are used as labels
    datasets: [
      {
        label: null,
        data: recentData.counts,
        backgroundColor: 'white',
      },
    ],
  }}
  options={{
    plugins: {
      legend: {
        display: false
    },
      tooltip: {
        titleFont: {
          size: 20, // Set your desired font size
        },
        callbacks: {
          title: function(tooltipItems) {
            const index = tooltipItems[0].dataIndex;
            const songTitle = recentData.songNames[index];
            const streamCount = recentData.counts[index];
            return `${songTitle} \nStreams: ${streamCount} `;
        },
          label: function(context) {
            // Don't display labels in the tooltip
            return '';
          }
        }
      }
    },
    scales: {
      y: {
        display: false, // Hide the y-axis
      },
      x:{
        display: false,
      }
    }
  }}
/>
    </div>
    </div>
  );
}

export default RecentlyPlayed;
