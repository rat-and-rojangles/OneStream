$(function () {
	$('body').removeClass('fade-out');
});


<<<<<<< HEAD
setTimeout(function() {
  $('#banner').remove();
  $('#screen-1').css({ 'display' : 'inline' });
}, 1000);

=======
setTimeout(function () {
	$('#banner').remove();
	$('#screen-1').css({ 'display': 'inline' });
}, 3000);
>>>>>>> c8c659dc5bfb53528945595405e998b8b432aadc

$(document).ready(function () {
	$("#login-form").on('submit', function (e) {

		e.preventDefault();

		var email = $("#un").val();
		var pass = $("#pwd").val();

		var url = "login.php";
		var data = { email: email, pass: pass };

		$.ajax({
			type: "GET",
			url: url,
			data: data,
			dataType: 'JSON',
			success: function (result) {
				console.log(result);
				$("#screen-1").remove();
				var user_id = result[0].ID;

			},
			error: function (result) {
				console.log(result);
			}
		});
	});
});
