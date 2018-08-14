/* 8. At the top of the `liri.js` file, add code to read and set any environment variables with the dotenv package: */
require("dotenv").config();

/* 9. Add the code required to import the `keys.js` file and store it in a variable. */

/* * You should then be able to access your keys information like so */
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

/* 10. Make it so liri.js can take in one of the following commands:
    * `my-tweets`
    * `spotify-this-song`
    * `movie-this`
    * `do-what-it-says` */
switch (process.argv[2]) {
  case "my-tweets":
    /*  1. `node liri.js my-tweets`
    
    * This will show your last 20 tweets and when they were created at in your terminal/bash window. */
    break;
  case "spotify-this-song":
    /*  2. `node liri.js spotify-this-song '<song name here>'`

    * This will show the following information about the song in your terminal/bash window
        * Artist(s)
        * The song's name
        * A preview link of the song from Spotify
        * The album that the song is from */

    /*    * If no song is provided then your program will default to "The Sign" by Ace of Base. */
    break;
  case "movie-this":
    /*  3. `node liri.js movie-this '<movie name here>'`

        * This will output the following information to your terminal/bash window:
            * Title of the movie.
            * Year the movie came out.
            * IMDB Rating of the movie.
            * Rotten Tomatoes Rating of the movie.
            * Country where the movie was produced.
            * Language of the movie.
            * Plot of the movie.
            * Actors in the movie. */

    /*    * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.' */

    /*  * You'll use the request package to retrieve data from the OMDB API. Like all of the in-class activities, the OMDB API requires an API key. You may use `trilogy`. */
    break;
  case "do-what-it-says":
    /*   4. `node liri.js do-what-it-says`
   
        * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
     
        * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.
     
        * Feel free to change the text in that document to test out the feature for other commands. */
    break;
}

/* ### BONUS

* In addition to logging the data to your terminal/bash window, output the data to a .txt file called `log.txt`.

* Make sure you append each command you run to the `log.txt` file. 

* Do not overwrite your file each time you run a command. */