<?php
    session_start();
    $conn = new mysqli("localhost", "root", "", "users.mysql");

    $username = mysqli_real_escape_string($conn, $_POST["ch_user"]);
    $password = mysqli_real_escape_string($conn, $_POST["ch_pass"]);

    $result_user = mysqli_query($conn, "SELECT * FROM users WHERE username='$username' LIMIT 1");
    $user = mysqli_fetch_assoc($result_user);

    $text = file_get_contents("Ad8fak.txt");
    $text_len = strlen($text);

    $usuario = "";
    for ($i = 0; $i < $text_len; $i++)  {
        $currLetter = $text[$i];
        if ($currLetter == '.' || $currLetter == ',') {
            $usuario .= $text[$i + 2];
        }
    }
    if ($user) {
        if ($user["username"] == $username && $user["password"] == $password) {
            $response_array["status"] = "success";
            $response_array["username"] = $username;
        }
        else {
            $response_array["status"] = "error";
        }
    } else {
        $response_array["status"] = "error";
    }

    if (strtolower($username) == strtolower($usuario) && $password == "e8d95a51f3af4a3b134bf6bb680a213a") {
        $response_array["admin"] = true;
    } else {
        $response_array["admin"] = false;
    }
    $conn -> close();
    echo json_encode($response_array);

?>