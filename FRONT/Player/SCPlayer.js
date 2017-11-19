var SCPlayer = function () {
    var scWidget;
    var currentDuration;
    var startTime = 0;
    var endTime = 999999999;
    var playing = false;
    var ratio = 0;

    var ready = false;
    // dumping this into a function for clarity
    var createWidget = function () {
        // deliberately loads an invalid track at first
        var scWidgetElement = $('<iframe id="scWidget" class="widget" width="100%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/TRACKIDHERE&amp;color=%23bf00ff&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;show_teaser=true"></iframe>');
        $('body').append(scWidgetElement);
        scWidgetElement.ready(function () {
            scWidget = SC.Widget('scWidget');
            scWidget.bind(SC.Widget.Events.READY, function () {
                ready = true;
                player.initializeIfReady();
            });
            scWidget.bind(SC.Widget.Events.FINISH, function () {
                player.onSCSongEnd()
                playing = false;
            });
            scWidget.bind(SC.Widget.Events.PLAY_PROGRESS, function () {
                scWidget.getPosition(function (p) {
                    playing = true;
                    ratio = p / currentDuration;
                });
            });
        });
    }
    createWidget();

    this.isPlaying = function () {
        return playing;
    }

    this.togglePlayback = function () {
        scWidget.toggle();
        scWidget.isPaused(function (e) {
            playing = !e;
        });
    }

    this.seekTo = function (ratio) {
        scWidget.seekTo(ratio * (endTime - startTime) + startTime);
    }

    this.loadNewSong = function (songJSON) {
        var widgetOptions = {};
        widgetOptions.callback = function () {
            scWidget.getDuration(function (d) {
                alert(d);
                currentDuration = d;
                startTime = startTime.clampedLower(0);
                endTime = endTime.clampedUpper(currentDuration);
                scWidget.play();
                player.enableControls();
            });
        };
        startTime = songJSON.meta.startTime;
        endTime = songJSON.meta.endTime;
        scWidget.load(songJSON.url, widgetOptions);
        playing = false;
    }

    this.disable = function () {
        scWidget.pause();
    }

    this.getRatio = function () {
        return ratio;
    }

}