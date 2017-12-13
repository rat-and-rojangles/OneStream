<?php

$name = 'mckellydb';
$user = 'mckelly';
$pass = 'password';
$host = 'classroom.cs.unc.edu';
$correct = 0;

//$login = $_POST['login'];
//$password = $_POST['pass'];
//$login = "user";
//$password = "pass";

// Begin connection
/*$connect = mysqli_connect($host, $user, $pass)
or die("Unable to Connect to '$host'");


mysqli_select_db($connect, 'mckellydb');



// create string for sql query
//$pass_test = "SELECT Password FROM User u WHERE u.Login='$login' limit 1";
$pass_res = mysqli_query($connect, "SELECT Password FROM User u WHERE u.Login='".$login."' limit 1");
$pass_temp = mysqli_fetch_object($pass_res);
//var_dump($pass_temp);

$pass_val = $pass_temp->Password;



if($pass_val == $password){$correct = 1;}

//$data = {password: $pass_val, correct: $correct};*/






?>
