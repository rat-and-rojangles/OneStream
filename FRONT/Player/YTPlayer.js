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

    this.initializeWidget = function () {
        if (!ytWidget) {
            ytWidget = new YT.Player('ytPlayer', {
                height: '390',
                width: '640',
                videoId: 'VideoIDGoesHere',
                events: {
                    'onReady': player.initializeIfReady,
                    'onStateChange': onPlayerStateChange
                },
                playerVars: {
                    color: "white",
                    controls: 0,
                    start: 0
                }
            });
        }
        else {
            console.error("YouTube widget is already initialized.");
        }
    }

    var awaitingLoad = false;
    var onPlayerStateChange = function (event) {
        if (event.data == YT.PlayerState.CUED) {
            awaitingLoad = true;
        }
        else if (awaitingLoad && event.data == YT.PlayerState.PLAYING) {
            awaitingLoad = false;
            startTime = startTime.clampedLower(0);
            alert(ytWidget.getPlaybackRate());
            endTime = endTime.clampedUpper(ytWidget.getDuration());
            player.enableControls();
        }
        else if (event.data == YT.PlayerState.ENDED) {
            player.onYTSongEnd();
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
            ytWidget.playVideo()
        }
    }

    this.seekTo = function (ratio) {
        var alertThis = "wanted: " + (ratio * (endTime - startTime) + startTime) + "\nduration: " + ytWidget.getDuration();
        alertThis += "\nend: " + endTime;
        alertThis += "\nstart: " + startTime;
        alert(alertThis);
        ytWidget.seekTo(ratio * (endTime - startTime) + startTime, true);
    }

    this.loadNewSong = function (songJSON) {
        // TODO: SC uses milliseconds, YT uses seconds. should i standardize this or not?
        // TODO: verify the duration
        startTime = songJSON.meta.startTime;
        endTime = songJSON.meta.endTime;
        var videoParams = {
            'videoId': songJSON.url,
            // 'startSeconds': startTime,
            // 'endSeconds': endTime,
            'suggestedQuality': 'large'     // maybe
        }
        ytWidget.cueVideoById(videoParams);
        ytWidget.playVideo();
    }

    this.disable = function () {
        ytWidget.pauseVideo();
    }

    this.getRatio = function () {
        return ytWidget.getCurrentTime() / ytWidget.getDuration();
    }
}