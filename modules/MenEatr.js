var LiveForm = require("./LiveForm");
var random = require("./random");

module.exports = class MenEatr extends LiveForm {
    constructor(x, y) {
        super(x, y);
        this.life = 10;
    }
    //թարմացնել շրջապատի կոորդինատները
    updateCoordinates() {
        this.directions = [
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

    //հետազոտում է շրջապատը, որոնում է հետաքրքրող կերպարներին
    //կերպարը որոշվում է character արգումենտով
    chooseCell(character) {
        this.updateCoordinates();

        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }



    //move() շարժվել
    move() {
        //որոնում է դատարկ տարածքներ
        var emptyCells = this.chooseCell(0);
        var cօord = random(emptyCells); // 4,3

        if (cօord) {
            var x = cօord[0];
            var y = cօord[1];

            //շարժվում է
            matrix[y][x] = 6;
            matrix[this.y][this.x] = 0;

            //նոր կորդինատներ է ստանում
            this.x = x;
            this.y = y;
        }
        else {
            var emptyCells = this.chooseCell(1);
            var cօord = random(emptyCells);
            if (cօord) {
                var x = cօord[0];
                var y = cօord[1];

                //շարժվում է
                matrix[y][x] = 6;
                matrix[this.y][this.x] = 1;



                //ջնջում է ինքն իրեն խոտակերների զանգվածից
                for (var i in grassArr) {
                    if (x == grassArr[i].x && y == grassArr[i].y) {
                        grassArr.splice(i, 1);
                    }
                }
                // var grass = new Grass(this.x, this.y);
                // grassArr.push(grass);

                //նոր կորդինատներ է ստանում
                this.x = x;
                this.y = y;
            }
        }
    }


    //eat()-ուտել
    eat() {
        //հետազոտում է շրջակայքը, որոնում է սնունդ
        var MenEatrCells = this.chooseCell(4);
        var coord = random(MenEatrCells);

        //եթե կա հարմար սնունդ
        if (coord) {
            var x = coord[0];
            var y = coord[1];

            //հիմնական մատրիցայում տեղափոխվում է կերած սննդի տեղը
            //իր հին տեղը դնում է դատարկ վանդակ
            matrix[y][x] = 6;
            matrix[this.y][this.x] = 0;

            //փոխում է սեփական կորդինատները օբյեկտի մեջ
            this.x = x;
            this.y = y;

            //բազմացման գործակիցը մեծացնում է
            this.multiply++;

            //մեծացնում է էներգիան
            this.energy++;


            //եթե պատրաստ է բազմացմանը, բազմանում է
            if (this.multiply == 10) {
                this.mul()
                this.multiply = 0;
            }
        } else {
            //եթե չկա հարմար սնունդ
            this.move();
            MenEatrHashiv++
            this.energy--;
            if (this.energy <= 0) { //մահանում է, եթե էներգիան 0֊ից ցածր է
                this.die();
            }
        }
    }

    //mul() բազմանալ
    mul() {
        //փնտրում է դատարկ տարածք
        var emptyCells = this.chooseCell(0);
        var coord = random(emptyCells);

        //եթե կա բազմանում է
        if (coord) {
            var x = coord[0];
            var y = coord[1];
            // this.multiply++;
            //ստեղծում է նոր օբյեկտ (այստեղ խոտակեր)
            //և տեղադրում է այն խոտակերների զանգվածի մեջ
            var newMenEatr = new MenEatr(x, y);
            MenEatrArr.push(newMenEatr);

            //հիմնական matrix-ում կատարում է գրառում նոր խոտի մասին
            matrix[y][x] = 6;
        }
    }

    //die() մահանալ
    die() {
        //Հիմնական մատրիցում իր դիրքում դնում է դատարկություն
        matrix[this.y][this.x] = 0;

        //ջնջում է ինքն իրեն խոտակերների զանգվածից
        for (var i in predatorArr) {
            if (this.x == MenEatrArr[i].x && this.y == MenEatrArr[i].y) {
                MenEatrArr.splice(i, 1);
            }
        }
    }
}

