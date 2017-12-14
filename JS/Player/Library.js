// constructing a library populates it
var Library = function () {
	var songs = [];
	var playlists = [];

	var populate = function (userID) {
		$.ajax({
			type: "GET",
			url: "DisplaySongs.php",
			data: { user: "" + userID },
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
				console.log("error retrieving from DB\n" + JSON.stringify(result));
				console.log(result);
				populateHardCoded();
			}
		});

	}
	var populateHardCoded = function () {
		// hard coded values
		// var Song = function (url, title, artist, album, id, user) {

		let plAnime = new Playlist('Weeaboo Shit');
		let plSad = new Playlist('Sadboys');
		let lastSong = null;
		playlists.push(plAnime);
		playlists.push(plSad);
		playlists.push(new Playlist('Totally Empty Playlist'));

		lastSong = new Song('https://soundcloud.com/moeshop/moshi-moshi-superstar', 'Superstar feat. Hentai Dude', 'Moe Shop', 'Moshi Moshi');
		plAnime.addSong(lastSong);
		songs.push(lastSong);

		songs.push(new Song('https://soundcloud.com/ashmusiczone/sonic-3-knuckles-desert-palace-ashzone-remix', 'Desert Palace (AshZone Remix)', 'AshZone', 'Sonic 3 & Knuckles'));
		songs.push(new Song('https://www.youtube.com/watch?v=hcqoZZa3wVY&index=7&list=PL-WwL4yWuqkR8_vneC7jJwD1_P1YlujCn', 'Thank You', 'Sir J.', 'Thank You'));

		lastSong = new Song('https://www.youtube.com/watch?v=nd-4DFm8hEA&index=24&list=PL-WwL4yWuqkR8_vneC7jJwD1_P1YlujCn', 'Rust (Beta)', 'El Huervo', 'Hotline Miami 2: Wrong Number')
		plSad.addSong(lastSong);
		songs.push(lastSong);
		lastSong = new Song('https://www.youtube.com/watch?v=R2zXxQHBpd8', 'Will He', 'Joji', 'In Tongues');
		plSad.addSong(lastSong);
		songs.push(lastSong);
		lastSong = new Song('https://soundcloud.com/chloeburbank/i-dont-wanna-waste-my-time', 'i dont wanna waste my time', 'Joji', 'Joji');
		plSad.addSong(lastSong);
		songs.push(lastSong);

		lastSong = new Song('https://soundcloud.com/tsundere-alley/stay-the-night?in=tsundere-alley/sets/welcome-to-the-alley-ep', 'Stay the Night', 'Tsundere Alley', 'Welcome To The Alley');
		plAnime.addSong(lastSong);
		songs.push(lastSong);
		lastSong = new Song('https://soundcloud.com/tsundere-alley/like-my-love?in=tsundere-alley/sets/welcome-to-the-alley-ep', 'Like My Love', 'Tsundere Alley', 'Welcome To The Alley');
		plAnime.addSong(lastSong);
		songs.push(lastSong);
		lastSong = new Song('https://soundcloud.com/tsundere-alley/darling?in=tsundere-alley/sets/welcome-to-the-alley-ep', 'Darling', 'Tsundere Alley', 'Welcome To The Alley');
		plAnime.addSong(lastSong);
		songs.push(lastSong);
		lastSong = new Song('https://soundcloud.com/tsundere-alley/super-lady', 'Super Lady', 'Tsundere Alley', 'Super Lady');
		plAnime.addSong(lastSong);
		songs.push(lastSong);
		lastSong = new Song('https://soundcloud.com/android52/float-islands', 'Float Islands', 'android52', 'Anime WAV Grooves Vol. 2');
		plAnime.addSong(lastSong);
		songs.push(lastSong);

		player.initializeIfReady();
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
	this.getPlaylists = function () {
		return playlists.slice();
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
		if (query.length > 0) {
			songs.forEach(function (song) {
				if (song.title.includesIgnoreCase(query) || song.artist.includesIgnoreCase(query) || song.album.includesIgnoreCase(query) || song.genre.includesIgnoreCase(query)) {
					filteredSongs.push(song);
				}
			});
		}
		return filteredSongs;
	}

	this.rebuild = function (userID) {
		populate(userID);
	}
}
