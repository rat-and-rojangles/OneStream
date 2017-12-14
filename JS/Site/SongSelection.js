// jqParent is a child of the open box in the html
// all of the songs will go in here

var SongSelection = function (songs_, skipSort) {
	this.sortByTitle = function () {
		sortTwoLayer("title", "artist");
	}
	this.sortByArtist = function () {
		sortTwoLayer("artist", "title");
	}
	this.sortByAlbum = function () {
		sortTwoLayer("album", "title");
	}
	this.sortByGenre = function () {
		sortTwoLayer("genre", "title");
	}

	this.playAll = function () {
		alert("plaal");
		if (songs.length > 0) {
			player.dumpQueue();
			var songs2 = songs.slice();
			songs2.reverse();
			for (var x = 0; x < songs2.length; x++) {
				player.queueSongEnd(songs2[x]);
			}
		}
	}

	this.shuffle = function () {
		alert("shuff");
		if (songs.length > 0) {
			player.dumpQueue();
			var songs2 = songs.slice();
			songs2.shuffle();
			for (var x = 0; x < songs2.length; x++) {
				player.queueSongEnd(songs2[x]);
			}
		}
	}

	var rebuildHTML = function () {
		var jqParent = $("#song-list");	// or whatever we call it
		jqParent.html("");
		for (var x = songs.length - 1; x >= 0; x--) {
			let tempSong = songs[x];
			let newSongElement = RatWorks.appendNewComponent('song-entry', tempSong, jqParent);
			newSongElement.find('.artist-link').on('click', function () {
				showArtist(tempSong.artist);
			});
			newSongElement.find('.album-link').on('click', function () {
				showAlbum(tempSong.album);
			});
			newSongElement.find('.queue-next-button').on('click', function () {
				player.queueSongNext(tempSong);
			});
			newSongElement.find('.queue-end-button').on('click', function () {
				player.queueSongEnd(tempSong);
			});
			newSongElement.find('.edit-button').on('click', function () {
				NOTIMPLEMENTED();
			});
			newSongElement.find('.remove-button').on('click', function () {
				library.removeFromLibrary(tempSong);
				rebuildHTML();
			});
			newSongElement.find('.song-name').on('click', function () {
				player.dumpQueue();
				player.queueSongNext(tempSong);
			});
		}
	}

	var sortTwoLayer = function (parameter1, parameter2) {
		songs.sort(function (a, b) {
			if (a[parameter1] > b[parameter1]) {
				return 1;
			}
			else if (a[parameter1] < b[parameter1]) {
				return -1;
			}
			else if (parameter2) {
				if (a[parameter2] > b[parameter2]) {
					return 1;
				}
				else if (a[parameter2] < b[parameter2]) {
					return -1;
				}
				else {
					return 0;
				}
			}
			else {
				return 0;
			}
		});
		rebuildHTML();
	}

	if (songs_) {
		var songs = songs_.slice();
	}
	else {
		var songs = [];
	}
	if (!skipSort) {
		this.sortByTitle();
	}
	rebuildHTML();
}