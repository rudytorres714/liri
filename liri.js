var fs = require("fs");

var twitter = require('twitter');

var spotify = require('spotify');

var request = require('request');

var key = require('./key.js');

var startHere = process.argv[2];


if (startHere === 'my-tweets') {

    myTweets();

}
function myTweets() {
    var client = new twitter({
        consumer_key: key.twitterKeys.consumer_key,
        consumer_secret: key.twitterKeys.consumer_secret,
        access_token_key: key.twitterKeys.access_token_key,
        access_token_secret: key.twitterKeys.access_token_secret

    });
        var param = {screen_name: 'musicrejam', count: 20};
        client.get('statuses/user_timeline', param, function (error, tweets, response) {
            if (error) {
            console.log('error occured: ' + error);
        }
            for( i = 0; i < tweets.length; i++){
                console.log("tweet: " + JSON.stringify(tweets[i].text));
                console.log("created at: " + JSON.stringify(tweets[i].created_at, null, 10));
                console.log("*****************************************************************");
            }
        });
        

}


if (startHere == "spotify-this-song")   {


    spotify.search({type: 'track', query: text}, function (err, data) {
        if(err) {
            console.log('error occured: ' + err);
            return;
        }

        console.log("artist name: " + JSON.stringify(data.tracks.items[0].album.artists[0].name, null, 2));
        console.log("song name: " + JSON.stringify(data.tracks.items[0].name, null, 2));
        console.log("preview link: " + JSON.stringify(data.tracks.items[0].preview_url, null, 2));
        console.log("album name: " + JSON.stringify(data.tracks.items[0].album.name, null, 2));


    })
}


if (startHere == "movie-this")  {

    request('http://www.omdbapi.com/?t=' + text, function (error, response, body) {
        console.log("title: " + JSON.parse(body).Title);
        console.log("year released: " + JSON.parse(body).Year);
        console.log("imdb rating: " + JSON.parse(body).imdbRating);
        console.log("rotten tomatoes rating: " + JSON.parse(body).Ratings[1].Value);
        console.log("country produced: " + JSON.parse(body).Country);
        console.log("movie language: " + JSON.parse(body).Language);
        console.log("plot: " + JSON.parse(body).Plot);
        console.log("actors: " + JSON.parse(body).Actors);

    })
}