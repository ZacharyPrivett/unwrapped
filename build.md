## Unwrapped's build.md

### This repository contains Team 3's capstone project.

In order to view the website, first clone or download the source code in the repository. It is easily accessible in the latest release.

#### To view this in VS Code:
- Extract and open the extracted folder in VS Code. 
- Open two VS Code terminals. 
- In the first terminal type "cd client" to enter into the client folder.
- Once in the client folder type "npm install" to install the required packages.
- In the second terminal type "cd server" to enter into the server folder.
- Once in the server folder type "npm install" to install the required packages.
- Next, type "npm start" in both terminals (The order shouldn't matter, but I prefer to start the server first) and wait for the node server to boot up the webpage automatically.
- If the webpage does not open, navigate to the address where the site is being hosted on your local machine.
- Ctrl+C to terminate bash job.

#### To view this in a terminal/command line: 
- Extract and open the extracted folder. 
- Open two terminals. 
- In the first terminal type "cd client" to enter into the client folder.
- Once in the client folder type "npm install" to install the required packages.
- In the second terminal type "cd server" to enter into the server folder.
- Once in the client folder type "npm install" to install the required packages.
- Next, type "npm start" in both terminals (The order shouldn't matter, but I prefer to start the server first) and wait for the node server to boot up the webpage automatically.
- If the webpage does not open, navigate to the address where the site is being hosted on your local machine.
- Ctrl+C to terminate bash job.

### To utilize eslint in VSCode (only for testing):
- Npm must be intalled first.
- Eslint v2.4.4 Microsoft extension must be installed.
- Init the node_modules folder with "./node_modules/.bin/eslint --init"
- Make sure to utilize the ".eslintrc.json" file in the repository. 
- Note: LF/CRLF are commonly thrown issues, and will be thrown or not depending on the machine running it. Read comments in the ".eslintrc.json" file or switch CRLF/LF on VSCode itself.
- If nothing works, take a look at [this tutorial.](https://www.digitalocean.com/community/tutorials/linting-and-formatting-with-eslint-in-vs-code)

### IMPORTANT! To interact with this site:
- If you use Spotify, and are currently logged into an account in your computer while trying to test this site, please LOG OUT. The site is meant to work with your browsers cookies, so it's doing what it is supposed to- however, your account will not work.
- You will need a whitelisted Spotify account in order to log in with this site. We are providing you the following account for testing:
- Email: nasnency@gmail.com
- Password: Spotify_Capstone_24
- This account will be deleted by May 6th (or once the project is graded). No real personal information is present in this account, and it should only be used for the purpose of interacting with this site.
- The main feature of this site requires Spotify data (a .json file) in order to work. You can find data files for testing [here.](https://drive.google.com/file/d/1tDP7q0vHUdbqaBNtajuSnD8DovQnfU1o/view?usp=sharing) 
- The above files are meant to be examples of real life data from users, and thus vary. "Most Recent" works with files of users who have been active in the past 6 months, and "Remember This" works with files that have information from six+ months ago. "Skip! Skip!" always works. The files provided cover all examples of this.
- If you utilize this for longer than an hour, your session will expire and the DB will crash. Type "npm start" once again on the server end to restart the DB.

### Video Presentation:
- Find the video presentation for this project [here.](https://drive.google.com/file/d/11jqqDD9ce-pkkqlzkgTYsWYKTAmw_2as/view?usp=sharing)