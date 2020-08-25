//gestisce la classifica dei migliori quindici punteggi
function Chart(gameId, score){
    this.score = score;
    this.gameId = gameId;
}
Chart.prototype.requestChart = function(){
    var url ="./php/ajax/highScoreChart.php";
    AjaxManager.performAjaxRequest("POST",url, true, null, this.drawChart.bind(this))
};
Chart.prototype.drawChart = function(response){
    var chartElement = document.getElementById("chart");
    var h1 = document.createElement("h1");
    h1.appendChild(document.createTextNode("Punteggio finale: " + this.score.toString()));
    chartElement.appendChild(h1);
    if(parseInt(response.responseCode) !== 0){
        var p = document.createElement("p");
        p.appendChild(document.createTextNode(response.message));
        chartElement.appendChild(p);
    }
    else{
        var table = document.createElement("table");
        var caption = document.createElement("caption");
        caption.appendChild(document.createTextNode("Classifica globale"));
        table.appendChild(caption);
        var thead = document.createElement("thead");
        var headRow = document.createElement("tr");
        var headUsername = document.createElement("th");
        headUsername.appendChild(document.createTextNode("Username"));
        var headScore = document.createElement("th");
        headScore.appendChild(document.createTextNode("Punteggio"));
        var headLines = document.createElement("th");
        headLines.appendChild(document.createTextNode("Linee Completate"));
        var headMode = document.createElement("th");
        headMode.appendChild(document.createTextNode("Modalità"));
        headRow.appendChild(headUsername);
        headRow.appendChild(headScore);
        headRow.appendChild(headLines);
        headRow.appendChild(headMode);
        thead.appendChild(headRow);
        table.appendChild(thead);
        var username = null;
        var score = null;
        var lines = null;
        var row = null;
        var mode = null;
        for(var i = 0; i < response.data.length; ++i){
            row = document.createElement("tr");
            username = document.createElement("td");
            username.appendChild(document.createTextNode(response.data[i].username));
            score = document.createElement("td");
            score.appendChild(document.createTextNode(response.data[i].points));
            lines = document.createElement("td");
            lines.appendChild(document.createTextNode(response.data[i].lines));
            mode = document.createElement("td");
            mode.appendChild(document.createTextNode( response.data[i].mode == 0 ? "classica":"difficile"));
            row.appendChild(username);
            row.appendChild(score);
            row.appendChild(lines);
            row.appendChild(mode);
            if(this.gameId == response.data[i].gameId)
                row.setAttribute("class","bold");
            table.appendChild(row);
        }
        chartElement.appendChild(table);
        var button = createButtonInput("PLAY AGAIN");
        button.setAttribute("class","play-button");
        button.dataset.mode = gameMode;
        chartElement.appendChild(button);
        initializeButtons();
        appendLink(chartElement, "effettua il ", "logout", "./php/logout.php");
        appendLink(chartElement, "oppure ", "cancella il tuo account", "./php/delete.php");
    }
};

