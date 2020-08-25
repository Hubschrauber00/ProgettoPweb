<?php
require_once __DIR__ . "/../config.php";
require_once DIR_UTIL . "sessionUtil.php";
require_once DIR_UTIL . "CommonQueries.php";
require_once DIR_AJAX_UTIL ."AjaxResponse.php";

session_start();
$response = new AjaxResponse();
$result = getLobby();
if (checkEmptyResult($result)){
    $response = setEmptyResponse();
    echo json_encode($response);
    return;
}


$message = "OK";
$response = setResponse($result, $message);
echo json_encode($response);
return;

function checkEmptyResult($result){
    if ($result === null || !$result)
        return true;

    return ($result->num_rows <= 0);
}
function setEmptyResponse(){
    $message = "No results";
    return new AjaxResponse("1", $message);
}
function setResponse($result, $message){
    $response = new AjaxResponse("0", $message);
    $index = 0;
    while ($row = $result->fetch_assoc()){
        $gameStat = new HostedGame($row["idPartita"], $row["username"], $row["idUtente"]);
        $response->data[$index] = $gameStat;
        $index++;
    }
    return $response;
}