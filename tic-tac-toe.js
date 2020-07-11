window.addEventListener("DOMContentLoaded", event => {
    let board = document.getElementById("tic-tac-toe-board");
    let currentPlayer = "X";
    let currBoard = ["", "", "", "", "", "", "", "", ""];
    let gameState = null;
    let header = document.getElementById("game-status");
    let gameButton = document.getElementById("new-game");
    gameButton.disabled = true;
    let giveUp = document.getElementById("give-up");
    let compTurn = (Math.random()>.5);
    // check local storage for currentPlayer, currBoard, gameState
    // if they're in local storage, initialize values to the
    // values that are in local storage
    let state = localStorage.getItem("currentPlayer");
    if (state) {
        currentPlayer = localStorage.getItem("currentPlayer");
        currBoard = JSON.parse(localStorage.getItem("currBoard"));
        gameState = JSON.parse(localStorage.getItem("gameState"));
        compTurn = JSON.parse(localStorage.getItem("compTurn"));
    }

    let updateBoard = (currentPlayer, currBoard, gameState) => {
        // update each element based on what's in the internal board state
        currBoard.forEach( (el, ind) => {
            // getElementByID
            // id is gonna be "square-"
            let targSquare = document.getElementById(`square-${ind}`);
            if (targSquare.innerHTML === "") {
                let mark = document.createElement("img");
                if (el === "X") {
                    mark.setAttribute("src", "player-x.svg");
                    targSquare.appendChild(mark);
                } else if (el === "O"){
                    mark.setAttribute("src", "player-o.svg");
                    targSquare.appendChild(mark);
                }
            }
        })

        // if the game state is not null
        // update header to `Winner: ${gameState}`
        if (gameState) {
            header.innerHTML = `Winner: ${gameState}`;
            giveUp.disabled = true;
            gameButton.disabled = false;
        }
    }
    // call updateBoard as soon as page loads
    updateBoard(currentPlayer, currBoard, gameState);

    //  updateStorage that stores current game state variables into localStorage
    let updateStorage = (currentPlayer, currBoard, gameState, compTurn) => {
        localStorage.setItem("currentPlayer", currentPlayer);
        localStorage.setItem("currBoard", JSON.stringify(currBoard));
        localStorage.setItem("gameState", JSON.stringify(gameState));
        localStorage.setItem("compTurn", JSON.stringify(compTurn));
    }

    let checkForWin = (boardState, currPlayer) => {
        // check for all columns
        for (let i = 0; i < 9; i += 3) {
            if (boardState[i] !== "" &&
                boardState[i] === boardState[i+1] &&
                boardState[i] === boardState[i+2]) {
                return currPlayer;
            }
        }
        // check for all rows
        for (let i= 0; i < 3; i ++) {
            if (boardState[i] !== "" &&
                boardState[i] === boardState[i+3] &&
                boardState[i] === boardState[i+6]) {
                return currPlayer;
            }
        }
        // check for diag 1
        if (boardState[0] !== "" &&
            boardState[0] === boardState[4] &&
            boardState[0] === boardState[8]) {
            return currPlayer;
        }
        // check for diag 2
        if (boardState[2] !== "" &&
            boardState[2] === boardState[4] &&
            boardState[2] === boardState[6]) {
            return currPlayer;
        }
        // if all board squares are taken
        // return "None"
        let tie = boardState.reduce((acc, el) => {
            return acc && (el !== '');
        }, true)
        if (tie) {
            return 'none!'
        }
        // if none of the end states have been reached, return null
        return null;
    }


    let newGame = () => {
        // clear the boardState
        currBoard = ["", "", "", "", "", "", "", "", ""];
        // gameState to null
        gameState = null;
        // current player to X
        currentPlayer = 'X';
        // clear the header
        header.innerHTML = '';
        // reset computer turn
        compTurn = (Math.random()>.5);
        // disable newGame button
        gameButton.disabled = true;
        giveUp.disabled = false;
        localStorage.clear();
        return;
    }

    let computerTurn = (currentPlayer, currBoard, gameState) => {
        // get index of first empty element of currBoard
        if (!gameState) {
            // get an array that has the indices of all the empty string
            // elements in currBoard
            let empties = currBoard.map( (el, ind) => {
                if (el === "") return ind;
                else return null;
            }).filter((el) => (el!==null));
            // choose a random number >= 0, and < empties.length
            let randNum = Math.floor(Math.random()*empties.length);
            // set squareNum to the random element of available indices
            let squareNum = empties[randNum];

            // select square and turn it into an O
            currBoard[squareNum] = currentPlayer;
            // check for win
            gameState = checkForWin(currBoard, currentPlayer);
            // call updateBoard with internal state
            updateBoard(currentPlayer, currBoard, gameState);
            // update player after computer plays
            if (currentPlayer==='O') {
                currentPlayer = 'X';
            } else {
                currentPlayer = 'O';
            }
            compTurn = false;
            // and update storage to reflect the new player
            updateStorage(currentPlayer, currBoard, gameState, compTurn);
        }
        // return the new internal state
        return [currentPlayer, currBoard, gameState];
    }

    let humanTurn = (currentPlayer, currBoard, squareNum) => {
        // if the click took place on a square that corresponds with an
        // empty space in the internal state (currBoard)
        if (currBoard[squareNum] === "" ) {
            // update internal state
            currBoard[squareNum] = currentPlayer;
        }
        return currBoard;

    }

    // if it's the computer's turn, take the turn before
    if (compTurn) {
        [currentPlayer, currBoard, gameState] = computerTurn(currentPlayer,currBoard,gameState);
    }

    // listen for any click on the board element

    board.addEventListener("click", event => {
        let targSquare = event.target;
        let squareNum = Number(targSquare.id.replace("square-", ""));
        // if the game has ended, or if the target isn't a square
        // ignore the click
        if (gameState || !targSquare.classList.contains("square")) {
            return;
        }

        // if click is on a taken squre, ignore click
        if (currBoard[squareNum] !== "" ) return;

        // update internal state of board to reflect human turn
        currBoard = humanTurn(currentPlayer, currBoard, squareNum);

        // checks state of internal array to see if a win has occurred
        gameState = checkForWin(currBoard, currentPlayer);
        if(gameState) {
            // change header
            header.innerHTML = `Winner: ${gameState}`
            // enable newGame button
            gameButton.disabled = false;
            // disable give up button
            giveUp.disabled = true;
            // update local storage
            updateBoard(currentPlayer, currBoard, gameState);
            updateStorage(currentPlayer, currBoard, gameState, compTurn);

            return;
        }

        // update player - switch current player
        if (currentPlayer==='O') {
            currentPlayer = 'X';
        } else {
            currentPlayer = 'O';
        }
        updateBoard(currentPlayer, currBoard, gameState);
        updateStorage(currentPlayer, currBoard, gameState, compTurn);

        // computer plays a turn after human player
        [currentPlayer, currBoard, gameState] = computerTurn(currentPlayer, currBoard, gameState);
    })

    // listen for a click on the new-game button
    gameButton.addEventListener("click", (event) => {
        // reset game internal state
        newGame();
        // reset HTML so that the board is back to the beginning
        let squaresArray = [...board.children];
        squaresArray.forEach(el => {
            el.innerHTML = "";
        })
        // if it's the computer's turn, play!
        if (compTurn) {
            [currentPlayer, currBoard, gameState] = computerTurn(currentPlayer,currBoard,gameState);
        }

    })

    // listen for a click on the giveUp button
    giveUp.addEventListener("click", (event) => {
        // gameState should equal whoever is not the current player
        if (currentPlayer === "X") {
            currentPlayer = 'O';
        } else {
            currentPlayer = 'X';
        }
        // change gameState
        gameState = currentPlayer;
        // update header
        header.innerHTML = `Winner: ${currentPlayer}`;
        // disable giveUp button
        giveUp.disabled = true;
        // enable game button
        gameButton.disabled = false;
        //update storage
        updateStorage(currentPlayer, currBoard, gameState, compTurn);
    })
})
