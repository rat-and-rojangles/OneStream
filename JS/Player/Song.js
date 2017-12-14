var Song = function (url, title, artist, album, id, user) {
	this.url = url;
	this.title = title;
	this.artist = artist;
	this.album = album;

	this.genre = "";

	this.startTime = 0;
	this.endTime = 9999999;

	this.id = parseFloat(id);
	this.user = parseFloat(user);

	this.addToDB = function () {
		NOTIMPLEMENTED();
	}

	this.removeFromDB = function () {
		var song_id = id;
		var url = "PHP/DeleteSong.php";

		var data = { song_id: song_id };

		// setup the ajax request
		$.ajax({
			type: "POST",
			url: url,
			data: data,
			dataType: 'JSON',
			success: function (result) {
				console.log(result);
				buildLibrary(user_id_global);
			},
			error: function (result) {
				console.log(result);
			}
		});


	}

	this.updateInDB = function () {
		NOTIMPLEMENTED();
	}
}