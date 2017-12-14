var Playlist = function (name, id) {
	this.name = name;
	this.id = id;

	var songs = [];
	this.getSongs = function () {
		return songs;
	}
	this.addSong = function (song) {
		songs.push(song);
	}

	this.toRatData = function () {
		let o = {};
		if (songs.length == 1) {
			o.size = "1 song";
		}
		else {
			o.size = songs.length + " songs";
		}
		o.name = this.name;
		return o;
	}
}