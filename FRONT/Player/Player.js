var slider;
var songLinkField;
var pausePlay;
$(document).ready(function () {
	player = new Player();
	$('*').off('keypress keydown keyup');
	$(document).on('keypress', function (e) {
		if (e.which == 32) {
			player.togglePlayback();
		}
	});
	slider = $('#slider');
	slider.held = false;
	slider.on('mousedown', function () {
		slider.held = true;
	});
	slider.on('mouseup', function () {
		player.seekTo(parseFloat(slider.val()));
		slider.held = false;
	});
	pausePlay = $('#pausePlay');
	pausePlay.on('click', player.togglePlayback);
	$('#forward').on('click', player.skipForward);
	$('#backward').on('click', player.skipBackward);

	songLinkField = $('#songLink');
	$('#loadSongButton').on('click', function () {
		player.queueSongEnd(sampleSongs.randomElement());
	});
});

var Player = function () {
	var scPlayer = new SCPlayer();
	var ytPlayer = new YTPlayer();  // not yet defined
	var activePlayer;

	var queue = new PlayQueue();

	var enabled = false;
	var ready = false;

	this.initializeYouTubeWidget = function () {
		// TODO: reject calls to this if it is already initialized
		ytPlayer.initializeWidget();
	}

	this.seekTo = function (ratio) {
		if (enabled) {
			activePlayer.seekTo(ratio);
		}
	}

	this.togglePlayback = function () {
		if (enabled) {
			activePlayer.togglePlayback();
		}
	}

	//takes a JSON object (from the DB) and uses that to load up a song
	this.loadNewSong = function (songJSON) {
		slider.val(0);
		if (!ready && playersReady == 2) {
			this.enableControls();
			ready = true;
		}

		var songClone = songJSON.clone();

		if (songJSON.url.includes("soundcloud.com")) {
			songClone.url = songJSON.url;
			var fromYoutube = false;
		}
		else {
			songClone.url = stripLinkForYouTubeID(songJSON.url);
			var fromYoutube = true;
		}
		if (!songJSON.url) {
			this.onErrorLoadingSong();
			return;
		}

		exampleParameter = {
			url: "soundcloud_or_youtube_URL",
			startTime: 0,
			endTime: 10000,
			meta: {
				name: "Song Name",
				artist: "Artist Name",
				album: "Album Name"
			}
		}

		//then update player current

		if (fromYoutube) {
			if (activePlayer == scPlayer) {
				scPlayer.disable();
			}
			activePlayer = ytPlayer;
		}
		else {
			if (activePlayer == ytPlayer) {
				ytPlayer.disable();
			}
			activePlayer = scPlayer;
		}
		this.disableControls();
		activePlayer.loadNewSong(songClone);
	}

	var playersReady = 0;
	// Initializes the player after both YT and SC are ready
	this.initializeIfReady = function () {
		playersReady++;
		if (playersReady == 2) {
			ready = true;
			callbacks[Player.events.READY].forEach(function (readyCallback) {
				readyCallback();
			});
		}
	}

	// Disables everything that has to wait for stuff to load
	// NOTE: everything should start disabled on page load 
	this.disableControls = function () {
		slider.val(0);
		pausePlay.prop("disabled", true);
		slider.prop("disabled", true);
		enabled = false;
		clearInterval(fireContinuouslyWhilePlaying);
	}

	this.enableControls = function () {
		// pausePlay.prop("disabled", false);
		// slider.prop("disabled", false);
		// enabled = true;
	}

	this.onSongEnd = function () {
		if (ready) {
			queue.skipForward();
		}
	}

	this.stop = function () {
		if (ready) {
			activePlayer.disable();
			// disable controls
		}
	}

	var fireContinuouslyWhilePlaying = function () {
		// update the slider
		// if (enabled && !slider.held && activePlayer.isPlaying()) {
		// 	slider.val(activePlayer.getRatio());
		// }
	}

	this.queueSongEnd = function (songJSON) {
		if (ready) {
			queue.addToEnd(songJSON);
		}
	}

	this.skipForward = function () {
		if (ready) {
			queue.skipForward();
		}
	}

	this.skipBackward = function () {
		if (ready) {
			queue.skipBackward();
		}
	}

	this.onErrorLoadingSong = function () {
		alert('error loading song');
		clearInterval(fireContinuouslyWhilePlaying);
	}
	this.onSuccessfullyLoadedSong = function () {
		setInterval(fireContinuouslyWhilePlaying, 1);
	}

	// events
	var callbacks = {};
	callbacks[Player.events.READY] = [];
	this.registerCallback = function (eventType, callback) {
		callbacks[eventType].push(callback);
	}
}
Player.events = {};
Player.events.READY = 'ready';
// Player.events.SONG_END = 'songend';