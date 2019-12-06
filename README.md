# Notes
To enable streaming my written music, enable COMPOSED_MUSIC_HOME in the .env file.
Look at api.js off the root to see how that's used

# To Do List

+ Move songs up/down in list

+ Persist playlist between visits
+ Tagging Artists
+ Album list (like artist list but w/ different orientation)
+ Make the layout reactive (long term thing)
+ Clean up the linting errors and look at console to ensure no errors are being thrown
+ "Go to album / artist" functionality from player
+ Advanced filtering with tags or attributes
+ Work on the back arrow on play controls -> less than 1 sec shld go to previous song

# API Integration

I took the choice to incorporate my musicAPI into this project to incorporate streaming in my house.  Here are the steps to do that:

1) Get a copy of the MusicAPI from github (https://github.com/rherrick30/rjhMusicAPI/)
2) Copy the following files to the TOOLS folder of this project
    a) api.js
    b) server.js -> rename to musicApiEndpoints.js
    c) data subfolder and all its contents.  Note the data here you cannot get from GITHUB (can generate with Java)
3) Remove the listen statements in musicApiEndpoints.js
4) Install Cors, dotenv, and body-parser using npm.
5) Add a default export to musicApiEndpoints.js
    export default app;
6) Import that in srcServer.js
7) Add a route:
    app.use('api', musicApi );
8) In api.js, rework the JSON imports (artists, albums, songs and listening list) to be reads from file.
9) There were several linting errors that needed to be cleared up.  Dangling commas, rouge declarations and the like.
10) in src/api/apiHelper.js, change the route address.
11) Also in Player.js change the address (though we really should have a global)
12) Create a file in the root called '.env' with the root music folder (where you find the mp3 files...)




