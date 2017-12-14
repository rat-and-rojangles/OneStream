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
}