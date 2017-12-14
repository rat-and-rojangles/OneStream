<?php

// setup the database connect
$dbname = 'mckellydb';
$dbuser = 'mckelly';
$dbpass = 'password';
$dbhost = 'classroom.cs.unc.edu';

// create variables from AJAX 'data' parameter

$user = $_GET['user'];

// connect to server
$connect = mysqli_connect($dbhost, $dbuser, $dbpass)
or die("Unable to Connect to '$dbhost'");

// select db on server
mysqli_select_db($connect, 'mckellydb')
or die("Could not open the db '$dbname'");

if ($_SERVER['REQUEST_METHOD'] == "GET") {

    $sql = "SELECT * FROM Song WHERE User_ID=$user";
    $result = mysqli_query($connect, $sql);

    while($row = mysqli_fetch_assoc($result))
        $test[] = $row;

    print json_encode($test);

}

mysqli_close($connect);
?>