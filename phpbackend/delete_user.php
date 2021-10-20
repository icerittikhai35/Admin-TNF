<?php
header('Access-Control-Allow-Origin: *');
include 'connect.php';

// 
$iduser = $_GET['iduser'];
$sql = "DELETE FROM user WHERE  iduser = '" . $iduser . "'";

if ($conn->query($sql) === TRUE) {
  echo "ลบข้อมูลเสร็จสิ้น";
} else {
  echo "Error deleting record: " . $conn->error;
}
$conn->close();
