//carica la lobby con le partite pvp aperte, aggiornandone periodicamente il contenuto
function Lobby(){
    this.timer = null;
    this.responseFunction = this.drawLobby.bind(this);
}

Lobby.prototype.getLobby = function(){
    var url ="./php/ajax/lobby.php";
    AjaxManager.performAjaxRequest("get",url, true, null,  this.responseFunction);
};

Lobby.prototype.drawLobby = function(response){
    var body = document.getElementById("body");
    var form = document.getElementById("form-container");
    var chart = document.getElementById("chart");
    if(chart != null)
        body.removeChild(chart);
    if(form == null) {
        form = document.createElement("section");
        form.setAttribute("id", "form-container");
        body.appendChild(form);
    }
    form.innerHTML = "";
    var game = document.getElementById("game-container");
    if(game != null)
        body.removeChild(game);
    var btn = createButtonInput("CREA UNA NUOVA PARTITA");
    btn.setAttribute("class","play-button");
    btn.dataset.mode = "2";
    btn.dataset.isGuest = "0";
    appendHomeButton(form);
    if(response.responseCode != 0){
        var p = document.createElement("p");
        p.appendChild(document.createTextNode(response.message));
        form.appendChild(p);
    }
    else{
        var table = document.createElement("table");
        var caption = document.createElement("caption");
        caption.appendChild(document.createTextNode("Partite disponibili"));
        table.appendChild(caption);
        var thead = document.createElement("thead");
        var headRow = document.createElement("tr");
        var headUsername = document.createElement("th");
        headUsername.appendChild(document.createTextNode("Username"));
        var headB = document.createElement("th");
        headB.appendChild(document.createTextNode("Gioca"));
        headRow.appendChild(headUsername);
        headRow.appendChild(headB);
        thead.appendChild(headRow);
        table.appendChild(thead);
        var username = null;
        var tr = null;
        var gameB = null;
        for(var i = 0; i < response.data.length; i++){
            tr = document.createElement("tr");
            username = document.createElement("td");
            username.appendChild(document.createTextNode(response.data[i].hostName));
            gameB = document.createElement("td");
            var b = createButtonInput("GIOCA");
            b.setAttribute("class","play-button");
            b.dataset.mode = "2";
            b.dataset.gameId = response.data[i].gameId;
            b.dataset.hostId = response.data[i].hostId;
            b.dataset.isGuest = "1";
            gameB.appendChild(b);
            tr.appendChild(username);
            tr.appendChild(gameB);
            table.appendChild(tr);
            form.appendChild(table);
        }
    }
    form.appendChild(btn);
    resetBlur();
    initializeButtons();
};

Lobby.prototype.setTimer = function(){
    this.timer = setInterval(this.getLobby.bind(this), 1000);
};

Lobby.prototype.resetTimer = function(){
    clearInterval(this.timer)
};