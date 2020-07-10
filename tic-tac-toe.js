window.addEventListener("DOMContentLoaded", event => {
    let board = document.getElementById("tic-tac-toe-board");
    let currentPlayer = "X";
    let currBoard = ["", "", "", "", "", "", "", "", ""];
    let gameState = null;
    // check local storage for currentPlayer, currBoard, gameState
    // if they're in local storage, initialize values to the
    // values that are in local storage
    let state = localStorage.getItem("currentPlayer");
    if (state) {
        currentPlayer = localStorage.getItem("currentPlayer");
        currBoard = JSON.parse(localStorage.getItem("currBoard"));
        gameState = JSON.parse(localStorage.getItem("gameState"));
    }

    //

    // everytime we update internal game state (which includes
    // currBoard, gameState, and currentPlayer), we also need to
    // update local storage
    // let internalState = [
    //     currentPlayer,
    //     currBoard,
    //     gameState
    //     // update localstorage to have these new values
    // ]
    let updateStorage = (currentPlayer, currBoard, gameState) {
        localStorage.setItem("currentPlayer", currentPlayer);
        localStorage.setItem("currBoard", JSON.stringify(currBoard));
        localStorage.setItem("gameState", JSON.stringify(gameState));
    }

    // write a function updateStorage that stores current game state
    // variables into localStorage



    // make array
    let header = document.getElementById("game-status");
    let gameButton = document.getElementById("new-game");
    gameButton.disabled = true;
    let giveUp = document.getElementById("give-up");

    let checkForWin = (boardState, currPlayer) => {
        // check for all columns
        for (let i = 0; i < 9; i += 3) {
            if (boardState[i] !== "" &&
                boardState[i] === boardState[i+1] &&
                boardState[i] === boardState[i+2]) {
                return currentPlayer;
            }

        }
        // check for all rows
        for (let i= 0; i < 3; i ++) {
            if (boardState[i] !== "" &&
                boardState[i] === boardState[i+3] &&
                boardState[i] === boardState[i+6]) {
                return currentPlayer;
            }
        }
        // check for diag 1
        if (boardState[0] !== "" &&
            boardState[0] === boardState[4] &&
            boardState[0] === boardState[8]) {
            return currentPlayer;
        }
        // check for diag 2
        if (boardState[2] !== "" &&
            boardState[2] === boardState[4] &&
            boardState[2] === boardState[6]) {
            return currentPlayer;
        }
        // if all board squares are taken
        // return "None"
        let tie = boardState.reduce((acc, el) => {
            return acc && (el !== '');
        }, true)
        if (tie) {
            return 'none!'
        }
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
        // disable newGame button
        gameButton.disabled = true;
        giveUp.disabled = false;
        return;
        localStorage.clear();
    }


    // listen for any click on the board element

    board.addEventListener("click", event => {
        let targSquare = event.target;
        let squareNum = Number(targSquare.id.replace("square-", ""));
        if (gameState) {
            return;
        }
        // if the click is on an empty stare
        if (targSquare.classList.contains("square") && !targSquare.classList.contains("taken")) {
            currBoard[squareNum] = currentPlayer;
            let mark = document.createElement("img");
            // console.log(squareNum);
            // console.log(currBoard);
            if (currentPlayer === "X") {
                mark.setAttribute("src", "player-x.svg");
                targSquare.appendChild(mark);
                // currentPlayer = 'O';
                // change internal array
            } else {
                mark.setAttribute("src", "player-o.svg");
                targSquare.appendChild(mark);
                // currentPlayer = 'X';

                // change internal array
            }
            targSquare.classList.add("taken");
        }

        // checks state of internal array to see if a win has occurred
        gameState = checkForWin(currBoard, currentPlayer);
        if(gameState) {
            // make H1 equal to `Winner: ${gameState}`

            header.innerHTML = `Winner: ${gameState}`
            // enable newGame button
            gameButton.disabled = false;
            giveUp.disabled = true;
            return;
        }

        // update player
        if (currentPlayer==='O') {
            currentPlayer = 'X';
        } else {
            currentPlayer = 'O';
        }

    })

    // listen for a click on the new-game button
    gameButton.addEventListener("click", (event) => {
        // reset game internal state
        newGame();
        // reset HTML so that the board is back to the beginning
        let squaresArray = [...board.children];
        squaresArray.forEach(el => {
            // console.log(el);
            el.classList.remove("taken");
            el.innerHTML = "";
        })

    })
    giveUp.addEventListener("click", (event) => {

        // gameState it should equal whoever is not the current player
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


    })





})
