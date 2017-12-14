var PlayQueue = function () {
	var songs = [];
	var currentIndex = -1;
	this.getSong = function (index) {
		return songs[index];
	}
	this.getLength = function () {
		return songs.length;
	}

	this.getAllSongs = function () {
		var a = songs.slice();
		a.reverse();
		return a;
	}

	this.addToEnd = function (newSong) {
		songs.push(newSong);
		if (currentIndex == -1) {
			currentIndex = 0;
			player.loadNewSong(songs[currentIndex]);
		}
	}
	this.addNext = function (newSong) {
		songs.splice(currentIndex + 1, 0, newSong);
		if (currentIndex == -1) {
			currentIndex = 0;
			player.loadNewSong(songs[currentIndex]);
		}
	}

	this.removeAll = function () {
		player.stop();
		songs = [];
		currentIndex = -1;
	}

	this.remove = function (index) {
		if (songs.validIndex(index)) {
			songs.splice(index, 1);
			if (index < currentIndex) {
				currentIndex--;
				player.loadNewSong(songs[currentIndex]);
			}
			else if (index == currentIndex) {
				player.loadNewSong(songs[currentIndex]);
			}
		}
		else {
			console.error("INVALID INDEX attempting remove from queue");
		}
	}
	this.skipBackward = function () {
		if (currentIndex > 0) {
			currentIndex--;
			player.loadNewSong(songs[currentIndex]);
		}
	}
	this.skipForward = function () {
		if (currentIndex < songs.length - 1) {
			currentIndex++;
			player.loadNewSong(songs[currentIndex]);
		}
		else {
			currentIndex = 0;
			player.stop();
		}
	}
}