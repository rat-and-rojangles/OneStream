$(function() {
    $('body').removeClass('fade-out');
});
setTimeout(function() {
  $('#banner').remove();
  $('#screen-1').css({ 'display' : 'inline' })
  $("#submit").click(function(){
    var user = $("#un").val();
    var pass = $("#pwd").val();
    alert(pass);
    alert(user);

    //var url = "https://wwwp.cs.unc.edu/Courses/comp426-f17/users/robro/final_proj_testing/login.php";
    var url = "login.php";
    var data = {login: user, pass: pass};

    
    $.ajax({
            type: "POST",
            url: url,
            data: data,
	    dataType: 'JSON',
            cache: false,
	    success: function(result) {alert("Success!");
		console.log(result);
            },
            error: function(result){alert("ERROR!");
		console.log(result);
            }
                });
		

    


  });


}, 3000);
