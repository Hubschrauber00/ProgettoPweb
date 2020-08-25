<?php
require_once __DIR__ . "/config.php";
require_once DIR_AJAX_UTIL . "AjaxResponse.php";
include DIR_UTIL . "sessionUtil.php";
include DIR_UTIL . "CommonQueries.php";


$data = json_decode(file_get_contents('php://input'), true);

$username = $data['username'];
$password = $data['password'];

echo register($username, $password);


function register($username, $password){
    $response = new AjaxResponse();

    if(checkIfExists($username)){
     $response->responseCode = -1;
     $response->message =  'impossibile registrare questo username';
    }
    else{
        global $dbManager;
        $username = $dbManager->sqlInjectionFilter($username);
        $password = $dbManager->sqlInjectionFilter($password);
        $queryText = 'INSERT INTO utente(username,password) VALUES (\'' . $username . '\', \'' . $password . '\');' ;
        $result = $dbManager->performQuery($queryText);
        if($result){
            $userId = $dbManager->getLastId();
            session_start();
            setSession($username, $userId);
            $response->responseCode = 0;
            $response->message = "Benvenuto " . $username . ", premi PLAY per giocare";
        }
        else{
            $response->responseCode = -1;
            $response->message = "registrazione non effettuata, ritenta";
        }
        $dbManager->closeConnection();
    }

    return json_encode($response);
}