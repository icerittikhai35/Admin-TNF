<?php
header('Access-Control-Allow-Origin: *');
include 'connect.php';

// Creating SQL command to fetch all records from Table.
$sql = "SELECT * FROM new_feed_exer order by idnew_feed_exer desc";

$result = $conn->query($sql);

if ($result->num_rows >0) {
 
 
 while($row[] = $result->fetch_assoc()) {
 
 $item = $row;
 
 $json = json_encode($item);
 
 }
 
} else {
 echo "No Results Found.";
}
 echo $json;
$conn->close();
?>