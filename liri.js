




var categorySearch = process.argv[2];
var specificQuery = process.argv.slice(3).join(" ");


switch (categorySearch) {
    case "concert-this":
        concertApiCall(specificQuery);

        break;

    case "spotify-this-song":
        // console.log(categorySearch);
        // console.log(specificQuery);

        spotifyApiCall(specificQuery);
        break;

    case "movie-this":

        movieApiCall(specificQuery);

        // console.log(categorySearch);
        // console.log(specificQuery);
        break;

    case "do-what-it-says":

        doWhatItSays();

        break;
}

function concertApiCall(specificQuery) {

    // console.log(categorySearch);
    // console.log(specificQuery);


    var axios = require("axios");


    axios
        .get("https://rest.bandsintown.com/artists/" + specificQuery + "/events?app_id=codingbootcamp")
        .then(function (response) {

            console.log("----------------")


            // console.log(response);
            console.log(response.data[0].venue.name);
            console.log(response.data[0].venue.city + " " + response.data[0].venue.region);
            console.log(response.data[0].datetime);

        })
        .catch(function (error) {
            if (error.response) {
                console.log("an error happened");
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {

            } else {

                console.log("Error", error.message);
            }
            console.log(error.config);
        });



}


function spotifyApiCall(specificQuery) {
    var Spotify = require('node-spotify-api');

    var keys = require('./key.js');

    // console.log(keys.spotify);

    var spotify = new Spotify(
        keys.spotify
    );


    spotify.search({ type: 'track', query: `${specificQuery}` }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        console.log("----------------")
        console.log(`Artist Name: ${data.tracks.items[0].artists[0].name}`);
        console.log(`Song Name: ${data.tracks.items[0].name}`);
        console.log(`Album Name: ${data.tracks.items[0].album.name}`);
        console.log(`Song Link: ${data.tracks.items[0].album.external_urls.spotify}`);

    });



}


function movieApiCall(specificQuery) {


    var axios = require("axios");


    axios
        .get("http://www.omdbapi.com/?t=" + specificQuery + "&y=&plot=short&apikey=trilogy")
        .then(function (movieInfo) {
            console.log("----------------")
            console.log(`Movie Title: ${movieInfo.data.Title}`);
            console.log(`Debut Year: ${movieInfo.data.Year}`);
            console.log(`IMDB Rating: ${movieInfo.data.imdbRating}`);
            console.log(movieInfo.data.Ratings[1].Source + "Rating" + " " + movieInfo.data.Ratings[1].Value);
            console.log(`Country: ${movieInfo.data.Country}`);
            console.log(`Movie Plot: ${movieInfo.data.Plot}`);
            console.log(`Actors In Movie: ${movieInfo.data.Actors}`);





        })
        .catch(function (error) {
            if (error.response) {
                console.log("an error happened");
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {

            } else {

                console.log("Error", error.message);
            }
            console.log(error.config);
        });



}


function doWhatItSays() {

    var fs = require("fs");

 
    fs.readFile("random.txt", "utf8", function (error, data) {

      
        if (error) {
            return console.log(error);
        }

        
        //   console.log(data);

       
        var dataArr = data.split(",");

        
        console.log(dataArr[0]);

        categorySearch = dataArr[0];
        specificQuery = dataArr[1];

        console.log(specificQuery);
        switch (categorySearch) {
            case "concert-this":
                concertApiCall(specificQuery);

                break;

            case "spotify-this-song":

                spotifyApiCall(specificQuery);

                break;

            case "movie-this":

                movieApiCall(specificQuery);

                break;

            case "do-what-it-says":

                doWhatItSays();

                break;
        }


    });


}