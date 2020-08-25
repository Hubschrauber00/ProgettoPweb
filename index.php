<?php
require_once __DIR__ . "/php/config.php";
include DIR_UTIL . "sessionUtil.php";
session_start();
?>
<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="utf-8">
    <meta name="author" content="Arfaioli">
    <meta name="robots" content="noindex">
    <meta name="keywords" content="game">
    <link id="page_favicon" href="./img/favicon.ico" rel="icon" type="image/x-icon">
    <title>Tetris!</title>
    <link rel="stylesheet" type="text/css" href="css/layout.css">
    <link rel="stylesheet" type="text/css" href="css/game.css">
    <script src="./js/ajax/ajaxManager.js"></script>
    <script src="./js/ajax/loginPage.js"></script>
    <script src="./js/ajax/chart.js"></script>
    <script src="./js/ajax/lobby.js"></script>
    <script src="./js/piece.js"></script>
    <script src="./js/score.js"></script>
    <script src="./js/utils.js"></script>
    <script src="./js/gameArea.js"></script>
    <script src="./js/Sketcher.js"></script>
    <script src="./js/game.js"></script>
</head>
<body>
<?php
    include DIR_LAYOUT . "header.php";
?>
<div class="blur"></div>
<div id="body">
<div id="form-container">
    <?php
    if(!isLogged()) echo'
    <form name="login" method="post" action="./php/login.php" onsubmit="return sendForm(event);">

        <label for="username">Username
            <input type="text" id="username" maxlength="32" 
                    pattern="[a-zA-Z0-9]+" placeholder="Username" name="username" required autofocus >
        </label>

        <label for="password">Password
            <input type="password" id="password" maxlength="32" pattern="[a-zA-Z0-9]+" placeholder="Password" name="password" required
            oninvalid="this.setCustomValidity(\'Inserisci una password. Sono ammessi solo caratteri alfanumerici.\')"
                    oninput="this.setCustomValidity(\'\')">
        </label>
        <input type="submit" value="login">
        </form>
         <div id="register-link"><p>Non sei ancora registrato?<a href="javascript:void(0);" onclick="loadRegisterForm()">&nbsp;crea un nuovo account</a></p></div>
        ';
     else
         echo '<p>Benvenuto '. $_SESSION['username'] . ', seleziona la modalità di gioco</p>
        <input type="button" class="play-button" data-mode="0" value="CLASSICA">
        <input type="button" class="play-button" data-mode="1" value="DIFFICILE">
        <input type="button" class="play-button" data-mode="2" value="MULTIPLAYER">
         <p>effettua il <a href="./php/logout.php">logout</a></p>
         <p>oppure <a href="./php/delete.php">cancella il tuo account</a></p>
         ';
     ?>
</div>
</div>
<?php
    include DIR_LAYOUT . "footer.php";
?>
</body>
</html>
