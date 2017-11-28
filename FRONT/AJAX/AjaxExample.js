var onAjaxResolve = function (data) {
	alert(data);
	$("#mainDiv").text(JSON.stringify(data));
	// $("#mainDiv").text(data["Host"]);
}

$(document).ready(function () {
	$.ajax({
		// dataType: "json",
		url: "test.php",
		method: "GET",
		data: {
			'randomString': "1",
			'endWithJoke': "0"
		},
		success: function (data) {
			alert(data + " success");
			onAjaxResolve(data);
		},
		error: function (data) {
			alert(data + " error");
			onAjaxResolve(data);
		}
	});
});


/*
$.ajax({
	dataType: "json",
	url: "ourAjaxReceiver.php",
	data: "Object or String, this is appended to the request",
	success: function () { alert("success"); }
});

// shorthand:
$.getJSON("ourAjaxReceiver.php", "optionalData", function () { alert("success"); });

*/