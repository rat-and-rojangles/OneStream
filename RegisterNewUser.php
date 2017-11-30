<?php

function post($key) {
    if (isset($_POST[$key]))
        return $_POST[$key];
    return false;
}

// setup the database connect
$dbname = 'mckellydb';
$dbuser = 'mckelly';
$dbpass = 'password';
$dbhost = 'classroom.cs.unc.edu';

// create variables from AJAX 'data' parameter
$user = $_POST['user'];
$pass = $_POST['pass'];
$email = $_POST['email'];

// connect to server
$connect = mysqli_connect($dbhost, $dbuser, $dbpass)
or die("Unable to Connect to '$dbhost'");

// troubleshoot if connect worked
// NOTE: this only works by running the php file by itself and not through HTML
if($connect){
    echo "Connected to host<br>";
}

// select db on server
mysqli_select_db($connect, 'mckellydb')
or die("Could not open the db '$dbname'");

// create string for sql query
$sql = "INSERT INTO User (Login, Password, Email) VALUE ('$user', '$pass', '$email')";

if (mysqli_query($connect, $sql)) {
    echo "HTTP/1.0 200 Good Request";
} else {
    echo "HTTP/1.0 400 Bad Request";
}

mysqli_close($connect);
?>