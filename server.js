//! SERVER STUFF  --  START
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);
//! SERVER STUFF END  --  END

//! Requiring modules  --  START
GrassEater = require("./modules/GrassEater");
Predator = require("./modules/predator");
Grass = require('./modules/Grass')
Men = require("./modules/men");
MenEatr = require("./modules/MenEatr");
random = require('./modules/random');
Mah = require('./modules/mah');
//! Requiring modules  --  END

//! Setting global arrays  --  START
grassArr = [];
grassEaterArr = [];
PredatorArr = [];
MenArr = [];
mahArr = [];
matrix = [];
MenEatrArr = []
grassHashiv = 0;
grassEaterHashiv = 0;
PredatorHashiv = 0;
MenHashiv = 0;
MenEatrHashiv = 0;
weather = "Springr";
weatherinit = 0;

//! Setting global arrays  -- END


//exanak sarqox code
function ExanakSarqox() {
    weatherinit++;
    if (weatherinit == 5) {
        weatherinit = 0
    }
    else if (weatherinit == 1) {
        weather = "Spring";
    } else if (weatherinit == 2) {
        weather = "Summer";
    } else if (weatherinit == 3) {
        weather = "Autumnr";
    } else if (weatherinit == 4) {
        weather = "Winter";
    }
}
//! Creating MATRIX -- START
function matrixGenerator(matrixSize, grass, grassEater, predator, MenArg, MahArg, MenEaterArg) {
    for (let i = 0; i < matrixSize; i++) {
        matrix[i] = [];
        for (let o = 0; o < matrixSize; o++) {
            matrix[i][o] = 0;
        }
    }
    for (let i = 0; i < grass; i++) {
        let customX = Math.floor(random(matrixSize)); // 0-9
        let customY = Math.floor(random(matrixSize)); // 4
        matrix[customY][customX] = 1;
    }
    for (let i = 0; i < grassEater; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 2;
    }

    for (let i = 0; i < predator; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 3;
    }
    for (let i = 0; i < MenArg; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 4;
    }
    for (let i = 0; i < MahArg; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 5;
    }
    for (let i = 0; i < MenEaterArg; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 6;
    }
}
matrixGenerator(15, 15, 8, 10, 8, 2, 6);
//! Creating MATRIX -- END

function creatingObjects() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                var grass = new Grass(x, y);
                grassArr.push(grass);
                grassHashiv++;
            } else if (matrix[y][x] == 2) {
                var grassEater = new GrassEater(x, y);
                grassEaterArr.push(grassEater);
                grassEaterHashiv++;
            } else if (matrix[y][x] == 3) {
                var predator = new Predator(x, y);
                PredatorArr.push(predator);
                PredatorHashiv++;
            } else if (matrix[y][x] == 4) {
                var men = new Men(x, y);
                MenArr.push(men);
                MenHashiv++;
            } else if (matrix[y][x] == 5) {
                var mah = new Mah(x, y);
                mahArr.push(mah);
            } else if (matrix[y][x] == 6) {
                var menEatr = new MenEatr(x, y);
                MenEatrArr.push(menEatr);
                MenEatrHashiv++;
            }
        }
    }
}
creatingObjects();

function game() {
    if (grassArr[0] !== undefined) {
        for (var i in grassArr) {
            grassArr[i].mul();
        }
    }
    if (grassEaterArr[0] !== undefined) {
        for (var i in grassEaterArr) {
            grassEaterArr[i].eat();
        }
    }
    if (PredatorArr[0] !== undefined) {
        for (var i in PredatorArr) {
            PredatorArr[i].eat();
        }
    }
    if (MenArr[0] !== undefined) {
        for (var i in MenArr) {
            MenArr[i].eat();
        }

    }
    if (MenEatrArr[0] !== undefined) {
        for (var i in MenEatrArr) {
            MenEatrArr[i].eat();
        }
    }
    if (mahArr[0] !== undefined) {
        for (var i in mahArr) {
            mahArr[i].go();
        }
    }
    //! Object to send
    let sendData = {
        matrix: matrix,
        grassCounter: grassHashiv,
        grassEaterCounter: grassEaterHashiv,
        PredatorCounter: PredatorHashiv,
        MenCounter: MenHashiv,
        MenEatrCounter: MenEatrHashiv,
        exanakserver: weather
    }

    //! Send data over the socket to clients who listens "data"
    io.sockets.emit("data", sendData);
}

setInterval(game, 500)
setInterval(ExanakSarqox, 3000);

/*io.on("connection", function (socket) {
    socket.on("fire", function (arr) {
        var x = arr[0]
        var y = arr[1]
        var directions = [
            [x - 1, y - 1],
            [x, y - 1],
            [x + 1, y - 1],
            [x - 1, y],
            [x + 1, y],
            [x - 1, y + 1],
            [x, y + 1],
            [x + 1, y + 1],

        ];
        if (matrix[y][x] == 1) {
            for (var i in grassArr) {
                if (y === grassArr[i].y && x === grassArr[i].x) {
                    grassArr.splice(i, 1)
                    break;
                }
            }
        } else if (matrix[y][x] == 2) {
            for (var i in grassEaterArr) {
                if (y === grassEaterArr[i].y && x === grassEaterArr[i].x) {
                    grassEaterArr.splice(i, 1)
                    break;
                }
            }
        } else if (matrix[y][x] == 3) {
            for (var i in PredatorArr) {
                if (y === PredatorArr[i].y && x === PredatorArr[i].x) {
                    PredatorArr.splice(i, 1)
                    break;
                }
            }
        } else if (matrix[y][x] == 4) {
            for (var i in MenArr) {
                if (y === MenArr[i].y && x === MenArr[i].x) {
                    MenArr.splice(i, 1)
                    break;
                }
            }
        } else if (matrix[y][x] == 6) {
            for (var i in MenEatrArr) {
                if (y === MenEatrArr[i].y && x === MenEatrArr[i].x) {
                    MenArr.splice(i, 1)
                    break;
                }
            }
        }

        matrix[y][x] = 0;

        for (var i in directions) {
            let harevanX = directions[i][0];
            let harevanY = directions[i][1];

            if (matrix[harevanY][harevanX] == 1) {
                for (var i in grassArr) {
                    if (harevanY === grassArr[i].y && harevanX === grassArr[i].x) {
                        grassArr.splice(i, 1)
                        break;
                    }
                }
            } else if (matrix[harevanY][harevanX] == 2) {
                for (var i in grassEaterArr) {
                    if (harevanY === grassEaterArr[i].y && harevanX === grassEaterArr[i].x) {
                        grassEaterArr.splice(i, 1)
                        break;
                    }
                }
            } else if (matrix[harevanY][harevanX] == 3) {
                for (var i in PredatorArr) {
                    if (harevanY === PredatorArr[i].y && harevanX === PredatorArr[i].x) {
                        PredatorArr.splice(i, 1)
                        break;
                    }
                }
            } else if (matrix[harevanY][harevanX] == 4) {
                for (var i in MenArr) {
                    if (harevanY === MenArr[i].y && harevanX === MenArr[i].x) {
                        MenArr.splice(i, 1)
                        break;
                    }
                }
            } else if (matrix[harevanY][harevanX] == 6) {
                for (var i in MenEatrArr) {
                    if (harevanY === MenEatrArr[i].y && harevanX === MenEatrArr[i].x) {
                        MenArr.splice(i, 1)
                        break;
                    }
                }
            }
            matrix[harevanY][harevanX] = 0;

        }
    })
})*/
