var fs = require("fs");

/* 8. At the top of the `liri.js` file, add code to read and set any environment variables with the dotenv package: */
require("dotenv").config();

/* 9. Add the code required to import the `keys.js` file and store it in a variable. */
const keys = require("./keys");

/* 10. Make it so liri.js can take in one of the following commands:
    * `my-tweets`
    * `spotify-this-song`
    * `movie-this`
    * `do-what-it-says` */
run(process.argv[2], process.argv[3]);

function run(command, argument) {
  switch (command) {
    case "my-tweets":
      /*  1. `node liri.js my-tweets` */
      myTweets();
      break;
    case "spotify-this-song":
      /*  2. `node liri.js spotify-this-song '<song name here>'` */
      spotifyThisSong(argument);
      break;
    case "movie-this":
      /*  3. `node liri.js movie-this '<movie name here>'` */
      movieThis(argument);
      break;
    case "do-what-it-says":
      /*   4. `node liri.js do-what-it-says` */
      doWhatItSays();
      break;
  }
}

/*  This will show your last 20 tweets and when they were created at in your terminal/bash window. */
function myTweets() {
  var Twitter = require("twitter");
  var client = new Twitter(keys.twitter);

  var params = {
    screen_name: "@davidpham",
    count: 20
  };
  client.get("statuses/user_timeline", params, function(
    error,
    tweets,
    response
  ) {
    if (!error) {
      for (element in tweets) {
        console.log(tweets[element].text);
      }
    }
  });
}

/*  This will show the following information about the song in your terminal/bash window
        * Artist(s)
        * The song's name
        * A preview link of the song from Spotify
        * The album that the song is from */

/*  If no song is provided then your program will default to "The Sign" by Ace of Base. */
function spotifyThisSong(songName = "The Sign") {
  var Spotify = require("node-spotify-api");
  var spotify = new Spotify(keys.spotify);

  spotify.search({ type: "track", query: songName, limit: 1 }, function(
    err,
    data
  ) {
    if (err) {
      return console.log("Error occurred: " + err);
    }

    console.log("Artist[s]:");
    for (element in data.tracks.items[0].artists)
      console.log(data.tracks.items[0].artists[element].name);

    console.log("Song Name: " + data.tracks.items[0].name);

    console.log("Preview Link: " + data.tracks.items[0].preview_url);

    console.log("Album: " + data.tracks.items[0].album.name);
  });
}

/*  This will output the following information to your terminal/bash window:
        * Title of the movie.
        * Year the movie came out.
        * IMDB Rating of the movie.
        * Rotten Tomatoes Rating of the movie.
        * Country where the movie was produced.
        * Language of the movie.
        * Plot of the movie.
        * Actors in the movie. */

/*  If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.' */

/*  * You'll use the request package to retrieve data from the OMDB API. Like all of the in-class activities, the OMDB API requires an API key. You may use `trilogy`. */
function movieThis(movieName = "Mr. Nobody.") {
  var request = require("request");

  var queryUrl =
    "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

  request(queryUrl, function(error, response, body) {
    // If the request is successful
    if (!error && response.statusCode === 200) {
      // Parse the body of the site and recover just the imdbRating
      // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
      console.log("Title: " + JSON.parse(body).Title);
      console.log("Release Year: " + JSON.parse(body).Year);
      console.log("IMDB Rating: " + JSON.parse(body).imdbRating);

      for (element in JSON.parse(body).Ratings) {
        JSON.parse(body).Ratings[element].Source === "Rotten Tomatoes"
          ? console.log(
              "Rotten Tomatoes Rating: " +
                JSON.parse(body).Ratings[element].Value
            )
          : 0;
      }

      console.log("Country[ies]: " + JSON.parse(body).Country);
      console.log("Language[s]:" + JSON.parse(body).Language);
      console.log("Plot: " + JSON.parse(body).Plot);
      console.log("Actor[s]: " + JSON.parse(body).Actors);
    }
  });
}

/*   * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
    
    * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.
    
    * Feel free to change the text in that document to test out the feature for other commands. */
function doWhatItSays() {
  fs.readFile("random.txt", "utf8", function(error, data) {
    if (error) {
      return console.log(error);
    }

    var dataArr = data.split(",");
    var command = dataArr[0];
    var argument = dataArr[1];
    run(command, argument);
  });
}

/* ### BONUS

* In addition to logging the data to your terminal/bash window, output the data to a .txt file called `log.txt`.

* Make sure you append each command you run to the `log.txt` file. 

* Do not overwrite your file each time you run a command. */
