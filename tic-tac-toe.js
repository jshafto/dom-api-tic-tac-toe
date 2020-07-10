window.addEventListener("DOMContentLoaded", event => {
    let board = document.getElementById("tic-tac-toe-board");
    let currentPlayer = "X";
    // make array
    let currBoard = ["", "", "", "", "", "", "", "", ""];


    let checkForWin =  (boardState, currPlayer) => {
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
    let gameState = null;
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
            console.log(`Winner: ${gameState}`);
            return;
        }

        // update player
        if (currentPlayer==='O') {
            currentPlayer = 'X';
        } else {
            currentPlayer = 'O';
        }

    })











})
