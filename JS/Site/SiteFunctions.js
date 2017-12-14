var showSearch = function () {
	NOTIMPLEMENTED();
	// TODO set up the header bar
	// TODO show search bar
	var searchJQ = $('#searchBar');
	searchJQ.on('change', function () {
		songSelection = new SongSelection(library.search(searchJQ.val()));
	});
}

var showLibrary = function () {
	NOTIMPLEMENTED();
	// TODO set up the header bar
	songSelection = new SongSelection(library.getSongs());
}

var showPlaylists = function () {
	NOTIMPLEMENTED();
}

var showQueue = function () {
	// TODO set up the header bar
	songSelection = new SongSelection(player.getQueuedSongs());
}

var showAddSongPrompt = function () {
	NOTIMPLEMENTED();
}