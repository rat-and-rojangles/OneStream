var client_id = '278594df9a311b2a1a56251b3a2b0fbe';
var track_id = '345247550';

SC.initialize({
  client_id: client_id
});


$(document).ready(function() {
  $("#stream").on("click", function() {
    SC.stream("/tracks/" + track_id, function(sound)     {
      sound.play();
    }
    );
  });
});

$('button').on('click', function() {
  $(this).toggleClass('pause-sprite');
});
