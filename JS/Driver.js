var player;
var controls;
var library;	// should construct when the user logs in.
var songSelection = new SongSelection();
$(document).ready(function () {
	controls = new PlayControls($('#pausePlay'), $('#forward'), $('#backward'), $('#slider'));
	player = new Player();
	player.registerCallback(Player.events.READY, function () {
		showLibrary();
		controls.setEnabled(true)
	});

	library = new Library("1");

	// TODO
	// set the links on the side to do things

	$('#search-sidebar').on('click', function () {
		showSearch();
	});
	$('#library-sidebar').on('click', function () {
		showLibrary();
	});
	$('#playlists-sidebar').on('click', function () {
		showPlaylists();
	});
	$('#queue-sidebar').on('click', function () {
		showQueue();
	});
});