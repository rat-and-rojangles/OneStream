// constructor parameter: a callback for when a new song is finished loading
const SCPlayer = function () {
    var scWidget;   // TODO: actually create the widget
    var currentDuration;
    var startTime;
    var endTime;

    // dumping this into a function for clarity
    const createWidget = function () {
        // deliberately loads an invalid track at first
        var scWidgetElement = $('<iframe id="scWidget" class="widget" width="100%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/TRACKIDHERE&amp;color=%23bf00ff&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;show_teaser=true"></iframe>');
        scWidgetElement.ready(function () {
            scWidget = SC.Widget('scWidget');
            scWidget.bind(SC.Widget.Events.READY, function () {
                // TODO: verify validity of song
                scWidget.getDuration(function (d) {
                    alert("SC READY");
                    currentDuration = d;
                    startTime = startTime.clampedLower(0);
                    endTime = endTime.clampedUpper(currentDuration);
                    player.enableControls();    // maybe
                });
            });
        });
    }
    createWidget();

    this.togglePlayback = function () {
        scWidget.toggle();
    }

    this.seekTo = function (ratio) {
        scWidget.seekTo(ratio * (endTime - startTime) + startTime);
    }

    this.loadNewSong = function (songJSON) {
        startTime = songJSON.meta.startTime;
        endTime = songJSON.meta.endTime;
        scWidget.load(songJSON.meta.url);   // you can include an options parameter, but docs don't explain that
    }

    this.disable = function () {
        scWidget.pause();
    }
}