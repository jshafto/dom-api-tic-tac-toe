window.addEventListener("DOMContentLoaded", event => {
    let board = document.getElementById("tic-tac-toe-board");
    let currentPlayer = "X";
    // make array
    let currBoard = ["r1", "r2", "r3", "m1", "m2", "m3", "b1", "b2", "b3"];


    let checkForWin =  (boardState) => {

        for (let i = 0; i < 9; i += 3) {
            if (boardState[i] === boardState[i+1] &&
                boardState[i] === boardState[i+2]) {
                return true;
            }

        }
        for (let i= 0; i < 3; i ++) {
            if (boardState[i] === boardState[i+3] &&
                boardState[i] === boardState[i+6]) {
                return true;
            }
        }
        if (boardState[0] === boardState[4] &&
            boardState[0] === boardState[8]) {
            return true;
        }
        if (boardState[2] === boardState[4] &&
            boardState[2] === boardState[6]) {
            return true;
        }
    }

    board.addEventListener("click", event => {
        let targSquare = event.target;



        if (targSquare.classList.contains("square") && !targSquare.classList.contains("taken")) {
            let mark = document.createElement("img");
            let squareNum = Number(targSquare.id.replace("square-", ""));
            currBoard[squareNum] = currentPlayer;
            console.log(squareNum);
            console.log(currBoard);
            if (currentPlayer === "X") {
                mark.setAttribute("src", "player-x.svg");
                targSquare.appendChild(mark);
                currentPlayer = 'O';
                // change internal array
            } else {
                mark.setAttribute("src", "player-o.svg");
                targSquare.appendChild(mark);
                currentPlayer = 'X';

                // change internal array
           }
           targSquare.classList.add("taken");
        }
        // checks state of internal array to see if a win has occurred
        if (checkForWin(currBoard)) {
            console.log("WIN");
        }
    })











})
