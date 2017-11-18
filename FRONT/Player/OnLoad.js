$(document).ready(function () {
    player = new Player();
    $('*').off('keypress keydown keyup');
    $(document).on('keypress', function (e) {
        if (e.which == 32) {
            player.togglePlayback();
        }
        // else if(e.which == )
    });
});