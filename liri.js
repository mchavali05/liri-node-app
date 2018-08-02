require("dotenv").config();
var keys = require("./keys");
//console.log(keys);
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");
var request = require("request");
var fs = require("fs");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);


var programToRun = process.argv[2];
var programAction = process.argv[3];

if(programToRun == "my-tweets"){
	myTweets();
} else if (programToRun == 'spotify-this-song'){
	spotifyThisSong(programAction);
} else if (programToRun == 'movie-this'){
	movieThis(programAction);
} else if(programToRun == 'do-what-it-says'){
	doWhatItSays();
} else {
	console.log("I didn't understand this, try again!");
}

function myTweets(){
	var params = {screen_name: 'nodejs'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (!error) {
	  	for (var i=0; i<=20; i++){
		    if (tweets[i] != undefined){
		    	console.log(tweets[i].text);
		    	console.log(tweets[i].created_at);
		    	console.log("");
		    }
		    
	  	}
	  } 
	});
}

function spotifyThisSong(query){
	if(!query) {
		var songName = "The Sign ace of base";
	} else {
		var songName = query;
	}
	spotify.search({ type: 'track', query: songName }, function(err, data) {
	  	if (err) {
	    	return console.log('Error occurred: ' + err);
	  	} else {
	  		for (var i=0; i<data.tracks.items[0].artists.length; i++){
	 			if (i == 0){
	 				console.log("Artist(s): " + data.tracks.items[0].artists[i].name);
	 			} else {
	 				console.log(data.tracks.items[0].artists[i].name);
	 			}
 			}
		
			console.log("The song's name: " + data.tracks.items[0].name); 
			console.log("A preview link of the song from Spotify: " + data.tracks.items[0].preview_url);
			console.log("The album that the song is from: " + data.tracks.items[0].album.name); 
			console.log("");
	  	} 				
    });
}

function movieThis(movieQuery){
	if(!movieQuery) {
		movieQuery = "mr nobody";
		var nobodyURL = "http://www.imdb.com/title/tt0485947/";
		console.log("If you haven't watched Mr. Nobody, then you should: " + "<" + nobodyURL + ">");
		console.log("It's on Netflix!");
	} else {
		// Then run a request to the OMDB API with the movie specified
		request("http://www.omdbapi.com/?t=" + movieQuery + "&y=&plot=short&apikey=trilogy", function(error, response, body) {

		   // If the request is successful (i.e. if the response status code is 200)
		   if (!error && response.statusCode === 200) {

			    // Parse the body of the site and recover just the imdbRating
			    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
			    console.log("Title of the movie: " + JSON.parse(body).Title);
			    console.log("Year the movie came out: " + JSON.parse(body).Year);
			    console.log("IMDB Rating of the movie: " + JSON.parse(body).imdbRating);
			    console.log("Country where the movie was produced: " + JSON.parse(body).Country);
			    console.log("Language of the movie: " + JSON.parse(body).Language);
			    console.log("Plot of the movie: " + JSON.parse(body).Plot);
			    console.log("Actors in the movie: " + JSON.parse(body).Actors);
			    
			    for(var i = 0; i < JSON.parse(body).Ratings.length; i++) {
			    	if(JSON.parse(body).Ratings[i].Source === "Rotten Tomatoes") {
			    		console.log("Rotten Tomatoes Rating of the movie: " + JSON.parse(body).Ratings[i].Value);
			    	}
		    	}
		    	console.log("");
		   }
   		});
   	}	
}






function doWhatItSays(){
	fs.readFile("random.txt", "utf-8", function(error, data) {
		if (error) {
	    	return console.log(error);
	  	}

	  	var dataArr = data.split(",");
	  	var liriCommand = dataArr[0];
	  	var randomText = dataArr[1];
	  	//console.log(dataArr);
	  	if(liriCommand === "spotify-this-song") {
			spotifyThisSong(randomText);
		} 

	});
}





 