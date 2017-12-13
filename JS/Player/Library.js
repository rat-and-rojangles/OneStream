// constructing a library populates this boy
var Library = function () {
	var songs = [];

	var populate = function () {
		if (false) {
			$.ajax({
				type: "GET",
				url: "DisplaySongs.php",
				data: { user: "1" },
				dataType: 'JSON',
				success: function (result) {
					// result is an array of objects in the form:
					{
						Album: string;
						Artist: string;
						End_time: string;
						Genre: string;
						ID: string;
						Start_time: string;
						Title: string;
						URL: string;
						User_ID: string;
					}
					//var Song = function (url, title, artist, album, tags, start, end) {
					for (var i = 0; i < result.length; i++) {
						songs.push(new Song(result.URL, result.Title, result.Artist, result.Album, [], parseFloat(result.Start_time), parseFloat(result.End_time)));
					}
					player.initializeIfReady();
				},
				error: function (result) {
					alert("error retrieving from DB\n" + result);
					console.log(result);
				}
			});
		}
		else {
			songs.push(new Song('https://soundcloud.com/moeshop/moshi-moshi-superstar', 'Superstar feat. Hentai Dude', 'Moe Shop'));
			songs.push(new Song('https://soundcloud.com/tsundere-alley/darling?in=tsundere-alley/sets/welcome-to-the-alley-ep', 'Darling', 'Tsundere Alley'));
			songs.push(new Song('https://soundcloud.com/ashmusiczone/sonic-3-knuckles-desert-palace-ashzone-remix', 'Desert Palace (AshZone Remix)', 'AshZone'));
			songs.push(new Song('https://www.youtube.com/watch?v=hcqoZZa3wVY&index=7&list=PL-WwL4yWuqkR8_vneC7jJwD1_P1YlujCn', 'Thank You', 'Sir J.'));
			songs.push(new Song('https://www.youtube.com/watch?v=nd-4DFm8hEA&index=24&list=PL-WwL4yWuqkR8_vneC7jJwD1_P1YlujCn', 'Rust (Beta)', 'El Huervo'));
			songs.push(new Song('https://www.youtube.com/watch?v=R2zXxQHBpd8', 'Will He', 'Joji'));
			songs.push(new Song('https://soundcloud.com/chloeburbank/i-dont-wanna-waste-my-time', 'i dont wanna waste my time', 'Joji'));
			player.initializeIfReady();
		}
	}
	populate();

	this.addToLibrary = function (link) {
		NOTIMPLEMENTED();
	}
	this.removeFromLibrary = function (link) {
		NOTIMPLEMENTED();
	}

	this.getSongs = function () {
		return songs.slice();
	}

	this.filtereredByTags = function (tags) {
		var filteredSongs = [];
		songs.forEach(function (song) {
			if (arrayIntersectIgnoreCase(song.tags, tags)) {
				filteredSongs.push(song);
			}
		});
		return filteredSongs;
	}

	this.filterByArtist = function (artist) {
		var filteredSongs = [];
		artist = artist.toLowerCase();
		songs.forEach(function (song) {
			if (song.artist.toLowerCase() == artist) {
				filteredSongs.push(song);
			}
		});
		return filteredSongs;
	}
	//
}

var arrayIntersectIgnoreCase = function (arr1, arr2) {
	for (var x = 0; x < arr1.length; x++) {
		for (var y = 0; y < arr2.length; y++) {
			if (arr1[x].toLowerCase == arr2[y].toLowerCase) {
				return true;
			}
		}
	}
	return false;
}

var Song = function (url, title, artist, album, tags, start, end) {
	this.url = url;
	this.title = title;
	this.artist = artist;
	this.album = album;

	if (!tags) {
		this.tags = [];
	}
	else {
		this.tags = tags;
	}

	this.startTime = 0;
	this.endTime = 9999999;
}


/*
// just an example
var Song = function () {
	this.title = "title not set";
	this.artist = "artist not set";
	this.album = "album not set";
	this.genre = "genre not set";
	this.tags = [];

	this.link = "link not set";
	var fromYT = undefined;

	// SC uses milliseconds
	// YT uses seconds
	var startTime = 0;
	var endTime = 0;

	this.getStartTimeSeconds = function () {
		return fromYT ? startTime : startTime * 1000;
	}
	this.setStartTimeSeconds = function (seconds) {
		startTime = fromYT ? seconds : seconds * 1000;
	}
}
*/