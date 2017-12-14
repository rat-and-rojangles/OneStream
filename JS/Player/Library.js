// constructing a library populates it
var Library = function (userID) {
	var songs = [];
	var playlists = [];

	var populate = function () {
		$.ajax({
			type: "GET",
			url: "DisplaySongs.php",
			data: { user: " " + userID },
			dataType: 'JSON',
			success: function (result) {
				// result is an array of objects in the form:
				//var Song = function (url, title, artist, album, start, end, id, user) {
				let playlistsAssoc = {};
				let songsAssoc = {};
				for (var x = 0; x < result.length; x++) {
					if (result[x].URL) {				// song
						var newSong = new Song(result[x].URL, result[x].Title, result[x].Artist, result[x].Album, result[x].Start_time, result[x].End_time, result[x].ID, result[x].User_ID);
						songs.push(newSong);
						songsAssoc[result[x].ID] = newSong;
					}
					else if (!result[x].Playlist_ID) {	// playlist
						var newPlaylist = new Playlist(result[x].Name);
						playlists.push(newPlaylist);
						playlistsAssoc[result[x].ID] = newPlaylist;
					}
					else {								// junction
						playlistsAssoc[result[x].Playlist_ID].addSong(songsAssoc[result[x].Song_ID]);
					}
				}
				console.log(result);
				player.initializeIfReady();
			},
			error: function (result) {
				alert("error retrieving from DB\n" + JSON.stringify(result));
				console.log(result);
			}
		});

		// hard coded values
		//var Song = function (url, title, artist, album, id, user) {
		// songs.push(new Song('https://soundcloud.com/moeshop/moshi-moshi-superstar', 'Superstar feat. Hentai Dude', 'Moe Shop', 'Moshi Moshi'));
		// songs.push(new Song('https://soundcloud.com/tsundere-alley/darling?in=tsundere-alley/sets/welcome-to-the-alley-ep', 'Darling', 'Tsundere Alley', 'Welcome To '));
		// songs.push(new Song('https://soundcloud.com/ashmusiczone/sonic-3-knuckles-desert-palace-ashzone-remix', 'Desert Palace (AshZone Remix)', 'AshZone', 'bla'));
		// songs.push(new Song('https://www.youtube.com/watch?v=hcqoZZa3wVY&index=7&list=PL-WwL4yWuqkR8_vneC7jJwD1_P1YlujCn', 'Thank You', 'Sir J.', 'fank'));
		// songs.push(new Song('https://www.youtube.com/watch?v=nd-4DFm8hEA&index=24&list=PL-WwL4yWuqkR8_vneC7jJwD1_P1YlujCn', 'Rust (Beta)', 'El Huervo', 'hlm'));
		// songs.push(new Song('https://www.youtube.com/watch?v=R2zXxQHBpd8', 'Will He', 'Joji', 'intoungs'));
		// songs.push(new Song('https://soundcloud.com/chloeburbank/i-dont-wanna-waste-my-time', 'i dont wanna waste my time', 'Joji', 'jojstep'));
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
