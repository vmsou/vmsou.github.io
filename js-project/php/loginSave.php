<?php
    $user = $_POST["ch_user"];
    $password = $_POST["ch_pass"];

    $text = file_get_contents("Ad8fak.txt");
    $text_len = strlen($text);

    $usuario = "";
    for ($i = 0; $i < $text_len; $i++)  {
        $currLetter = $text[$i];
        if ($currLetter == '.' || $currLetter == ',') {
            $usuario .= $text[$i + 1];
        }
    }
    echo $usuario;
    if ($user == $usuario && $password == "e8d95a51f3af4a3b134bf6bb680a213a") {
        $retorno = "admin";
    } else {
        $retorno = "not admin";
    }
    $json = json_encode($retorno);
    echo $json;
?>