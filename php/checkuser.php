<?php  

$user = $_POST['username'];

$db_name = "courseHelp.db";  

if (!file_exists($db_name)) { 
	if (!($fp = fopen($db_name, "w+"))) {
		exit(error_code(-1, LN));
	}
	fclose($fp);  
}

$db = new SQLite3($db_name);



$result = $db->query("SELECT ID, Username, Name, Email, Access FROM user where username='$user'");

$arr = array();

while($row = $result->fetchArray()) {  
    $count=count($row);
    for($i=0;$i<$count;$i++){
        unset($row[$i]);
    }
    array_push($arr,$row);
}

echo json_encode($arr,JSON_UNESCAPED_UNICODE);
$db->close(); 
?>  

