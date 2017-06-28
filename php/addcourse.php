<?php

$name = $_POST['name'];
$start = $_POST['startDate'];
$end = $_POST['endDate'];
$description = $_POST['description'];
$total = $_POST['number'];
$creater = $_POST['creater'];

$db_name = "courseHelp.db";  

if (!file_exists($db_name)) { 
	if (!($fp = fopen($db_name, "w+"))) {
		exit(error_code(-1, LN));
	}
	fclose($fp);  
}

$db = new SQLite3($db_name);

$sql = "insert into course
(name, start, end, totalnumber, currentnumber, decription, creater, created)
values
('$name','$start','$end',$total, 0,'$description','$creater',CURRENT_TIMESTAMP)";

$db->exec($sql);

$sql2 = "SELECT * FROM course";
$result = $db->query($sql2);  

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