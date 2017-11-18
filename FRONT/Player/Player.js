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
    data.meta = {};
    data.meta.startTime = 0;
    data.meta.endTime = 9999999;
    player.loadNewSong(data);
}

var slider;
var songLinkField;
$(document).ready(function () {
    player = new Player();
    $('*').off('keypress keydown keyup');
    $(document).on('keypress', function (e) {
        if (e.which == 32) {
            player.togglePlayback();
        }
        // else if(e.which == )
    });
    slider = $('#slider');
    slider.on('change', function () {
        player.seekTo(parseFloat(slider.val()));
    });
    $('#pausePlay').on('click', player.togglePlayback);
    songLinkField = $('#songLink');
    $('#loadSongButton').on('click', function () {
        loadSong(songLinkField.val());
    });
});

var Player = function () {
    var scPlayer = new SCPlayer();
    var ytPlayer = new YTPlayer();  // not yet defined
    var activePlayer;

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
        if (!ready && playersReady == 2) {
            this.enableControls();
            ready = true;
        }

        exampleParameter = {
            fromYoutube: false, //true if from YT, false if from SC
            url: "soundcloud_or_youtube_URL",
            meta: {
                name: "Song Name",
                artist: "Artist Name",
                album: "Album Name",
                startTime: 0,
                endTime: 10000
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
        enabled = false;
        clearInterval(fireContinuouslyWhilePlaying);
    }

    this.enableControls = function () {
        enabled = true;
        setInterval(fireContinuouslyWhilePlaying, 1);
    }

    this.onYTSongEnd = function () {
        this.disableControls();
    }
    this.onSCSongEnd = function () {
        this.disableControls();
    }

    var fireContinuouslyWhilePlaying = function () {
        if (enabled && activePlayer.isPlaying()) {
            slider.val(activePlayer.getRatio());
        }
    }
}