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
				 user_id_global = result[0].ID;
				driver(user_id_global);

			},
			error: function (result) {
				console.log(result);
			}
		});
	});
});
