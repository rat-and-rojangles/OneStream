// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementById('ytAsync');
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '390',
        width: '640',
        videoId: 'M7lc1UVf-VE',
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
    ytReady = true;
    initialize();
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    // console.log(JSON.stringify(event.target));
    event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
    // console.log(JSON.stringify(event));
    // if (event.data == YT.PlayerState.PLAYING && !done) {
    //     setTimeout(stopVideo, 6000);
    //     done = true;
    // }
}
function stopVideo() {
    player.stopVideo();
}

var slider;
window.onload = function () {
    slider = document.getElementById("slider");
    slider.getFloatValue = function () {
        return parseFloat(slider.value);
    }
    slider.onchange = function () {
        player.seekTo(player.getDuration() * slider.getFloatValue(), true);
    }
    document.getElementById("pausePlay").onclick = function () {
        togglePlayback();
    }
    document.querySelectorAll('*').forEach(function (element) {
        try {
            element.removeEventListener("keydown");
            element.removeEventListener("keypress");
            element.removeEventListener("keyup");
        } catch (e) { }
    });
    document.onkeydown = function (event) {
        if (event.keyCode == 32) {
            togglePlayback();
        }
        else if (event.keyCode == 77) {
            toggleMute();
        }
    }

}

const togglePlayback = function () {
    if (player.getPlayerState() == YT.PlayerState.PLAYING) {
        player.pauseVideo();
    }
    else {
        player.playVideo()
    }
}

const toggleMute = function () {
    if (player.isMuted()) {
        player.unMute();
    }
    else {
        player.mute();
    }
}