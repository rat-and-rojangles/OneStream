$(function () {
	$('body').removeClass('fade-out');
});


setTimeout(function () {
	$('#banner').remove();
	$('#screen-1').css({ 'display': 'inline' });
}, 3000);

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
				var library = $("<div class='song-view container-fluid' style='margin-top:20px;'><div class='row'><div class='col-sm-8'><br /><h1>Library</h1><br /></div><div style='flex-direction:row;'><button style='margin-right:10px;' class='btn addbtns' id='play-button' onclick='alert(1)'>Play</button><button class='btn addbtns' id='shuffle-button'>Shuffle</button><button class='btn addbtns top-buffer' id='add-song'>Add Song</button></div></div></div>");
				$("#library-choice").on('click', function (e) {$("#play-place").empty(); $("#play-place").append(library);});

			},
			error: function (result) {
				console.log(result);
			}
		});
	});
});
