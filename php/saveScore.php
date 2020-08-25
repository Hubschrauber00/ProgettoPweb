<?php
require_once __DIR__ . "/config.php";
require_once DIR_UTIL . "sessionUtil.php";
require_once DIR_UTIL . "CommonQueries.php";
require_once DIR_AJAX_UTIL . "AjaxResponse.php";

session_start();
$data = json_decode(file_get_contents('php://input'), true);

$score = $data['score'];
$lines = $data['lines'];
$gameId = $data['gameId'];
$response = new AjaxResponse();
$result = saveScore($gameId,$score, $lines);
if (!$result){
    $response->responseCode = 1;
    $response->message = "salvataggio non riuscito";
}
else{
    $response->responseCode = 0;
    $response->message = "ok";
}
echo json_encode($response);