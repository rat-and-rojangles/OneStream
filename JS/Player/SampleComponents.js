var generateSongEntry = function (song) {
	var html = `<div class="song-view container-fluid">
	<div class="row">
		<div class="col-sm-6">
			<h5>`+ 'title' + `</h5>
			<br>
			<div> <a class="artist-link" href="">`+ song.artist + `</a> | <a class="album-link" href="">` + song.album + `</a></div>
		</div >
	<div class="col-sm-6 text-right">
		<button class="btn queue-next-button">Queue Next</button>
		<button class="btn queue-end-button">Queue Last</button>
		<button class="btn edit-button">EDIT</button>
	</div>
	</div>
</div > `
	return html;
}

RatWorks.registerComponent('song-entry', generateSongEntry);