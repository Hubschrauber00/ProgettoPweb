<?php

class AjaxResponse{
    public $responseCode; // 0 all ok - 1 some errors - -1 some warning
    public $message;
    public $data;

    function AjaxResponse($responseCode = 1,
    $message = "Something went wrong! Please try later.",
    $data = null){
        $this->responseCode = $responseCode;
        $this->message = $message;
        $this->data = null;
    }
}

class Score{
    public $username;
    public $gameId;
    public $points;
    public $lines;
    public $mode;
    function Score($username, $gameId,$points, $lines, $mode){
        $this->username = $username;
        $this->gameId = $gameId;
        $this->points = $points;
        $this->lines = $lines;
        $this->mode = $mode;
    }
}

class HostedGame{
    public $gameId;
    public $hostName;
    public $hostId;
    function HostedGame($gameId, $hostName, $hostId){
        $this->gameId = $gameId;
        $this->hostName = $hostName;
        $this->hostId = $hostId;
    }
}

class MultiplayerGameDataRow{
    public $gameId;
    public $hostId;
    public $gameMode;
    public $linesP1;
    public $guestId;
    public $whoWon;
    public $malusP1;
    public $malusP2;
    function MultiplayerGameDataRow($gameId, $hostId, $gameMode, $guestId, $whoWon, $linesP1, $malusP1, $malusP2){
        $this->gameId= $gameId;
        $this->hostId = $hostId;
        $this->gameMode = $gameMode;
        $this->guestId = $guestId;
        $this->whoWon = $whoWon;
        $this->linesP1 = $linesP1;
        $this->malusP1 = $malusP1;
        $this->malusP2 = $malusP2;
    }
}