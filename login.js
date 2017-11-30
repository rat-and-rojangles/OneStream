$(function() {
    $('body').removeClass('fade-out');
});
setTimeout(function() {
  $('#banner').remove();
  $('#screen-1').css({ 'display' : 'inline' })

}, 3000);
