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