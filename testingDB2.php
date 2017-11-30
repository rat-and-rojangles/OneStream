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

$value = $_POST['value'];

$connect = mysqli_connect($dbhost, $dbuser, $dbpass)
or die("Unable to Connect to '$dbhost'");

if($connect){
    echo "Connected to host<br>";
}

mysqli_select_db($connect, 'mckellydb')
or die("Could not open the db '$dbname'");

$sql = "INSERT INTO TestTable (TestColumn2) VALUE ('$value')";

if (mysqli_query($connect, $sql)) {
    echo "HTTP/1.0 200 Good Request";
} else {
    echo "HTTP/1.0 400 Bad Request";
}

mysqli_close($connect);
?>