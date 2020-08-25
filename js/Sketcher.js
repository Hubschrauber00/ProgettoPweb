const scorefield_id = 'scorefield';
const playground_id = 'playground';
const nextpiece_id = "nextpiece";
const row_class = 'row';
const baseblock_class = "baseblock";
//gestisce il disegno dell'area di gioco
function Sketcher(){
    this.playground = document.getElementById(playground_id);
    this.scorefield = document.getElementById(scorefield_id);
    this.nextpiece = document.getElementById(nextpiece_id);
}

Sketcher.prototype.drawPlayground = function (gameArea){
    var backgroundArea = gameArea.backgroundArea;
    var height = gameArea.height;
    var width = gameArea.width;

    for( var i = 0; i < height; ++i){
        var row = this.playground.children[i];
        if(row == null){
            row = document.createElement("DIV");
            row.setAttribute("class","row");
            this.playground.appendChild(row);
            if(i <= 2){
                row.className += " firstrow";
            }
        }
        for(var j = 0; j < width; ++j){
            var cell = row.children[j];
            if(cell == null){
                cell = document.createElement("DIV");
                row.appendChild(cell);  
            }
            cell.className = baseblock_class + " " + pieces[backgroundArea[i][j]].color;
        }
    }
};
Sketcher.prototype.drawPiece = function(gameArea, current_x, current_y){
    var currentPiece = gameArea.piece;
    for( var i = 0; i < currentPiece.size; ++i){
        for( var j = 0 ; j < currentPiece.size; ++j){
            if(currentPiece.grid[j][i] > 0){
                this.playground.children[j+current_y].children[i+current_x].className = baseblock_class + " " + currentPiece.color;
            }
        }
    }
};

Sketcher.prototype.updatePlayerPosition = function(gameArea, old_x, old_y){
    var currentPiece = gameArea.piece;
    var backgroundArea = gameArea.backgroundArea;
    for( var i = 0; i < currentPiece.size; ++i){
        for(var j = 0; j < currentPiece.size; ++j){
            if(currentPiece.grid[j][i] > 0 ){
                if(backgroundArea[j + old_y][ i + old_x] === 0)
                    this.playground.children[j+old_y].children[i+old_x].className = baseblock_class;
            }
        }
    }
};

Sketcher.prototype.drawScore = function(score){
    this.scorefield.children[0].children[0].textContent = score.currentScore.toString();
    this.scorefield.children[1].children[0].textContent = score.bestScore.toString();
    this.scorefield.children[2].children[0].textContent = score.linesCleared.toString();
    this.scorefield.children[3].children[0].textContent = score.level.toString();
};
Sketcher.prototype.drawNextPiece = function(piece){
    for( var i = 0; i < 4; ++i){
        var row = this.nextpiece.children[i];
        if(row == null){
            row = document.createElement("DIV");
            row.setAttribute("class","row");
            this.nextpiece.appendChild(row);
        }
        for(var j = 0; j < 4; ++j){
            var cell = row.children[j];
            if(cell == null){
                cell = document.createElement("DIV");
                row.appendChild(cell);
            }
            cell.className = baseblock_class;
            if(i < piece.grid.length && j < piece.grid[i].length && piece.grid[i][j] > 0){
                cell.className += " " + piece.color;
            }
        }
    }
};

Sketcher.prototype.drawLoading = function(){
  var body = document.getElementById("body");
  var ls = document.createElement("div");
  ls.setAttribute("class", "lds-dual-ring");
  body.appendChild(ls);
};

Sketcher.prototype.removeLoader = function(){
    var body = document.getElementById("body");
    var ls = document.getElementsByClassName("lds-dual-ring")[0];
    body.removeChild(ls);
};