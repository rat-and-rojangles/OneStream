var showSearch = function () {
	$("#main-header").html(`<div>
	<div class="song-view">
			<input id="song-searcher" type="text">
	</div>
</div>`);
	songSelection = new SongSelection();
	var searchJQ = $('#song-searcher');
	searchJQ.on('input', function () {
		songSelection = new SongSelection(library.search(searchJQ.val()));
	});
}

var showAddSong = function() {
	$("#main-header").html(
		`<form>
		    Title:
		    <input id = "title_input" type = 'text'>
		    Artist:
		    <input id = "artist_input" type = 'text'>
		    Album:
		    <input id = "album_input" type = 'text'>
		    Genre:
		    <input id = "genre_input" type = 'text'>
		    URL:
		    <input id = "url_input" type = 'text'>

		    User:
		    <input id = "user_input" type = 'text'>

		    <button id = "submit-song"> Add Song </button>
		</form>`
	);


}

var showAlbum = function (albumName) {
	setHeader(albumName);
	songSelection = new SongSelection(library.filterByParameter('album', albumName));
}

var showArtist = function (artistName) {
	setHeader(artistName);
	songSelection = new SongSelection(library.filterByParameter('artist', artistName));
}


var showLibrary = function () {
	setHeader('Library');
	songSelection = new SongSelection(library.getSongs());
}

var showPlaylists = function () {
	setHeader('Playlists');
	songSelection = new SongSelection();
	var jqParent = $("#song-list");
	library.getPlaylists().forEach(function (playlist) {
		let newElement = RatWorks.appendNewComponent('playlist-entry', playlist.toRatData(), jqParent);
		newElement.find('.playlist-name').on('click', function () {
			showSpecificPlaylist(playlist);
		});
	});
}

var showSpecificPlaylist = function (playlist) {
	setHeader(playlist.name);
	songSelection = new SongSelection(playlist.getSongs());
}

var showQueue = function () {
	setHeader('Queue');
	songSelection = new SongSelection(player.getQueuedSongs(), true);
	$('.queue-next-button').remove();
	$('.queue-end-button').remove();
	$('.song-view').find('.song-name').off('click');
	$('.song-view').find('.song-name').removeClass('hover');
}

var showAddSongPrompt = function () {
	NOTIMPLEMENTED();
}

var setHeader = function (name) {
	let jqHeader = $("#main-header");
	jqHeader.html('');
	RatWorks.appendNewComponent('play-header', { name: name }, jqHeader);
}

var updateCurrentSong = function (song) {
	if (song) {
		$("#current-song").html('<h4>' + song.title + '</h4><span id="current-song-artist" class="hover">' + song.artist + '</span><span> | </span><span id="current-song-album" class="hover">' + song.album + '</span>');
		$("#current-song-artist").on('click', function () {
			showArtist(song.artist);
		});
		$("#current-song-album").on('click', function () {
			showArtist(song.album);
		});
	}
	else {
		$("#current-song").html('');
	}
}
