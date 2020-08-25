<?php
require_once __DIR__ . "/config.php";
require_once  DIR_UTIL . "/dbManager.php";
session_start();
$userid = $_SESSION['userId'];
global $dbManager;
$queryText = "delete from utente where idUtente ='" . $userid . "';";
$dbManager->performQuery($queryText);
$dbManager->closeConnection();
session_destroy();
header("Location: ./../index.php");
exit;
