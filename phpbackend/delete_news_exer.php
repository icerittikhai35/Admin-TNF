<?php
header('Access-Control-Allow-Origin: *');
include 'connect.php';

// 
$idnew_feed_exer = $_GET['idnew_feed_exer'];
$sql = "DELETE FROM new_feed_exer WHERE  idnew_feed_exer = '" . $idnew_feed_exer . "'";

if ($conn->query($sql) === TRUE) {
  echo "ลบข้อมูลเสร็จสิ้น";
} else {
  echo "Error deleting record: " . $conn->error;
}
$conn->close();
