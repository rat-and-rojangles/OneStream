var player;
var controls;
$(document).ready(function () {
	controls = new PlayControls($('#pausePlay'), $('#forward'), $('#backward'), $('#slider'));
	player = new Player();
	player.registerCallback(Player.events.READY, function () { controls.setEnabled(true) });

	$('#loadSongButton').on('click', function () {
		player.queueSongEnd(sampleSongs.randomElement());
	});
});