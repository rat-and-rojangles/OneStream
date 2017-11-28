// example of what a song object looks like
// retrieved from database

exampleParameter = {
	fromYoutube: false, //true if from YT, false if from SC
	url: "soundcloud_or_youtube_URL",
	meta: {
		name: "Song Name",
		artist: "Artist Name",
		album: "Album Name",
		startTime: 0,
		endTime: 10000
	}
}

// does not use boundaries
var FakeSong = function (fromYoutube, url, name, artist, album) {
	//
}