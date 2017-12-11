var player;
var controls;
var library;	// ideally this should be set up when the user logs in.
var currentSongs = [];
$(document).ready(function () {
	controls = new PlayControls($('#pausePlay'), $('#forward'), $('#backward'), $('#slider'));
	player = new Player();
	player.registerCallback(Player.events.READY, function () { controls.setEnabled(true) });

	library = new Library();

	$('#submitBox').on('click', function () {
		alert(library.filterByArtist($('#inputBox').val()).length);
		player.dumpQueue();
		library.filterByArtist($('#inputBox').val()).forEach(function (song) {
			player.queueSongEnd(song);
		});
	});

	$('#loadSongButton').on('click', function () {
		// player.queueSongEnd(sampleSongs.randomElement());
		player.queueSongEnd(library.getSongs().randomElement());
	});
});