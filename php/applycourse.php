<?php

$user = $_POST['user'];
$course = $_POST['course'];

$db_name = "courseHelp.db";  

if (!file_exists($db_name)) { 
	if (!($fp = fopen($db_name, "w+"))) {
		exit(error_code(-1, LN));
	}
	fclose($fp);  
}

$db = new SQLite3($db_name);

$sql = "insert into courseapply
(user, course)
values
('$user','$course')";

$db->exec($sql);


$db->close();

?>