var Player = function () {
	var scPlayer = new SCPlayer();
	var ytPlayer = new YTPlayer();  // not yet defined
	var activePlayer;

	var queue = new PlayQueue();

	var ready = false;

	this.initializeYouTubeWidget = function () {
		// TODO: reject calls to this if it is already initialized
		ytPlayer.initializeWidget();
	}

	this.seekTo = function (ratio) {
		if (ready) {
			activePlayer.seekTo(ratio);
		}
	}

	this.togglePlayback = function () {
		if (ready) {
			activePlayer.togglePlayback();
		}
	}

	//takes a JSON object (from the DB) and uses that to load up a song
	this.loadNewSong = function (songJSON) {
		if (ready) {
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

			controls.setEnabled(false);

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
			scPlayer.disable();
			ytPlayer.disable();

			activePlayer = fromYoutube ? ytPlayer : scPlayer;
			activePlayer.loadNewSong(songClone);
		}
	}

	var playersReady = 0;
	// Initializes the player after both YT, SC, and database ajax are ready
	this.initializeIfReady = function () {
		playersReady++;
		if (playersReady == 3) {
			ready = true;
			callbacks[Player.events.READY].forEach(function (readyCallback) {
				readyCallback();
			});
		}
	}

	this.onSongEnd = function () {
		this.skipForward();
	}

	this.stop = function () {
		if (ready && activePlayer) {
			activePlayer.disable();
			// disable controls
		}
	}

	this.getRatio = function () {
		return activePlayer.getRatio();
	}

	this.queueSongNext = function (songJSON) {
		if (ready) {
			queue.addNext(songJSON);
		}
	}

	this.queueSongEnd = function (songJSON) {
		if (ready) {
			queue.addToEnd(songJSON);
		}
	}

	this.getQueuedSongs = function(){
		if (ready) {
			return queue.getAllSongs();
		}
	}

	this.dumpQueue = function () {
		queue.removeAll();
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
		clearInterval(controls.updateSliderWhilePlaying);
	}
	this.onSuccessfullyLoadedSong = function () {
		controls.setEnabled(true);
		setInterval(controls.updateSliderWhilePlaying, 1);
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