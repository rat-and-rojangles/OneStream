var player;
var controls;
var library;	// should construct when the user logs in.
var currentSelectedSongs = [];
$(document).ready(function () {
	controls = new PlayControls($('#pausePlay'), $('#forward'), $('#backward'), $('#slider'));
	player = new Player();
	player.registerCallback(Player.events.READY, function () { controls.setEnabled(true) });

	library = new Library(1);

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