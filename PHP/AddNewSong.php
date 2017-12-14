<?php

// setup the database connect
$dbname = 'mckellydb';
$dbuser = 'mckelly';
$dbpass = 'password';
$dbhost = 'classroom.cs.unc.edu';

// create variables from AJAX 'data' parameter
$title = $_POST['title'];
$artist = $_POST['artist'];
$album = $_POST['album'];
$genre = $_POST['genre'];
$song_url = $_POST['song_url'];
$user_id = $_POST['user'];

// connect to server
$connect = mysqli_connect($dbhost, $dbuser, $dbpass, $dbname)
or die("Unable to Connect to '$dbhost'");

// troubleshoot if connect worked
// NOTE: this only works by running the php file by itself and not through HTML


// select db on server
mysqli_select_db($connect, 'mckellydb')
or die("Could not open the db '$dbname'");

// create string for sql query
$sql = "INSERT INTO Song (Title, Artist, Album, Genre, URL, User_ID) VALUE ('$title', '$artist', '$album', '$genre', '$song_url', '$user_id')";
mysqli_query($connect,$sql);

mysqli_close($connect);
?>
