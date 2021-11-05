<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Max-Age: 1000");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
header("Access-Control-Allow-Methods: PUT, POST, GET, OPTIONS, DELETE");

require_once "connect.php";
$json = json_decode(file_get_contents('php://input'), true);


$username = $_GET['username'];
$password = $_GET['password'];




    if ($username != "") {
        $isPassword = mysqli_fetch_assoc(mysqli_query($conn, "SELECT password FROM admin WHERE username = '$username'"));
        if ($isPassword["password"] == "") {
            echo json_encode('ชื่อผู้ใช้ไม่ถูกต้อง');
        } else {
            if ($isPassword["password"] == $password) {
                $sql = "SELECT * FROM admin WHERE username = '$username'";
                $result = mysqli_query($conn, $sql);
                $row = mysqli_fetch_assoc($result);
                $id = $row['idadmin'];
                $output =  array('idadmin' => $id, 'onLogin' => 'true',);                
                echo json_encode($output);
                
            } else {
                echo json_encode('รหัสผ่านไม่ถูกต้อง');
            }
        }
    } else {
        echo json_encode('กรุณากรอกข้อมูลผู้ใช้');
    }
?>