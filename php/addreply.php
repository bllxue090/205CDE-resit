<?php

$discussionid = $_POST['discussionid'];
$content = $_POST['content'];
$creater = $_POST['creater'];

$db_name = "courseHelp.db";  

if (!file_exists($db_name)) { 
	if (!($fp = fopen($db_name, "w+"))) {
		exit(error_code(-1, LN));
	}
	fclose($fp);  
}

$db = new SQLite3($db_name);

$sql = "insert into reply
(discussionid, content, creater, createtime)
values
('$discussionid','$content','$creater',CURRENT_TIMESTAMP)";

$db->exec($sql);

$sql2 = "SELECT * FROM reply where creater = '$creater'";
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