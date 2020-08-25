<?php
require_once __DIR__ . "/config.php";
require_once DIR_UTIL . "sessionUtil.php";
require_once DIR_UTIL . "CommonQueries.php";
require_once DIR_AJAX_UTIL . "AjaxResponse.php";

session_start();
$data = json_decode(file_get_contents('php://input'), true);
$gameId = $data['gameId'];
$isGuest = $data['isGuest'];
$response = new AjaxResponse();
$response->responseCode = 1;
$response->message = "impossibile settare malus";
if(Lock($gameId)){
    $result = setMalus($gameId, $isGuest);
    if($result) {
        $response->responseCode = 0;
        $response->responseCode = "ok";
    }
    Unlock($gameId);
}

echo json_encode($response);
exit;