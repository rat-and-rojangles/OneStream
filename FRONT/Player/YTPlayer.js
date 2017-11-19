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

    var onReady = function () {
        player.enableControls();
        startTime = startTime.clampedLower(0);
        endTime = endTime.clampedUpper(ytWidget.getDuration());
    }

    var onError = function (e) {
        alert('invalid link');
    }

    // var regeneratePlayer = function (id, start, end) {
    //     startTime = start;
    //     endTime = end;
    //     $('#ytPlayer').remove();
    //     $('body').append($('<div id="ytPlayer" class="widget"></div>'));
    //     ytWidget = new YT.Player('ytPlayer', {
    //         height: '390',
    //         width: '640',
    //         videoId: id,
    //         events: {
    //             'onReady': onReady,
    //             'onStateChange': onPlayerStateChange,
    //             'onError': onError
    //         },
    //         playerVars: {
    //             color: "white",
    //             controls: 0,
    //             disablekb: 1,
    //             enablejsapi: 1,
    //             autoplay: 1,
    //             start: startTime,
    //             end: endTime
    //         }
    //     });
    // }

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
            player.enableControls();
            startTime = startTime.clampedLower(0);
            endTime = endTime.clampedUpper(ytWidget.getDuration());
            ytWidget.seekTo(startTime);
            ytWidget.playVideo();
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
        ytWidget.seekTo(ratio * (endTime - startTime) + startTime, true);
    }

    this.loadNewSong = function (songJSON) {
        startTime = songJSON.meta.startTime;
        endTime = songJSON.meta.endTime;
        ytWidget.loadVideoById({
            'videoId': songJSON.url,
            'startSeconds': startTime,
            'endSeconds': endTime,
            'suggestedQuality': 'large'
        });
    }

    this.disable = function () {
        awaitingInitialPlay = true;
        ytWidget.pauseVideo();
    }

    this.getRatio = function () {
        return (ytWidget.getCurrentTime() - startTime) / (endTime - startTime);
    }
}