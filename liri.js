require("dotenv").config();
var axios = require("axios");
var Spotify = require("node-spotify-api");
var moment = require("moment");
var keys = require("./keys");
var fs = require("fs");
var spotify = new Spotify(keys.spotify);

var userChoice = process.argv[2];
var userInputValue = process.argv[3];
makeApiCall(userChoice, userInputValue);
function makeApiCall(userChoice, userInputValue) {
  switch (userChoice) {
    case "concert-this":
      bandsFn(userInputValue);
      break;
    case "spotify-this-song":
      spotifyFn(userInputValue);
      break;
    case "movie-this":
      movieFn(userInputValue);
      break;
    case "do-what-it-says":
      fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
          return console.log(error);
        }
        var dataArr = data.split(",");
        var arrVal1 = dataArr[0];
        var arrVal2 = dataArr[1];
        makeApiCall(arrVal1, arrVal2);
      });
      break;
    default:
      console.log("please enter something");
      break;
  }
}

function bandsFn(artistInput) {
  //if there's no input
  if (artistInput === "" || artistInput === undefined) {
    console.log("please input some information");
  } else {
    axios
      .get(
        `https://rest.bandsintown.com/artists/${artistInput}/events?app_id=9ba882b48d699c823feb4d8668bd9739`
      )
      .then(function(response) {
        var venueName = response.data[0].venue.name;
        var venueLocation = response.data[0].venue.city;
        var venueDate = moment(response.data[0].datetime).format("MM/DD/YYYY");
        console.log(
          `Venue: ${venueName}\nCity: ${venueLocation}\nDate: ${venueDate}`
        );
      })
      .catch(function(error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an object that comes back with details pertaining to the error that occurred.
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  }
}

function spotifyFn(userInput) {
  if (userInput === "" || userInput === undefined) {
    spotify.search({ type: "track", query: "The Sign", limit: 10 }, function(
      err,
      data
    ) {
      if (err) {
        return console.log("Error occurred: " + err);
      }
      var artistName = data.tracks.items[8].album.artists[0].name;
      var songName = "The Sign";
      var previewLink = data.tracks.items[8].album.external_urls.spotify;
      var album = data.tracks.items[8].album.name;
      console.log(
        `Artist: ${artistName}\nSong: ${songName}\nPreview: ${previewLink}\nAlbum: ${album}`
      );
    });
  } else {
    spotify.search({ type: "track", query: userInput, limit: 1 }, function(
      err,
      data
    ) {
      if (err) {
        return console.log("Error occurred: " + err);
      }
      var artistName = data.tracks.items[0].album.artists[0].name;
      var songName = userInput;
      var previewLink = data.tracks.items[0].album.external_urls.spotify;
      var album = data.tracks.items[0].album.name;
      console.log(
        `Artist: ${artistName}\nSong: ${songName}\nPreview: ${previewLink}\nAlbum: ${album}`
      );
    });
  }
}

function movieFn(movieInput) {
  // movieInput = movieInput.replace(" ", "+");
  if (movieInput === "" || movieInput === undefined) {
    axios
      .get(`http://www.omdbapi.com/?t=Mr.+Nobody&y=&plot=short&apikey=trilogy`)
      .then(function(response) {
        var movieTitle = response.data.Title;
        var movieYear = response.data.Year;
        var movieimdbRating = response.data.imdbRating;
        var movieRottenRating = response.data.Ratings[1].Value;
        var movieCountry = response.data.Country;
        var movieLanguage = response.data.Language;
        var moviePlot = response.data.Plot;
        var movieActors = response.data.Actors;
        console.log(
          `Title: ${movieTitle}\nYear: ${movieYear}\nIMDB Rating: ${movieimdbRating}\nRotten Tomatoes Rating: ${movieRottenRating}\nCountry: ${movieCountry}\nLanguage: ${movieLanguage}\nPlot: ${moviePlot}\nActors: ${movieActors}`
        );
      })
      .catch(function(error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an object that comes back with details pertaining to the error that occurred.
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  } else {
    axios
      .get(
        `http://www.omdbapi.com/?t=${movieInput}&y=&plot=short&apikey=trilogy`
      )
      .then(function(response) {
        var movieTitle = response.data.Title;
        var movieYear = response.data.Year;
        var movieimdbRating = response.data.imdbRating;
        var movieRottenRating = response.data.Ratings[1].Value;
        var movieCountry = response.data.Country;
        var movieLanguage = response.data.Language;
        var moviePlot = response.data.Plot;
        var movieActors = response.data.Actors;
        console.log(
          `Title: ${movieTitle}\nYear: ${movieYear}\nIMDB Rating: ${movieimdbRating}\nRotten Tomatoes Rating: ${movieRottenRating}\nCountry: ${movieCountry}\nLanguage: ${movieLanguage}\nPlot: ${moviePlot}\nActors: ${movieActors}`
        );
      })
      .catch(function(error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an object that comes back with details pertaining to the error that occurred.
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  }
}
