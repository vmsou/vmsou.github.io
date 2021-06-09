<?php
    $firstName = $_POST["ch_fname"];
    $secondName = $_POST["ch_sname"];
    $email = $_POST["ch_email"];
    $registry = $_POST["ch_registry"];
    $user = $_POST["ch_user"];
    $password = $_POST["ch_pass"];

    if ($user == "admin" && $password == "e8d95a51f3af4a3b134bf6bb680a213a") {
        $retorno = utf8_encode("é admin");
    } else {
        $retorno = utf8_encode("não é admin");
    }
    $json = json_encode($retorno);
    echo $json;
?>