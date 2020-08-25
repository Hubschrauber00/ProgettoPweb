<?php 
require_once __DIR__ ."/config.php";
require_once DIR_UTIL . "dbManager.php"; 
require_once DIR_UTIL . "sessionUtil.php";
require_once DIR_AJAX_UTIL . "AjaxResponse.php";

$data = json_decode(file_get_contents('php://input'), true);

$username = $data['username'];
$password = $data['password'];



echo login($username, $password);


function login($username, $password){
    $response = new AjaxResponse();

    if ($username != null && $password != null){
        $userId = authenticate($username, $password);
        if ($userId > 0){
            session_start();
            setSession($username, $userId);
            $response->responseCode = 0;
            $response->message ="Benvenuto ". $username . ", seleziona la modalità di gioco";
        }
        else{
            $response->responseCode = 1;
            $response->message = 'Password o username non validi.';
        }
    } else{
        $response->responseCode = -1;
        $response->message = 'Dovresti inserire qualcosa';
    }
    return json_encode($response);
}

function authenticate ($username, $password){   
    global $dbManager;
    $username = $dbManager->sqlInjectionFilter($username);
    $password = $dbManager->sqlInjectionFilter($password);

    $queryText = 'SELECT* FROM utente WHERE username = \'' . $username . '\' AND password = \'' . $password . '\'';

    $result = $dbManager->performQuery($queryText);
    $numRow = mysqli_num_rows($result);
    if ($numRow != 1)
        return -1;
    
    $userRow = $result->fetch_assoc();
    $dbManager->closeConnection();
    return $userRow['idUtente'];
}

?>