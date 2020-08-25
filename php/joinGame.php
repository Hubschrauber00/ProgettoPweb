<?php
require_once __DIR__ . "/config.php";
require_once DIR_UTIL . "sessionUtil.php";
require_once DIR_UTIL . "CommonQueries.php";
require_once DIR_AJAX_UTIL . "AjaxResponse.php";

session_start();
$data = json_decode(file_get_contents('php://input'), true);
$gameId = $data['gameId'];
$response = new AjaxResponse();
$response->responseCode = 1;
$response->message = "impossibile unirsi alla partita";
if(Lock($gameId)){
    $result = joinGame($gameId);
    if($result){
        $response->responseCode = 0;
        $response->message = "ok";
        $response->data = $_SESSION['userId'];
    }
    Unlock($gameId);
}

echo json_encode($response);
exit;