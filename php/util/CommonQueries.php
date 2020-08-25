<?php
	require_once __DIR__ . "/../config.php";
    require_once DIR_UTIL . "dbManager.php"; //includes Database Class

    function getHighScore(){
        global $dbManager;
        $querytext = 'SELECT username, idPartita, tipoPartita, punteggio, lineeCompletate
                        FROM utente u JOIN partita p
                        ON u.idUtente = p.idUtente
                        WHERE tipoPartita < 2
                        ORDER BY punteggio DESC
                        LIMIT 15';
        $result = $dbManager->performQuery($querytext);
        $dbManager->closeConnection();
        return $result;
    }
    function getBestScore(){
        global $dbManager;
        $userid = $_SESSION['userId'];
        $querytext = 'SELECT punteggio 
                      FROM partita 
                      WHERE idUtente =\''. $userid .'\' '
                    .'ORDER BY punteggio DESC
                      LIMIT 1 ';
        $result = $dbManager->performQuery($querytext);
        $numRow = mysqli_num_rows($result);
        if ($numRow != 1)
            return -1;

        $userRow = $result->fetch_assoc();
        $dbManager->closeConnection();
        return $userRow['punteggio'];
    }
    function getLobby(){
        global $dbManager;
        $queryText = 'SELECT * 
                        FROM partita p INNER JOIN utente u ON p.idUtente = u.idUtente 
                        WHERE p.tipoPartita = 2 AND p.idUtenteGuest IS NULL 
                        AND p.whoWon IS NULL 
                        AND p.idUtente <> \'' . $_SESSION['userId'] . '\'';
        $result = $dbManager->performQuery($queryText);
        $dbManager->closeConnection();
        return $result;
    }

    function saveScore($gameId, $score, $lines){
        global $dbManager;
        $queryText = 'UPDATE partita SET punteggio = \'' . $score . '\', lineeCompletate = \'' . $lines .'\' WHERE idPartita = \'' . $gameId . '\'';
        return $dbManager->performQuery($queryText);
    }

    function createGame($mode){
        global $dbManager;
        $userid = $_SESSION['userId'];
        $queryText = 'INSERT INTO partita(idUtente, tipoPartita) VALUES(\'' .$userid .'\',\'' . $mode .'\')';
        $result = $dbManager->performQuery($queryText);
        if($result)
            $result = $dbManager->getLastId();
        $dbManager->closeConnection();
        return $result;
    }

    function getGame($gameId){
        global $dbManager;
        $queryText = 'SELECT * FROM partita WHERE idPartita = \'' . $gameId . '\';';
        $result = $dbManager->performQuery($queryText);
        $dbManager->closeConnection();
        return $result;
    }

    function joinGame($gameId){
        global $dbManager;
        $querytext = 'UPDATE partita SET idUtenteGuest = \'' . $_SESSION['userId'] . '\' WHERE idPartita = \'' . $gameId . '\';';
        $result = $dbManager->performQuery($querytext);
        $dbManager->closeConnection();
        return $result;
    }

    function updateGame($gameId, $isGuest, $lines){
        global $dbManager;
        $queryText = '';
        if($isGuest == 0)
            $queryText = 'UPDATE partita SET lineeCompletate = lineeCompletate + ' . $lines . ' WHERE idPartita = ' . $gameId . ';';
        else
            $queryText = 'UPDATE partita SET lineeCompletateP2 = lineeCompletateP2 + ' . $lines . ' WHERE idPartita = ' . $gameId . ';';
        $result = $dbManager->performQuery($queryText);
        $dbManager->closeConnection();
        return $result;
    }

    function iLost($gameId, $isGuest){
        global $dbManager;
        $queryText = '';
        if($isGuest == 0){
            $queryText = 'UPDATE partita SET whoWon = 2 WHERE idPartita = ' . $gameId . ';';
        }
        else
            $queryText = 'UPDATE partita SET whoWon = 1 WHERE idPartita = ' . $gameId . ';';
        $result = $dbManager->performQuery($queryText);
        return $result;
    }

    function resetMalus($gameId, $isGuest){
        global $dbManager;
        $queryText = '';
        if($isGuest == 0){
            $queryText = 'UPDATE partita SET malusP1 = 0 WHERE idPartita = ' . $gameId . ';';
        }
        else
            $queryText = 'UPDATE partita SET malusP2 = 0 WHERE idPartita = ' . $gameId . ';';
        $result = $dbManager->performQuery($queryText);
        return $result;
    }

    function setMalus($gameId, $isGuest){
        global $dbManager;
        $queryText = '';
        if($isGuest == 0){
            $queryText = 'UPDATE partita SET malusP2 = 1 WHERE idPartita = ' . $gameId . ';';
        }
        else
            $queryText = 'UPDATE partita SET malusP1 = 1 WHERE idPartita = ' . $gameId . ';';
        $result = $dbManager->performQuery($queryText);
        return $result;
    }


    function checkIfExists($username){
        global $dbManager;
        $username = $dbManager->sqlInjectionFilter($username);
        $queryText = 'select * from utente where username= \'' . $username . '\';';
        $result = $dbManager->performQuery($queryText);
        $numRow = mysqli_num_rows($result);
        $dbManager->closeConnection();
        return ($numRow > 0);
    }
//lock e unlock permettono di lavorare sulla riga in mutua esclusione
    function Lock($gameId){
        global $dbManager;
        $queryText = 'SELECT GET_LOCK(\'' . $gameId . '\',1);';
        $result = $dbManager->performQuery($queryText);
        $dbManager->closeConnection();
        return $result;
    }
    function Unlock($gameId){
        global $dbManager;
        $queryText = 'DO RELEASE_LOCK(\'' . $gameId . '\')';
        $result = $dbManager->performQuery($queryText);
        $dbManager->closeConnection();;
        return $result;
    }
?>