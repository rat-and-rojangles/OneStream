var player;
var controls;
var library;	// should construct when the user logs in.
var songSelection = new SongSelection([]);
$(document).ready(function () {
	controls = new PlayControls($('#pausePlay'), $('#forward'), $('#backward'), $('#slider'));
	player = new Player();
	player.registerCallback(Player.events.READY, function () { controls.setEnabled(true) });

	library = new Library(1);

	// TODO
	// set the links on the side to do things

	$('#searchLink').on('click', function () {
		showSearch();
	});
	$('#libraryLink').on('click', function () {
		showLibrary();
	});
	$('#playlistsLink').on('click', function () {
		showPlaylists();
	});
	$('#queue-choice').on('click', function () {
		showQueue();
	});

	$('#submitBox').on('click', function () {
		alert(library.filterByArtist($('#inputBox').val()).length);
		player.dumpQueue();
		library.filterByArtist($('#inputBox').val()).forEach(function (song) {
			player.queueSongEnd(song);
		});
	});

	$('#loadSongButton').on('click', function () {
		player.queueSongEnd(library.getSongs().randomElement());
	});
});