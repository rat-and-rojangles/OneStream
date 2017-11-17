// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var onYouTubeIframeAPIReady = function () {
    player.initializeYouTubeWidget();
}


const YTPlayer = function () {
    var ytWidget;
    var currentDuration;
    var startTime;
    var endTime;

    // dumping this into a function for clarity
    const createWidget = function () {
        var ytAPI_Element = $('<script src="https://www.youtube.com/iframe_api"></script>');
    }
    createWidget();

    this.initializeWidget = function () {
        if (!ytWidget) {
            ytWidget = new YT.Player('player', {
                height: '390',
                width: '640',
                videoId: 'VideoIDGoesHere',
                events: {
                    'onReady': function () { player.initializeIfReady(); },
                    'onStateChange': onPlayerStateChange
                },
                playerVars: {
                    color: "white",
                    controls: 0,
                    start: 0
                }
            });
            // TODO: alert the player that i am ready
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
            currentDuration = player.getDuration();
            player.enableControls();
        }
        else if (event.data == YT.PlayerState.ENDED) {
            player.onYTSongEnd();
        }
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
        scWidget.seekTo(ratio * (endTime - startTime) + startTime);
    }

    this.loadNewSong = function (songJSON) {
        // TODO: SC uses milliseconds, YT uses seconds. should i standardize this or not?
        // TODO: verify the duration
        startTime = songJSON.meta.startTime;
        endTime = songJSON.meta.endTime;
        var videoParams = {
            'videoId': songJSON.meta.url,
            'startSeconds': startTime,
            'endSeconds': endTime,
            'suggestedQuality': 'large'     // maybe
        }
        ytWidget.cueVideoById(videoParams);
        ytWidget.playVideo();
    }

    this.disable = function () {
        ytWidget.pauseVideo();
    }
}