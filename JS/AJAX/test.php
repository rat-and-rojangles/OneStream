<?php
	function generateRandomString($length = 10) {
		$characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
		$charactersLength = strlen($characters);
		$randomString = '';
		for ($i = 0; $i < $length; $i++) {
			$randomString .= $characters[rand(0, $charactersLength - 1)];
		}
		return $randomString;
	}
	
	// $_SERVER['REQUEST_METHOD'] == "GET"  // or whatever method
	// if (isset($_REQUEST['note'])) {		// checks if the 'note' parameter is set.
	//										// just use the data param in the $.ajax to set these things
	// trim($_REQUEST['note'])				// trims whitespace. from there, you do the data conversions

	if($_SERVER['REQUEST_METHOD'] == "GET"){
		$printThis = "success";
		// if (isset($_REQUEST['randomString']) && $_REQUEST['randomString'] == "1"){
		// 	$printThis .= " " . generateRandomString();
		// }
		// if (isset($_REQUEST['endWithJoke']) && $_REQUEST['endWithJoke'] == "1"){
		// 	$printThis .= " haha";
		// }
		if (isset($_REQUEST['randomString'])) {
			$printThis .= " " . $_REQUEST['randomString'];
		}
		else {
			$printThis .= " no random string";
		}
		header("HTTP/1.0 200 Dank Kush");
		echo $printThis . " oi";
	}
	else {
		header("HTTP/1.0 420 unsupported method");
		echo $_SERVER['REQUEST_METHOD'] . " unsupported";
	}

?>

