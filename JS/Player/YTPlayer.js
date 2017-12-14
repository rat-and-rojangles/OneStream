// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var onYouTubeIframeAPIReady = function () {
	player.initializeYouTubeWidget();
}


var YTPlayer = function () {
	var ytWidget;
	var startTime;
	var endTime;

	// dumping this into a function for clarity
	var createWidget = function () {
		var ytAPI_Element = $('<script src="https://www.youtube.com/iframe_api"></script>');
		$('body').append(ytAPI_Element);
	}
	createWidget();

	var onError = function (e) {
		player.onErrorLoadingSong();
	}

	this.initializeWidget = function () {
		if (!ytWidget) {
			ytWidget = new YT.Player('ytPlayer', {
				height: '390',
				width: '640',
				videoId: 'VideoIDGoesHere',
				events: {
					'onReady': player.initializeIfReady,
					'onStateChange': onPlayerStateChange,
					'onError': onError
				},
				playerVars: {
					color: "white",
					controls: 0,
					start: 0,
					disablekb: 1,
					autoplay: 1
				}
			});
		}
		else {
			console.error("YouTube widget is already initialized.");
		}
	}

	var awaitingInitialPlay = true;
	var onPlayerStateChange = function (event) {
		if (awaitingInitialPlay && ytWidget.getDuration() > 0) {
			awaitingInitialPlay = false;
			startTime = startTime.clampedLower(0);
			endTime = endTime.clampedUpper(ytWidget.getDuration());
			ytWidget.seekTo(startTime);
			ytWidget.playVideo();
			player.onSuccessfullyLoadedSong();
		}
		if (event.data == YT.PlayerState.ENDED) {
			player.onSongEnd();
		}
	}

	this.isPlaying = function () {
		return ytWidget.getPlayerState() == YT.PlayerState.PLAYING;
	}

	this.togglePlayback = function () {
		if (ytWidget.getPlayerState() == YT.PlayerState.PLAYING) {
			ytWidget.pauseVideo();
		}
		else {
			ytWidget.playVideo();
		}
	}

	this.seekTo = function (ratio) {
		ytWidget.seekTo(Math.lerp(startTime, endTime, ratio), true);
	}

	this.loadNewSong = function (songJSON) {
		startTime = songJSON.startTime;
		endTime = songJSON.endTime;
		ytWidget.loadVideoById({
			'videoId': songJSON.url,
			'startSeconds': startTime,
			'endSeconds': endTime,
			'suggestedQuality': 'large'
		});
	}

	this.disable = function () {
		awaitingInitialPlay = true;
		ytWidget.stopVideo();
	}

	this.getRatio = function () {
		return (ytWidget.getCurrentTime() - startTime) / (endTime - startTime);
	}
}