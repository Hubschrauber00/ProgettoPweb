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
$response->message = "stato non disponibile";
if(Lock($gameId)){
    $result = getGame($gameId);
    if($result){
        $gamerow = $result->fetch_assoc();
        $result = resetMalus($gameId, $isGuest);
        $response->responseCode = 0;
        $response->message = "ok";
        $response->data = new MultiplayerGameDataRow($gameId, $gamerow['idUtente'], $gamerow['tipoPartita'], $gamerow['idUtenteGuest'], $gamerow['whoWon'], $gamerow['lineeCompletate'], $gamerow['malusP1'],$gamerow['malusP2']);
    }
    Unlock($gameId);
}

echo json_encode($response);
exit;