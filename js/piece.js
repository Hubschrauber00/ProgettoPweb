function Piece(p){
    this.name = p.name;
    this.grid = copyMatrix(p.grid);
    this.size = p.size;
    this.color = p.color;
}
Piece.prototype.rotate = function(direction){
    var newGrid = new Array(this.grid.length);

    for( var i = 0; i < this.grid.length; ++i){
        newGrid[i] = new Array(this.grid.length);
        for( var j = 0; j < this.grid.length; ++j){
            if(direction == "clockwise"){
                newGrid[i][j] = this.grid[this.grid.length -1 -j][i];
            }
            else{
                newGrid[i][j]= this.grid[j][this.grid.length -1 -i];
            }
        }
    }
    this.grid = newGrid;
};
const pieces = [
    {
      name:'b',
      grid:[],
      size:0,
      color:""
    },
    {
        name: 'i',
        grid: [[0,0,0,0],[1,1,1,1],[0,0,0,0],[0,0,0,0]],
        size: 4,
        color: "lightblue"
    },
    {
        name: 'j',
        grid: [[0,0,0],[2,2,2],[0,0,2]],
        size:3,
        color: "blue"
    },
    {
        name: 't',
        grid : [[0,0,0],[3,3,3],[0,3,0]],
        size: 3,
        color: "purple"
    },
    {
        name: 'l',
        grid: [[0,0,0],[4,4,4],[4,0,0]],
        size: 3,
        color: "orange"
    },
    {
        name: 'z',
        grid: [[0,0,0],[5,5,0],[0,5,5]],
        size: 3,
        color: "red"
    },
    {
        name: 's',
        grid:[[0,0,0],[0,6,6],[6,6,0]],
        size: 3,
        color: "green"
    },
    {
        name: 'o',
        grid: [[0,0,0,0],[0,7,7,0],[0,7,7,0],[0,0,0,0]],
        size: 3,
        color: "yellow"
    }
];
