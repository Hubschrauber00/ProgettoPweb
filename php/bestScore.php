<?php
require_once __DIR__ . "/config.php";
require_once DIR_UTIL . "sessionUtil.php";
require_once DIR_UTIL . "CommonQueries.php";
require_once DIR_AJAX_UTIL . "AjaxResponse.php";

session_start();

$score = getBestScore();
$response = new AjaxResponse();
if ($score < 0){
    $response->responseCode = 1;
    $response->message = $_SESSION["username"] . " non ha nessun best score";
}
else{
        $response->responseCode = 0;
        $response->data = $score;
        $response->message = "ok";
 }
echo json_encode($response);