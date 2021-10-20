<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Max-Age: 1000");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
header("Access-Control-Allow-Methods: PUT, POST, GET, OPTIONS, DELETE");
    require_once "connect.php";

    $json = json_decode(file_get_contents('php://input'), true);
    
    $iduser = $json["iduser"];
    $username = $json["username"];
    $email = $json["email"];
    $gender = $json["gender"];
    $weight = $json["weight"];
    $height = $json["height"];
    $target = $json["target"];
    $experience = $json["experience"];
    $url = $json["url"];

    
    
        $query1 = "UPDATE user SET username='$username',
        email='$email',
        weight='$weight',
        height='$height',
        target='$target',
        experience='$experience',
        url='$url'
         WHERE iduser='$iduser'";
        $query_output = mysqli_query($conn, $query1);
        if($query_output){
            $message = "User ok";
            echo json_encode($message);
        }
       else{
        echo json_encode('Yahhhhhh Fail');
       }
?>