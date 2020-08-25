const factor = [40,100,300,1200];
//gestisce il punteggio
function Score(){
    this.currentScore = 0;
    this.bestScore = 0;
    this.linesCleared = 0;
    this.level = 0;
}
//aggiorna il punteggio
Score.prototype.checkScore = function(gameArea){
    var lineScore = 0;
    var lines = 0;
    for( var i = 0; i < gameArea.height; ++i){
        for( var j = 0; j < gameArea.width; ++j){
            if(gameArea.backgroundArea[i][j] > 0 )
                lineScore++;
        }
        if( lineScore === 10 ){
            lines++;
        }
        lineScore = 0;
    }
       this.linesCleared += lines;
    if(lines > 0){
        this.currentScore += factor[lines-1]*(this.level+1);
        if(this.linesCleared >= this.level*10+10)
            this.level++;
    }
    return lines;
};
Score.prototype.setBestScore = function(best){
    this.bestScore = best;
};
//carica il miglior punteggio
Score.prototype.getBestScore = function(callback){
    AjaxManager.performAjaxRequest("GET", "./php/bestScore.php",true, null, callback );
};
//salva il punteggio attuale
Score.prototype.saveScore = function(callback, gameId){
    AjaxManager.performAjaxRequest("POST", "./php/saveScore.php", true, JSON.stringify({"score":this.currentScore, "lines" : this.linesCleared, "gameId": gameId}), callback);
};