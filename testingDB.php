<?php

echo "php script running<br>";

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

$connect = mysqli_connect($dbhost, $dbuser, $dbpass)
    or die("Unable to Connect to '$dbhost'");

if($connect){
    echo "Connected to host<br>";
}

mysqli_select_db($connect, 'mckellydb')
    or die("Could not open the db '$dbname'");

    $sql = "INSERT INTO TestTable (TestColumn) VALUE (DEFAULT)";

    if (mysqli_query($connect, $sql)) {
        echo "HTTP/1.0 200 Good Request";
    } else {
        echo "HTTP/1.0 400 Bad Request";
    }

mysqli_close($connect);
?>