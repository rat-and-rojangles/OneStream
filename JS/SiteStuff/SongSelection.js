// jqParent is a child of the open box in the html
// all of the songs will go in here

var SongSelection = function (jqParent) {
	var songs = [];

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

	this.rebuildHTML = function () {
		jqParent.html("");
		for (var x = 0; x < songs.length; x++) {
			// make a ratworks component for the song
			// append it to jqParent
		}
	}
}