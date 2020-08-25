const FIELDHEIGHT = 24;
const FIELDWIDTH = 10;
//classe modello dell'area di gioco
function GameArea(){ 
    this.backgroundArea = initializeMatrix(FIELDHEIGHT, FIELDWIDTH);
    this.height = FIELDHEIGHT;
    this.width = FIELDWIDTH;
    this.piece = null;
    this.nextPiece = null;
}
//restituisce le coordinate degli estremi del tetramino
GameArea.prototype.getActualPos = function(grid){
    var actualPos = { right: 0, down: 0, left: grid.length };
    for( var i = 0; i < grid.length; ++i){
        for( var j = 0; j < grid[i].length; ++j){
            if( grid[i][j] > 0 && j < actualPos.left ){
                actualPos.left = j;
            }
            if( grid[i][j] > 0 && j > actualPos.right ){
                actualPos.right = j;
            }
            if( grid[i][j] > 0 && i > actualPos.down ){
                actualPos.down = i;
            }
        }
    }
    return actualPos;
};

//predice il risultato dello spostamento e restituisce un numero maggiore di zero
//se tale spostamento genera una collisione
GameArea.prototype.checkCollision = function (direction, currentPos, rotation){
    var collision = 0;
    var actualPos = this.getActualPos(this.piece.grid);
    switch(direction){
        case "left":
        {
            for( var i = 0; i < this.piece.size; ++i )
                for( var j = 0; j < this.piece.size; ++j ){
                    collision += this.piece.grid[i][j] > 0
                        && this.backgroundArea[currentPos.y + i][currentPos.x + j - 1] > 0;
                }
            collision += (actualPos.left + currentPos.x <= 0);
            break;
        }
        case "right":
        {
            for( var i = 0; i < this.piece.size; ++i){
                for( var j = 0; j < this.piece.size; ++j){

                    collision += this.piece.grid[i][j] > 0
                        && this.backgroundArea[currentPos.y + i][ currentPos.x + j + 1] > 0;
                }
            }
            collision += (actualPos.right + currentPos.x >= FIELDWIDTH - 1);
            break;
        }

        case "down":
        {
            collision += (actualPos.down + currentPos.y >= FIELDHEIGHT-1);
            if(collision === 0){
                for( var i = 0; i < this.piece.size; ++i){
                    for( var j = 0; j < this.piece.size; ++j){
                        collision += this.piece.grid[i][j] > 0
                            && this.backgroundArea[currentPos.y + i + 1][currentPos.x + j] > 0;
                    }
                }
            }
            break;
        }
        case "rotate":
        {
            var future = new Piece(this.piece);
            future.rotate(rotation);
            var futureActualPos = this.getActualPos(future.grid);
            collision += (futureActualPos.left + currentPos.x < 0 )
                || (futureActualPos.right + currentPos.x > FIELDWIDTH - 1)
                || (futureActualPos.down + currentPos.y > FIELDHEIGHT -1 );
            if(collision === 0){
                for(var i = 0; i < future.grid.length; i++){
                    for(var j = 0; j < future.grid[i].length; j++){
                        if(future.grid[i][j] > 0 && this.backgroundArea[currentPos.y + i][currentPos.x + j] > 0)
                            collision++;
                    }
                }
            }
            break;

        }
    }


    return collision;
};
//unisce il tetramino attivo con l'area di gioco
// richiamata a seguito di una collisione e prima della generazione di un nuovo tetramino
GameArea.prototype.mergeArea = function(currentPos){
    var currentPiece = this.piece;
    var backgroundArea = this.backgroundArea;
    for( var i = 0; i < currentPiece.grid.length; ++i){
        for( var j = 0; j <  currentPiece.grid.length; ++j){
            if(currentPiece.grid[i][j] > 0 ){
                backgroundArea[currentPos.y + i][currentPos.x + j] = currentPiece.grid[i][j];
            }
        }
    }
};
//rimuove le linee piene
GameArea.prototype.clearFullLines = function(){
    for( var i = 1; i < this.height; ++i){
        if(!this.backgroundArea[i].includes(0)){
            for(var j = i; j > 0; j--){
                this.backgroundArea[j] = this.backgroundArea[j-1].slice();
            }
        }
    }
};
//controlla se le condizioni di fine del gioco siano verificate
GameArea.prototype.isGameOver = function(currentPos){
    return currentPos.x === START_X
        && currentPos.y === START_Y
        & this.checkCollision("down", currentPos) > 0 ||
        this.backgroundArea[0].reduce(function (sum, val) {
            return sum + val
        }) > 0 ||
        this.backgroundArea[1].reduce(function (sum, val) {
            return sum + val
        }) > 0 ||
        this.backgroundArea[2].reduce(function (sum, val) {
            return sum + val
        }) > 0 ;
};

//utilizzata solo nelle modalità difficile e pvp
//genera una nuova linea con uno spazio vuoto alla base dell'area di gioco
GameArea.prototype.generateNewLine = function(){
  var newLine = new Array(this.width);
  for(var i = 0; i < newLine.length; i++){
    newLine[i] = Math.floor(Math.random()*7+1);
  }
  newLine[Math.floor(Math.random()*newLine.length)] = 0;
  for(var i = 0; i < this.backgroundArea.length-1; i++){
      this.backgroundArea[i] = this.backgroundArea[i + 1];
  }
  this.backgroundArea[this.backgroundArea.length - 1] = newLine;
};

