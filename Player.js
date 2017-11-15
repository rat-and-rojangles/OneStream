
// todo: get YT widget (player)
const Player = function () {
    var scPlayer = new SCPlayer();
    var ytPlayer = new YTPlayer();  // not yet defined
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
        songNameVue.data = songJSON.meta.name;  // and so on

        ytPlayer.disable();
        scPlayer.disable();

        if (songJSON.fromYoutube) {
            activePlayer = ytPlayer;
        }
        else {
            activePlayer = scPlayer;
        }
        activePlayer.loadNewSong(songJSON);

    }

    // Disables everything that has to wait for stuff to load
    // Then reenables it when it's ready
    const waitForLoad = function () {
        // disable the button
    }
}

const SCPlayer = function () {
    var scWidget;
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

    this.loadNewSong = function (songJSON) {
        scWidget.load(songJSON.meta.url);   // you can include an options parameter, but docs don't explain that
        startTime = songJSON.meta.startTime;
        endTime = songJSON.meta.endTime;
    }

    this.disable = function () {
        // ?
    }
}