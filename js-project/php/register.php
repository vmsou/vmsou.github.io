<?php
    session_start();
    $response_array['errors'] = array();
    $conn = new mysqli("localhost", "root", "", "users.mysql");

    $firstName = mysqli_real_escape_string($conn, $_POST["ch_fname"]);
    $secondName = mysqli_real_escape_string($conn, $_POST["ch_sname"]);
    $email = mysqli_real_escape_string($conn, $_POST["ch_email"]);
    $username = mysqli_real_escape_string($conn, $_POST["ch_user"]);
    $password = mysqli_real_escape_string($conn, $_POST["ch_pass"]);

    $result_user = mysqli_query($conn, "SELECT * FROM users WHERE username='$username' LIMIT 1");
    $result_email = mysqli_query($conn, "SELECT * FROM users WHERE email='$email' LIMIT 1");
    $user = mysqli_fetch_assoc($result_user);
    $mail = mysqli_fetch_assoc($result_email);

    if ($user) {
        if ($user['username'] === $username) {
            array_push($response_array['errors'], "Usuário existente.");
        }
        if ($mail['email'] === $email) {
            array_push($response_array['errors'], "Email existente.");
        }
    }

    if (count($response_array['errors']) == 0) {
        $result = mysqli_query($conn, "INSERT INTO `users`(`firstName`, `secondName`, `email`, `username`, `password`) VALUES ('$firstName','$secondName','$email','$username', '$password')");
        $conn -> commit();
        $response_array['status'] = 'success';
        $_SESSION['username'] = $username;
    } else {
        $response_array['status'] = 'error';
    }

    $conn -> close();
    echo json_encode($response_array);

?>