// var client_id = '278594df9a311b2a1a56251b3a2b0fbe';
// // var track_id = '350964694';  //defcon bootleg
// var track_id = '293605256';     //stolen

// SC.initialize({
//     client_id: client_id
// });

var scWidget;
var slider;
var currentDuration = -1;

$(document).ready(function () {

    $('#scWidget').on("load", function () {
        scWidget = SC.Widget('scWidget');
        scWidget.getDuration(function (a) { currentDuration = a; });
    });

    slider = $('#slider');
    $('#pausePlay').on('click', function () { togglePlayback() })
    slider.change(function (e, ui) {
        seekRatio(parseFloat(slider.val()));
    });
});

const togglePlayback = function () {
    scWidget.toggle();
}

const seekRatio = function (ratio) {
    scWidget.seekTo(ratio * currentDuration);
}