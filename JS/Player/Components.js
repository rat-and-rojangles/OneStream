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
		<button class="btn edit-button">EDIT</button>
	</div>
	</div>
</div > `
	return html;
}

// var componentHeader = function (data) {
// 	var html = `<div class="container-fluid">
// 	<div class="row">
// 		<div class="col-sm-3">
// 			<h1>`+ data.name + `</h1>
// 			<br>
// 		</div >
// 	<div class="col-sm-9 text-right">
// 		<button class="btn">Play All</button>
// 		<button class="btn">Shuffle</button>
// 	</div>
// 	</div>
// </div > `
// 	return html;
// }

var componentHeader = function (data) {
	var html = `<div class="container-fluid">
	<div class="row">
			<h1 class="header-text">`+ data.name + `
			<button class="btn" onclick="songSelection.playAll()">Play All</button>
			<button class="btn" onclick="songSelection.shuffle()">Shuffle</button></h1>
	</div>
</div > `
	return html;
}

RatWorks.registerComponent('song-entry', componentSongEntry);
RatWorks.registerComponent('play-header', componentHeader);