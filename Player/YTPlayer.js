// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
function onYouTubeIframeAPIReady() {
    player.initializeYouTubeWidget();
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    // NOTE: I don't know if this is just the initial creation of the iframe,
    //       or if this fires every time a new video finished loading
    event.target.playVideo();
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
                    'onReady': onPlayerReady,
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
        ytWidget.loadVideoById(videoParams);
    }

    this.disable = function () {
        ytWidget.pauseVideo();
    }
}