# SocialMediaProject

This is a practice project made using React Redux, Node.js, MongoDb, the express library and web socket technology.

## Features

    User management, with some role-based access
    Possibility to add friends
    Real-time chat through web socket

## Possible future features

    Online status of friends
    Private chat

## Getting started

    Requirements:
        Node.js (https://nodejs.org/en)
        MongoDb (https://www.mongodb.com/)
        IDE/Code editor (e.g. Visual Studio Code)

    1. Clone the repository to your local repository
    2. Install dependencies (run 'npm install' in the terminal for both the client and server folders)
    3. Create a .env file in the root of the server folder
       define the following environmental variables in the .env file:
       MONGOGB_URI=<your MongoDb connection string>
       TEST_MONGODB_URI=<your MongoDb connection string for test db>
       DEV_MONGODB_URI=<your MongoDb connection string for dev db>
       PORT=<app port>
       SECRET=<string>
    4. Run the server: In the terminal (server folder) run the command 'npm run dev'
    5. Open the dev site: In the terminal (client folder) run the command 'npm start'

    The site should appear in your default browser
