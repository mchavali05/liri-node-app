require("dotenv").config();
var keys = require("./keys");
//console.log(keys);
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);



var programToRun = process.argv[2];
var programAction = process.argv[3];

if(programToRun == "my-tweets"){
	myTweets();
} else if (programToRun == 'spotify-this-song'){
	spotifyThisSong(programAction);
} else if (programToRun == 'movie-this'){
	movieThis();
} else if(programToRun == 'do-what-it-says'){
	doWhatItSays();
} else {
	console.log("I didn't understand this!");
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

function movieThis(){
	console.log("Run movie program");
}

function doWhatItSays(){
	console.log("Run program");
}





 