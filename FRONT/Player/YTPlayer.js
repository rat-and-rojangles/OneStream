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
        alert("ready");
    }

    var regeneratePlayer = function (id, start, end) {
        startTime = start;
        endTime = end;
        alert('regenerating');
        $('#ytPlayer').remove();
        $('body').append($('<div id="ytPlayer" class="widget"></div>'));
        ytWidget = new YT.Player('ytPlayer', {
            height: '390',
            width: '640',
            videoId: id,
            events: {
                'onReady': onReady,
                'onStateChange': onPlayerStateChange
            },
            playerVars: {
                color: "white",
                controls: 0,
                disablekb: 1,
                enablejsapi: 1,
                autoplay: 1,
                start: startTime,
                end: endTime
            }
        });
    }

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

    var onPlayerStateChange = function (event) {
        if (event.data == YT.PlayerState.ENDED) {
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
            ytWidget.playVideo();
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
        regeneratePlayer(songJSON.url, songJSON.meta.startTime, songJSON.meta.endTime);
    }

    this.disable = function () {
        ytWidget.pauseVideo();
    }

    this.getRatio = function () {
        return ytWidget.getCurrentTime() / ytWidget.getDuration();
    }
}