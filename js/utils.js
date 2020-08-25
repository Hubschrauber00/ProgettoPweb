function getRandomNumber(){
    return Math.floor(Math.random()*8);
}
function initializeMatrix(height, width){
    var matrix = new Array(height);
    for( var i = 0; i < height; ++i){
        matrix[i] = new Array(width);
        for(var j = 0; j < width; ++j){
            matrix[i][j] = 0;
        }
    }
    return matrix;
}

function copyMatrix(matrix){
    var newM = new Array(matrix.length);
    for( var i = 0; i < newM.length; ++i)
        newM[i] = matrix[i].slice();
    return newM;
}

function setBlur(){
    var blur = document.getElementsByClassName("blur")[0];
    if(blur != null)
        blur.style.display= "block";
}
function resetBlur(){
    var blur = document.getElementsByClassName("blur")[0];
    if(blur != null)
        blur.style.display = "none";
}