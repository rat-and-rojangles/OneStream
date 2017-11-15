
// todo: get YT widget (player)
const Player = function () {
    var scPlayer = new SCPlayer(enableControls);
    var ytPlayer = new YTPlayer(enableControls);  // not yet defined
    var activePlayer;

    this.seekTo = function (ratio) {
        activePlayer.seekTo(ratio);
    }

    this.togglePlayback = function () {
        activePlayer.togglePlayback();
    }


    //takes a JSON object (probably from the DB) and uses that to load up a song
    this.loadNewSong = function (songJSON) {
        exampleParameter = {
            fromYoutube: false,
            url: "soundcloud_or_youtube_URL",
            meta: {
                name: "Song Name",
                artist: "Artist Name",
                album: "Album Name",
                startTime: 0,
                endTime: 10000
            }
        }
        var songNameVue;    //suppose this already exists
        songNameVue.data = songJSON.meta.name;  // change it to match the name of the new song
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
        disableUIWhileWaiting();
        activePlayer.loadNewSong(songJSON);
    }

    // Disables everything that has to wait for stuff to load
    const disableControlsWhileWaiting = function () {
        // disable the buttons
    }

    const enableControls = function () {
        // enable the buttons
    }
}

const SCPlayer = function (onSongLoadCallback) {
    var scWidget;   // TODO: actually create the widget
    var ready = false;
    var startTime;
    var endTime;

    this.togglePlayback = function () {
        scWidget.toggle();
    }

    this.seekTo = function (ratio) {
        scWidget.seekTo(ratio * (endTime - startTime) + startTime);
    }

    this.isReady = function () {
        return ready;
    }

    this.loadNewSong = async function (songJSON) {
        scWidget.load(songJSON.meta.url);   // you can include an options parameter, but docs don't explain that
        startTime = songJSON.meta.startTime;
        endTime = songJSON.meta.endTime;
        // TODO:
        // verify the song is valid
        // verify the start/end times are correct
    }

    this.disable = function () {
        // ?
    }

    const onFinishedLoadingSong = onSongLoadCallback;
}