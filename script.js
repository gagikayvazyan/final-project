//! Setup function fires automatically
function setup() {

    var socket = io();

    var side = 30;

    var matrix = [];

    //! Getting DOM objects (HTML elements)
    let grassCountElement = document.getElementById('grassCount');
    let grassEaterCountElement = document.getElementById('grassEaterCount');
    let PredatorCountElement = document.getElementById('PredatorCount');
    let MenCountElement = document.getElementById('MenCount');
    let MenEatrCountElement = document.getElementById('MenEatrCount');
    let exanak = document.getElementById('exanak');
    //! adding socket listener on "data" <-- name, after that fire 'drawCreatures' function 

    socket.on("data", drawCreatures);

    function drawCreatures(data) {
        //! after getting data pass it to matrix variable
        matrix = data.matrix;


        grassCountElement.innerText = data.grassCounter;
        grassEaterCountElement.innerText = data.grassEaterCounter;
        PredatorCountElement.innerText = data.PredatorCounter;
        MenEatrCountElement.innerText = data.MenEatrCounter;
        MenCountElement.innerText = data.MenCounter;
        exanak.innerText = data.exanakserver;
        //! Every time it creates new Canvas woth new matrix size
        createCanvas(matrix[0].length * side, matrix.length * side)
        //! clearing background by setting it to new grey color
        background('#acacac');
        //! Draw grassCount and grassEaterCount to HTML (use DOM objects to update information, yes, and use .innerText <- function)

        //! Drawing and coloring RECTs
        for (var i = 0; i < matrix.length; i++) {
            for (var j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j] == 1) {
                    if (data.exanakserver == "Spring") {
                        fill("#2DB312");
                    }
                    else if (data.exanakserver == "Summer") {
                        fill("#21870D");
                    } else if (data.exanakserver == "Autumnr") {
                        fill("#299C12");
                    }
                    else if (data.exanakserver == "Winter") {
                        fill("#35EB11");
                    }

                } else if (matrix[i][j] == 2) {
                    if (data.exanakserver == "Spring") {
                        fill("#DFE611");
                    }
                    else if (data.exanakserver == "Summer") {
                        fill("#CCD20F");
                    } else if (data.exanakserver == "Autumnr") {
                        fill("#DCE408");
                    }
                    else if (data.exanakserver == "Winter") {
                        fill("#F5FD03");
                    }
                } else if (matrix[i][j] == 3) {
                    if (data.exanakserver == "Spring") {
                        fill("#0850DD8");
                    }
                    else if (data.exanakserver == "Summer") {
                        fill("#6506B9");
                    } else if (data.exanakserver == "Autumnr") {
                        fill("#7A14D2");
                    }
                    else if (data.exanakserver == "Winter") {
                        fill("#8904FD");
                    }
                } else if (matrix[i][j] == 4) {
                    if (data.exanakserver == "Spring") {
                        fill("#F1EDED8");
                    }
                    else if (data.exanakserver == "Summer") {
                        fill("#E0DCEB");
                    } else if (data.exanakserver == "Autumnr") {
                        fill("#FBF8EF");
                    }
                    else if (data.exanakserver == "Winter") {
                        fill("#FFFFFF");
                    }
                } else if (matrix[i][j] == 5) {
                    if (data.exanakserver == "Spring") {
                        fill("#3B3232");
                    }
                    else if (data.exanakserver == "Summer") {
                        fill("#000000");
                    } else if (data.exanakserver == "Autumnr") {
                        fill("#181907");
                    }
                    else if (data.exanakserver == "Winter") {
                        fill("#494646");
                    }
                } else if (matrix[i][j] == 6) {
                    if (data.exanakserver == "Spring") {
                        fill("#C80707");
                    }
                    else if (data.exanakserver == "Summer") {
                        fill("#AB0707");
                    } else if (data.exanakserver == "Autumnr") {
                        fill("#DF0101");
                    }
                    else if (data.exanakserver == "Winter") {
                        fill("#F70808");
                    }
                } else if (matrix[i][j] == 0) {
                    fill("#acacac")
                }
                rect(j * side, i * side, side, side);
            }
        }
    }
}


/*function mousePressed(e) {
    var x = Math.floor(e.mouseX / side);
    var y = Math.floor(e.mouseY / side);
    var arr = [x, y];
    console.log(arr)
    socket.emit("fire", arr)
}

mousePressed()
*/


