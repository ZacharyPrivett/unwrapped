import pandas as pd
import numpy as np
import os
import json
import csv


def clean_file_upload():

    #Only works if "Spotify Extended Streaming History" folder is in your working directory
    files = os.listdir("Spotify Extended Streaming History")
    files = files[1:]    
    files
    
    columns_to_drop = ['episode_name', 'spotify_episode_uri', 'platform', 'conn_country','username', 'user_agent_decrypted', 'offline', 'offline_timestamp']
    
    df = pd.DataFrame()
    temp = pd.DataFrame()
    for i in range(len(files)):
        temp = pd.read_json(f"Spotify Extended Streaming History/{files[i]}")
        temp.dropna(subset=['master_metadata_track_name'],inplace=True)
        temp = temp.drop(columns_to_drop,axis=1)
        df = pd.concat([df,temp],ignore_index=True)
        
    df.to_json("cleaned_data.json", orient="records")