var componentSongEntry = function (song) {
	var html = `<div class="song-view container-fluid">
	<div class="row">
		<div class="col-sm-4">
			<h5 class="hover song-name">`+ song.title + `</h5>
			<br>
			<span> <span class="artist-link hover">` + song.artist + `</span> | <span class="album-link hover">` + song.album + `</span></span>
		</div >
	<div class="col-sm-8 text-right">
		<button class="btn queue-next-button">Queue Next</button>
		<button class="btn queue-end-button">Queue Last</button>
		<button class="btn edit-button">Add to Playlist</button>
		<button class="btn remove-button">REMOVE</button>
	</div>
	</div>
</div > `
	return html;
}

var componentHeader = function (data) {
	var html = `<div class="container-fluid">
	<div class="row">
			<h1 class="header-text">`+ data.name + `
			<button class="btn" onclick="songSelection.playAll()">Play All</button>
			<button class="btn" onclick="songSelection.shuffle()">Shuffle</button>`;
	if (data.isLibrary) {
		html += '<button class="btn" onclick="showAddSong()">Add New Song</button>';
	}
	html += `</h1></div>
</div > `
	return html;
}

var componentPlaylistEntry = function (data) {
	var html = `<div class="song-view container-fluid">
	<div class="row">
		<div class="col-sm-4">
			<h5 class="hover playlist-name">`+ data.name + `</h5><span>` + data.size + `</span>
		</div >
	<div class="col-sm-8 text-right">
		<button class="btn">Something</button>
		<button class="btn">Something Else</button>
		<button class="btn">REMOVE</button>
	</div>
	</div>
</div > `
	return html;
}

RatWorks.registerComponent('song-entry', componentSongEntry);
RatWorks.registerComponent('play-header', componentHeader);
RatWorks.registerComponent('playlist-entry', componentPlaylistEntry);