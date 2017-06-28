<?php
$discussionid = $_POST['id'];

$db_name = "courseHelp.db";  

if (!file_exists($db_name)) { 
	if (!($fp = fopen($db_name, "w+"))) {
		exit(error_code(-1, LN));
	}
	fclose($fp);  
}

$db = new SQLite3($db_name);



$result = $db->query("SELECT a.*,b.name FROM reply a,user b where b.ID=a.creater and discussionid = '$discussionid' order by createtime");

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