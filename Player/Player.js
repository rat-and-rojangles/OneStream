// 1. window loads
$(document).ready(function () {
    // 2. create yt/sc wigdets
    // 3. create yt/soundcloud players
    // 4. create universal player
});

var player = new Player();
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
        this.disableControls();
        activePlayer.loadNewSong(songJSON);
    }

    // Disables everything that has to wait for stuff to load
    // NOTE: everything should start disabled on page load 
    this.disableControls = function () {
        // disable the buttons
    }

    this.enableControls = function () {
        // enable the buttons
    }
}
