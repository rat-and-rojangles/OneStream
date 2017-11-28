var loadSong = function (link) {
	var data = {};
	if (link.includes("soundcloud.com")) {
		data.url = link;
		data.fromYoutube = false;
	}
	else {
		data.url = stripLinkForYouTubeID(link);
		data.fromYoutube = true;
	}
	if (!data.url) {
		alert('invalid link');
		return;
	}
	data.meta = {};
	data.startTime = 0;
	data.endTime = 9999999;
	player.loadNewSong(data);
}

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
	songLinkField = $('#songLink');
	$('#loadSongButton').on('click', function () {
		loadSong(songLinkField.val());
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

	//takes a JSON object (probably from the DB) and uses that to load up a song
	this.loadNewSong = function (songJSON) {
		slider.val(0);
		if (!ready && playersReady == 2) {
			this.enableControls();
			ready = true;
		}

		exampleParameter = {
			fromYoutube: false, //true if from YT, false if from SC. will be appended in browser, not stored in DB
			url: "soundcloud_or_youtube_URL",
			startTime: 0,
			endTime: 10000,
			meta: {
				name: "Song Name",
				artist: "Artist Name",
				album: "Album Name"
			}
		}
		// var songNameVue;    //suppose this already exists
		// songNameVue.data = songJSON.meta.name;  // change it to match the name of the new song
		// and so on for all the metadata

		if (songJSON.fromYoutube) {
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
		activePlayer.loadNewSong(songJSON);
	}

	var playersReady = 0;
	// Initializes the player after both YT and SC are ready
	this.initializeIfReady = function () {
		playersReady++;
		if (playersReady == 2) {
			// allow a song to be loaded
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
		pausePlay.prop("disabled", false);
		slider.prop("disabled", false);
		enabled = true;
		setInterval(fireContinuouslyWhilePlaying, 1);
	}

	this.onSongEnd = function () {
		this.disableControls();
	}

	this.stop = function () {
		activePlayer.disable();
		this.disableControls();
	}

	var fireContinuouslyWhilePlaying = function () {
		if (enabled && !slider.held && activePlayer.isPlaying()) {
			slider.val(activePlayer.getRatio());
		}
	}
}