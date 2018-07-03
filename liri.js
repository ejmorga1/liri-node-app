require('dotenv').config();


//I keep getting issues with these variables, and did not have have time to figure out how to fix it.
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);


var request = require("request");
var command = process.argv[2];
var input = process.argv[3];

if (command == `my-tweets`) {
    myTweets();
};

if (command == `spotify-this-song`) {
    spotifyThisSong();
};

if (command == `movie-this`) {
    movieThis();
};

if (command == `do-what-it-says`) {
    fs = require('fs')
    var randomCommand = '';
    var randomInput = '';
    fs.readFile('/random.txt', 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        console.log(data);
        var dataArray = data.split(',');
        randomCommand = dataArray[0];
        randomInput = dataArray[1];
    });

    if (randomCommand == 'my-tweets') {
        myTweets();
    };

    if (randomCommand == 'spotify-this-song') {
        spotifyThisSong();
    };

    if (randomCommand == 'movie-this') {
        movieThis(input);
    };
};

function myTweets() {
    var params = {
        screen_name: 'nodejs'
    };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            console.log(tweets);
        }
    });
};

function spotifyThisSong() {
    spotify.search({
            type: 'track',
            query: input
        })
        .then(function (response) {
            //console.log(response);
            console.log(response.artist);
            console.log(response.track);
            console.log(response.external_urls);
            console.log(response.name);
        })
        .catch(function (err) {
            console.log(err);
        });
};

function movieThis(movie) {
    if (input) {
        Mr.Nobody
    } else {
        var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=ef65bbbd";
        request(queryUrl, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                console.log(JSON.parse(body).Title);
                console.log(JSON.parse(body).Year);
                console.log(JSON.parse(body).imdbRating);
                console.log(JSON.parse(body).rottenTomatoes);
                console.log(JSON.parse(body).Country);
                console.log(JSON.parse(body).Language);
                console.log(JSON.parse(body).Plot);
                console.log(JSON.parse(body).Actors);
            }
        });

    };
};