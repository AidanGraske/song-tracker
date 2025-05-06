Song Tracker App

A full-stack music tracking web application built with Node.js, Express, MongoDB, and EJS. Users can log in, track how often they listen to songs, and receive new recommendations after 5 plays.

Features

- Register & log in securely
- View, add, and delete songs
- Track how often youve listened to each song
- Get random recommendations after 5 listens
- Search by title or artist
- Add and remove songs from the system

 Tech Stack

- Node.js / Express
- MongoDB / Mongoose
- EJS Templates
- HTML, CSS, JavaScript

 Setup Instructions

**Clone the repo**
   ```bash
   git clone https://github.com/yourusername/song-tracker
   cd song-tracker
Install dependencies
npm install
Start MongoDB
brew services start mongodb-community@6.0
Start the app
node server.js
Visit http://localhost:3000
 MongoDB Export Files

songs.json
users.json
listens.json
You can re-import these with:

mongoimport --db songtracker --collection songs --file songs.json --jsonArray
