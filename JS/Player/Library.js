// constructing a library populates it
var Library = function (userID) {
	var songs = [];

	var populate = function () {
		$.ajax({
			type: "GET",
			url: "DisplaySongs.php",
			data: { user: " " + userID },
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
				};
				//var Song = function (url, title, artist, album, start, end, id, user) {
				for (var i = 0; i < result.length; i++) {
					songs.push(new Song(result.URL, result.Title, result.Artist, result.Album, result.Start_time, result.End_time, result.ID, result.User_ID));
				}
				player.initializeIfReady();
			},
			error: function (result) {
				alert("error retrieving from DB\n" + JSON.stringify(result));
				console.log(result);
			}
		});

		// hard coded values
		// songs.push(new Song('https://soundcloud.com/moeshop/moshi-moshi-superstar', 'Superstar feat. Hentai Dude', 'Moe Shop'));
		// songs.push(new Song('https://soundcloud.com/tsundere-alley/darling?in=tsundere-alley/sets/welcome-to-the-alley-ep', 'Darling', 'Tsundere Alley'));
		// songs.push(new Song('https://soundcloud.com/ashmusiczone/sonic-3-knuckles-desert-palace-ashzone-remix', 'Desert Palace (AshZone Remix)', 'AshZone'));
		// songs.push(new Song('https://www.youtube.com/watch?v=hcqoZZa3wVY&index=7&list=PL-WwL4yWuqkR8_vneC7jJwD1_P1YlujCn', 'Thank You', 'Sir J.'));
		// songs.push(new Song('https://www.youtube.com/watch?v=nd-4DFm8hEA&index=24&list=PL-WwL4yWuqkR8_vneC7jJwD1_P1YlujCn', 'Rust (Beta)', 'El Huervo'));
		// songs.push(new Song('https://www.youtube.com/watch?v=R2zXxQHBpd8', 'Will He', 'Joji'));
		// songs.push(new Song('https://soundcloud.com/chloeburbank/i-dont-wanna-waste-my-time', 'i dont wanna waste my time', 'Joji'));
		// player.initializeIfReady();

	}
	populate();

	this.addToLibrary = function (song) {
		songs.push(song);
		song.addToDB();
	}
	this.removeFromLibrary = function (song) {
		song.removeFromDB();
		songs.splice(songs.indexOf(song), 1);
	}

	this.getSongs = function () {
		return songs.slice();
	}

	// parameter: artist, title, ...
	// value: whatever that is
	// returns an array of songs matching this query
	this.filterByParameter = function (parameter, value) {
		var filteredSongs = [];
		value = value.toLowerCase();
		songs.forEach(function (song) {
			if (song[parameter].toLowerCase() == value) {
				filteredSongs.push(song);
			}
		});
		return filteredSongs;
	}

	// returns all results matching a query
	this.search = function (query) {
		var filteredSongs = [];
		songs.forEach(function (song) {
			if (song.title.includesIgnoreCase(query) || song.artist.includesIgnoreCase(query) || song.album.includesIgnoreCase(query) || song.genre.includesIgnoreCase(query)) {
				filteredSongs.push(song);
			}
		});
		return filteredSongs;
	}
}

var Song = function (url, title, artist, album, start, end, id, user) {
	this.url = url;
	this.title = title;
	this.artist = artist;
	this.album = album;

	this.startTime = 0;
	this.endTime = 9999999;

	this.id = parseFloat(id);
	this.user = parseFloat(user);

	this.addToDB = function () {
		NOTIMPLEMENTED();
	}

	this.removeFromDB = function () {
		NOTIMPLEMENTED();
	}

	this.updateInDB = function () {
		NOTIMPLEMENTED();
	}
}