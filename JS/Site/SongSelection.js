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

	var rebuildHTML = function () {
		var jqParent = $("#song-list");	// or whatever we call it
		jqParent.html("");
		for (var x = songs.length - 1; x >= 0; x--) {
			let tempSong = songs[x];
			let newSongElement = RatWorks.appendNewComponent('song-entry', tempSong, jqParent);
			newSongElement.find('.artist-link').on('click', function () {
				console.log(tempSong);
				showArtist(tempSong.artist);
			});
			newSongElement.find('.album-link').on('click', function () {
				console.log(tempSong);
				showAlbum(tempSong.album);
			});
			newSongElement.find('.queue-next-button').on('click', function () {
				console.log(tempSong);
				player.queueSongNext(tempSong);
			});
			newSongElement.find('.queue-end-button').on('click', function () {
				console.log(tempSong);
				player.queueSongEnd(tempSong);
			});
			newSongElement.find('.edit-button').on('click', function () {
				NOTIMPLEMENTED();
			});
			newSongElement.find('.remove-button').on('click', function () {
				library.removeFromLibrary(tempSong);
				rebuildHTML();
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

	var songs = songs_.slice();
	if (!skipSort) {
		this.sortByTitle();
	}
	rebuildHTML();
}