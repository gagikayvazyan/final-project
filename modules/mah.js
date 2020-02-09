var LiveForm = require("./LiveForm");
var random = require("./random.js");



module.exports = class Mah extends LiveForm {
    constructor(x, y) {
        super(x, y);
        this.life = 10;
        this.multyplay = 0;
    }
    getNewDirections() {
        this.directions = [
            [this.x - 2, this.y - 2],
            [this.x - 2, this.y - 1],
            [this.x - 2, this.y],
            [this.x - 2, this.y + 1],
            [this.x - 2, this.y + 2],
            [this.x - 1, this.y - 2],
            [this.x, this.y - 2],
            [this.x + 1, this.y - 2],
            [this.x + 2, this.y - 2],
            [this.x + 2, this.y - 1],
            [this.x + 2, this.y],
            [this.x + 2, this.y + 1],
            [this.x + 2, this.y + 2],
            [this.x + 1, this.y + 2],
            [this.x, this.y + 2],
            [this.x - 1, this.y + 2],
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell() {
        this.getNewDirections();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                found.push(this.directions[i]);
            }
        }
        return found;
    }
    go() {

        this.multyplay++;
        this.getNewDirections();
        if (this.multyplay % 2 == 0) {
            var emptyCells = this.chooseCell();
            var coord = random(emptyCells);
            if (coord) {
                matrix[coord[1]][coord[0]] = 5;
                matrix[this.y][this.x] = 0;

                this.x = coord[0];
                this.y = coord[1];
                this.getNewDirections();
                var cells = /*this.chooseCell();*/this.directions;
                for (var i in cells) {
                    var x = cells[i][0];
                    var y = cells[i][1];
                    if(x>=0 && x<matrix.length && y >=0 && y<matrix.length){
                    if (matrix[y][x] == 1) {
                        for (var i in grassArr) {
                            if (x == grassArr[i].x && y == grassArr[i].y) {
                                grassArr.splice(i, 1);
                                break;
                            }
                        }
                    }
                    if (matrix[y][x] == 2) {
                        for (var i in grassEaterArr) {
                            if (x == grassEaterArr[i].x && y == grassEaterArr[i].y) {
                                grassEaterArr.splice(i, 1);
                                break;
                            }
                        }
                    }
                    if (matrix[y][x] == 3) {
                        for (var i in PredatorArr) {
                            if (x == PredatorArr[i].x && y == PredatorArr[i].y) {
                                PredatorArr.splice(i, 1);
                                break;
                            }
                        }
                    }
                    if (matrix[y][x] == 4) {
                        for (var i in MenArr) {
                            if (x == MenArr[i].x && y == MenArr[i].y) {
                                MenArr.splice(i, 1);
                                break;
                            }
                        }
                    }
                    if (matrix[y][x] == 6) {
                        for (var i in MenEatrArr) {
                            if (x == MenEatrArr[i].x && y == MenEatrArr[i].y) {
                                MenEatrArr.splice(i, 1);
                                break;
                                }
                            }
                        }
                    matrix[y][x] = 0;
                    }
                }
            }
        }
    }
}


