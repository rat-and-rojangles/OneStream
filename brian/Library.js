var Library = function () {
	this.populateFromDB = function () {
		$.ajax({
			//
			success: function () {
				//
			}
		});
	}

	var songs = [];

	// first checks the link to see if it's valid.
	this.addToLibrary = function (link) { NOTIMPLEMENTED() }
	// first checks the link to see if it's valid.
	this.removeFromLibrary = function (link) { NOTIMPLEMENTED() }

	// Gets songs with a certain sorting method
	this.getSongs = function (propertyToSortBy) {
		songs.sort(function (a, b) {
			if (a[propertyToSortBy] > b[propertyToSortBy]) {
				return 1;
			}
			else if (a[propertyToSortBy] < b[propertyToSortBy]) {
				return -1;
			}
			else {
				return 0;
			}
		});
		return songs.slice();
	}

	this.filtereredByTags = function (tags) {
		var filteredSongs = [];
		for (var x = songs.length - 1; x >= 0; x--) {
			for (var t = 0; t < tags.length; t++) {
				if (song.tags.includes(tags[t])) {
					filteredSongs.push(song);
					t = tags.length;
				}
			}
		}
		return filteredSongs;
	}
}

// just and example
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
