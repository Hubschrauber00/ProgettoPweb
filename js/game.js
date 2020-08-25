const START_X = 3;
const START_Y = 0;
const GRAVITY = [48,43,38,33,28,23,18,13,8,6,5,5,5,4,4,4,3,3,3,2,2,2,2,2,2,2,2,2,1];
var gameMode = 0;
var lobby = new Lobby();
//controller del gioco
function Game(playground, hostId, gameId, isGuest) {
    this.playground = playground;
    this.gameId = gameId;
    this.hostId = hostId;
    this.guestId = null;
    this.isGuest = parseInt(isGuest);
    this.mode = gameMode;
    this.gameArea = new GameArea();
    this.sketcher = new Sketcher();
    this.currentPos = {x: START_X, y: START_Y};
    this.keypressBinded = this.keypress.bind(this);
    document.addEventListener('keydown', this.keypressBinded, false);
    this.sketcher.drawPlayground(this.gameArea);
    this.linesCleared = 0;
    this.level = 0;
    this.intervalBase = 10;
    this.intervalCounter = 0;
    this.intervalScale = Math.floor(GRAVITY[this.level] * 1.667);
    this.handicapCounter = 0;
    this.handicapThreshold = 1000;
    this.score = new Score();
    this.score.getBestScore(this.updateBestScore.bind(this));
    this.unloadHandlerBinded = this.unloadHandler.bind(this);

    if(this.gameId == null)
        this.createGame();
    else{
        this.joinGame();
    }
    if(this.mode < 2)
        this.start();
    else{
        if(this.isGuest !== 1){
            setBlur();
            this.sketcher.drawLoading();
            this.timer = setInterval(this.checkGameStatus.bind(this, this.isGuestReady.bind(this)), 1000);
        }
        window.addEventListener('beforeunload', this.unloadHandlerBinded, false);
    }
}
//inizializza il gioco
Game.prototype.start = function(){
    this.newPiece();
    this.timer = setInterval(this.onInterval.bind(this), this.intervalBase);
};
//contatta il server per generare una nuova partita
Game.prototype.createGame = function(){
    AjaxManager.performAjaxRequest("POST",
        "./php/createGame.php",
        true,
        JSON.stringify({mode: gameMode}),
        this.gameCreationHandler.bind(this))
};
//setta gli id partita e giocatore ricevuti dal server
Game.prototype.gameCreationHandler = function(response){
    if(response.responseCode == 0){
        this.gameId = response.data.gameId;
        this.hostId = response.data.hostId;
    }
};
//verifica se un giocatore si è unito alla partita creata in modalità multiplayer
Game.prototype.isGuestReady = function(response){
    if(response.responseCode == 0 && response.data.guestId != null){
        this.guestId = response.data.guestId;
        clearInterval(this.timer);
        this.newPiece();
        this.timer = setInterval(this.onInterval.bind(this), this.intervalBase);
        this.sketcher.removeLoader();
        resetBlur();

    }
};
//richiamata periodicamente per controllare se l'altro giocatore abia vinto o perso
Game.prototype.checkGameStatus = function(callback){
  AjaxManager.performAjaxRequest("POST",
      "./php/checkGameStatus.php",
      true,
      JSON.stringify({"gameId": this.gameId, "isGuest":this.isGuest}),
      callback.bind(this));
};
//contatta il server richiedendo di unirsi ad una partita creata da un altro utente
Game.prototype.joinGame = function(){
  AjaxManager.performAjaxRequest("POST",
      "./php/joinGame.php",
      true,
      JSON.stringify({"gameId":this.gameId }),
      this.gameJoined.bind(this));
};
//se è possibile partecipare alla partita scelta avvia il gioco, altrimenti riporta alla schermata di lobby
Game.prototype.gameJoined = function(response){
  if(response.responseCode == 0){
      this.guestId = response.data;
      this.start();
  }
  else{
      lobby.getLobby();
      lobby.setTimer();
  }
};
//fa sì che il gioco faccia aumentare le righe non complete dell'avversario
Game.prototype.sendMalus = function(){
  AjaxManager.performAjaxRequest("POST",
      "./php/setMalus.php",
      true,
      JSON.stringify({"gameId":this.gameId, "isGuest":this.isGuest}),
      this.gameStatusHandler.bind(this));
};
//comunica al server che il giocatore ha perso la partita
Game.prototype.sendLost = function(){
    AjaxManager.performAjaxRequest("POST",
        "./php/setLost.php", true,
        JSON.stringify({"gameId": this.gameId, "isGuest":this.isGuest}),
        this.gameStatusHandler.bind(this) );
};

//gestisce la comunicazione col server durante la partita
//se verifica che l'altro giocatore ha completato almeno una linea aumenta il malus
//se invece verifica che uno dei giocatori ha perso carica il popup che annuncia la vittoria/sconfitta
Game.prototype.gameStatusHandler = function(response){
    if(response.responseCode == 0){
        if(this.isGuest === 1 && response.data.malusP2 == 1)
            this.gameArea.generateNewLine();
        if(this.isGuest === 0 && response.data.malusP1 == 1)
            this.gameArea.generateNewLine();
        this.sketcher.drawPlayground(this.gameArea);
        this.sketcher.drawPiece(this.gameArea, this.currentPos.x, this.currentPos.y);
        if(response.data.whoWon != null){
            this.stopGame();
            setBlur();
            this.end(response.data.whoWon);
        }
    }
};

//gestisce la pressione dei tasti durante il gioco
Game.prototype.keypress = function(e){
    e = (!e) ? window.event:e;
    var code = (e.which != null) ? e.which : e.keyCode;
    switch(code){
        case 32:
            //spazio
            do
                this.movePiece("down");
            while(this.gameArea.checkCollision("down", this.currentPos, null) === 0 );
            break;
        case 37:
            //freccia sx
            this.movePiece("left");
            break;
        case 38:
            //freccia su
            this.rotate("clockwise");
            break;
        case 39:
            //freccia dx
            this.movePiece("right");
            break;
        case 40:
            //freccia giu
            this.movePiece("down");
            break;
        case 17:
            this.rotate("counterclockwise");
            break;
     /*   case 83:
            //tasto s
            clearInterval(this.timer);
            break;
        case 76:
            //tasto l
            this.gameArea.logMatrix(this.gameArea.backgroundArea);
            break;*/
    }

    this.sketcher.drawPiece(this.gameArea, this.currentPos.x, this.currentPos.y);
};

//conseguente alla pressione del tasto, sposta il tetramino attivo nella direzione scelta
Game.prototype.movePiece = function(direction){
    var old_x = this.currentPos.x;
    var old_y = this.currentPos.y;
    var createNewPiece = false;
    switch(direction){
        case "left":
            if( this.gameArea.checkCollision(direction, this.currentPos, null) === 0 )
                this.currentPos.x = this.currentPos.x-1;
            break;
        case "right":
            if( this.gameArea.checkCollision(direction, this.currentPos, null) === 0 )
                this.currentPos.x = this.currentPos.x + 1;
            break;
        case "down":
            if( this.gameArea.checkCollision(direction, this.currentPos, null) === 0 ){
                    this.currentPos.y = this.currentPos.y + 1;
                }
            else{
                this.mergePiece();
                createNewPiece = true;
            }
            break;
    }
    this.sketcher.updatePlayerPosition(this.gameArea, old_x, old_y);
    if(createNewPiece)
        this.newPiece();
};

//richiamata all'inizio del gioco e dopo ogni nuova collisione
//genera un nuovo tetramino attivo in maniera casuale
//lancia un dado, se il risultato è uguale al precedente oppure se esce 0 lo lancia di nuovo
//se verifica che il gioco è finito lo termina e salva il risultato
Game.prototype.newPiece = function(){
    var piecenumber = getRandomNumber();
    while(piecenumber === 0 )
        piecenumber = getRandomNumber();
    if(this.gameArea.piece == null && this.gameArea.piece == null){
       this.gameArea.piece = new Piece(pieces[piecenumber]);
    }
    else
        this.gameArea.piece =this.gameArea.nextPiece;
    do{
        piecenumber = getRandomNumber();
        if(piecenumber > 0) {
            this.gameArea.nextPiece = new Piece(pieces[piecenumber]);
        }
    }
    while(piecenumber === 0 || this.gameArea.nextPiece.name === this.gameArea.piece.name);
    this.currentPos.x = START_X;
    this.currentPos.y = START_Y;
    if(this.gameArea.isGameOver(this.currentPos)){
        if(this.mode === 2)
            this.sendLost();
        else{
            this.stopGame();
            this.score.saveScore(this.end.bind(this), this.gameId);
        }
    }
    this.sketcher.drawPiece(this.gameArea, this.currentPos.x, this.currentPos.y);
    this.sketcher.drawNextPiece(this.gameArea.nextPiece);
};

//ruota il tetramino, se la rotazione genera una collisione
// ma a fianco del tetramino c'è abbastanza posto lo sposta di una casella ( due per il tetramino I)
// ed effettua la rotazione
Game.prototype.rotate = function(direction){
    if(this.gameArea.piece.name === 'o')
        return;
    this.sketcher.updatePlayerPosition(this.gameArea, this.currentPos.x, this.currentPos.y);
    if(this.gameArea.checkCollision("rotate", this.currentPos, direction) === 0)
        this.gameArea.piece.rotate(direction);
    else{
        //wallkick
        var futurePos = {
            x: this.currentPos.x,
            y: this.currentPos.y
        };
        var kick = (this.gameArea.piece.size === 4 && this.gameArea.piece.grid[0][2] > 0) ? 2:1;
        futurePos.x += kick;
        if(this.gameArea.checkCollision("rotate", futurePos, direction) === 0){
            this.currentPos.x += kick;
            this.gameArea.piece.rotate(direction);
        }
        else{
            kick = (this.gameArea.piece.size === 4 && this.gameArea.piece.grid[0][1] > 0) ? 2:1;
            futurePos.x = this.currentPos.x - kick;
            if(this.gameArea.checkCollision("rotate", futurePos, direction) === 0){
                this.currentPos.x -= kick;
                this.gameArea.piece.rotate(direction);
            }
        }
    }
};
//richiamata in seguito ad una collisione col basso, fonde il tetramino attivo con lo sfondo e aggiorna il punteggio
Game.prototype.mergePiece = function(){
    this.gameArea.mergeArea(this.currentPos);
    var lines = this.score.checkScore(this.gameArea);
    this.sketcher.drawScore(this.score);
    if( lines > 0)
        this.updateLevel();
    if(this.mode === 2 && lines > 0)
        this.sendMalus();
    this.gameArea.clearFullLines();
    this.sketcher.drawPlayground(this.gameArea);
};
//l'intervallo base di aggiornamento è di 10 ms
//se è attiva la modalità difficile genera una nuova linea ogni 10 secondi
//la velocità di spostamento dipende dal livello attuale
//come nella versione PAL del gioco originale la velocità di spostamento è un multiplo di 1/60esimo di secondo
Game.prototype.onInterval = function (){
    this.intervalCounter++;
    if(this.mode === 1){
        this.handicapCounter++;
        if(this.handicapCounter >= this.handicapThreshold){
            this.gameArea.generateNewLine();
            this.sketcher.drawPlayground(this.gameArea);
            this.sketcher.drawPiece(this.gameArea, this.currentPos.x, this.currentPos.y);
            this.handicapCounter = 0;
        }
    }
    if(this.intervalCounter >= this.intervalScale) {
        this.movePiece("down");
        this.sketcher.drawPiece(this.gameArea, this.currentPos.x, this.currentPos.y);
        this.intervalCounter = 0;

        if(this.mode === 2){
            this.checkGameStatus(this.gameStatusHandler);
        }
    }

};
//aggiorna il livello di gioco
Game.prototype.updateLevel = function(){
   if(this.score.level < GRAVITY.length-1) {
        this.intervalCounter = 0;
        this.intervalScale = Math.floor(GRAVITY[this.score.level]*1.667);
    }
};

//setta il miglior punteggio a fianco dell'area di gioco
Game.prototype.updateBestScore = function(response){
    if(parseInt(response.responseCode) === 0){
        this.score.setBestScore(parseInt(response.data));
    }
    else{
        this.score.setBestScore(0);
    }
    this.sketcher.drawScore(this.score);
};
//interrompe il gioco
Game.prototype.stopGame = function(){
    clearInterval(this.timer);
    document.removeEventListener('keydown', this.keypressBinded, false);
    if(this.mode === 2)
        window.removeEventListener('beforeunload', this.unloadHandlerBinded, false);
};
//richiamato una volta terminato il gioco, presentando la tabella dei punteggi o il vincitore nella modalità pvp
//e l'interfaccia necessaria ad avviare una nuova partita
Game.prototype.end = function(whoWon){
    var chart = document.createElement("div");
    chart.setAttribute("id","chart");
    var body = document.getElementById("body");
    body.appendChild(chart);
    setBlur();
    if(this.mode < 2){
        var chart = new Chart(this.gameId, this.score.currentScore);
        chart.requestChart(gameMode);
    }
    else{
        var h1 = document.createElement("h1");
        if(whoWon == 1 && this.isGuest === 0 ||whoWon == 2 && this.isGuest == 1)
            h1.appendChild(document.createTextNode("hai vinto"));
        else
            h1.appendChild(document.createTextNode("hai perso"));
        chart.appendChild(h1);
        var btn = createButtonInput("TORNA ALLA LOBBY");
        btn.setAttribute("class","play-button");
        btn.dataset.mode = "2";
        chart.appendChild(btn);
        initializeButtons();
    }
};


var game = null;
//lega gli input ai rispettivi handler
function initializeButtons(){
    var playbutton = document.getElementsByClassName("play-button");
    for(var i = 0; i < playbutton.length; i++){
        playbutton[i].addEventListener('click', buttonListener, false);
    }
}

function buttonListener(e){
    e = e || window.event;
    var target = e.target;
    gameMode = parseInt(target.dataset.mode);
    var hostId = target.dataset.hostId;
    var gameId = target.dataset.gameId;
    var isGuest = target.dataset.isGuest;
    if(gameMode === 2 && isGuest == null){
        lobby.getLobby();
        lobby.setTimer();
    }
    else{
        lobby.resetTimer();
        prepareGame(hostId, gameId, isGuest);
    }
}
//prepara l'area di gioco
function prepareGame(hostId, gameId, isGuest){
    var body = document.getElementById("body");
    var form = document.getElementById("form-container");
    var chart = document.getElementById("chart");
    if(form != null)
        body.removeChild(form);
    if(chart != null)
        body.removeChild(chart);
    var gamecontainer = document.getElementById("game-container");
    var playground = document.getElementById(playground_id);
    if(gamecontainer == null){
        gamecontainer = document.createElement("div");
        gamecontainer.setAttribute("id","game-container");
        body.appendChild(gamecontainer);
        playground = document.createElement("div");
        playground.setAttribute("id",playground_id);
        gamecontainer.appendChild(playground);
        var sidecontainer = document.createElement("div");
        sidecontainer.setAttribute("id","side-container");

        var scorefield = document.createElement("div");
        scorefield.setAttribute("id","scorefield");
        var currentscore = document.createElement("span");
        currentscore.setAttribute("id","current-score");
        var bestscore = document.createElement("span");
        bestscore.setAttribute("id", "best-score");
        var linescore = document.createElement("span");
        linescore.setAttribute("id","lines-score");
        var levelscore = document.createElement("span");
        levelscore.setAttribute("id","level-score");

        var div = document.createElement("div");
        div.appendChild(document.createTextNode("punteggio attuale: "));
        div.appendChild(currentscore);
        scorefield.appendChild(div);
        div = document.createElement("div");
        div.appendChild(document.createTextNode("miglior punteggio: "));
        div.appendChild(bestscore);
        scorefield.appendChild(div);
        div = document.createElement("div");
        div.appendChild(document.createTextNode("linee: "));
        div.appendChild(linescore);
        scorefield.appendChild(div);
        div = document.createElement("div");
        div.appendChild(document.createTextNode("livello: "));
        div.appendChild(levelscore);
        scorefield.appendChild(div);
        sidecontainer.appendChild(scorefield);

        var nextpiece = document.createElement("div");
        nextpiece.setAttribute("id","nextpiece");
        sidecontainer.appendChild(nextpiece);
        gamecontainer.appendChild(sidecontainer);
    }
    resetBlur();
    game = new Game(playground, hostId, gameId, isGuest);
}
//gestisce la chiusura della pagina durante la modalità pvp
Game.prototype.unloadHandler = function(){
  this.sendLost();
};

window.onload = initializeButtons;
