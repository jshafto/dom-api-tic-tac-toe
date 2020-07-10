window.addEventListener("DOMContentLoaded", event => {
    let board = document.getElementById("tic-tac-toe-board");
    let currentPlayer = "X";
    let currBoard = ["", "", "", "", "", "", "", "", ""];
    let gameState = null;
    let header = document.getElementById("game-status");
    let gameButton = document.getElementById("new-game");
    gameButton.disabled = true;
    let giveUp = document.getElementById("give-up");
    // check local storage for currentPlayer, currBoard, gameState
    // if they're in local storage, initialize values to the
    // values that are in local storage
    let state = localStorage.getItem("currentPlayer");
    if (state) {
        currentPlayer = localStorage.getItem("currentPlayer");
        currBoard = JSON.parse(localStorage.getItem("currBoard"));
        gameState = JSON.parse(localStorage.getItem("gameState"));
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
    let updateStorage = (currentPlayer, currBoard, gameState) => {
        localStorage.setItem("currentPlayer", currentPlayer);
        localStorage.setItem("currBoard", JSON.stringify(currBoard));
        localStorage.setItem("gameState", JSON.stringify(gameState));
    }

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
            console.log(currentPlayer, currBoard, gameState);
            // check for win
            gameState = checkForWin(currBoard, currentPlayer);
            // call updateBoard with internal state
            updateBoard(currentPlayer, currBoard, gameState);
            // call updateStorage
            updateStorage(currentPlayer, currBoard, gameState);
            if (gameState) {
                // make H1 equal to `Winner: ${gameState}`

                header.innerHTML = `Winner: ${gameState}`
                // enable newGame button
                gameButton.disabled = false;
                giveUp.disabled = true;
                updateStorage(currentPlayer, currBoard, gameState);
                return;
            }
        }
    }


    // listen for any click on the board element

    board.addEventListener("click", event => {
        let targSquare = event.target;
        let squareNum = Number(targSquare.id.replace("square-", ""));
        // if the game has ended, ignore the click
        if (gameState) {
            return;
        }
        // if the click took place on a square that corresponds with an
        // empty space in the internal state (currBoard)
            // update internal state
        if (targSquare.classList.contains("square") && (currBoard[squareNum]==="")) {
            currBoard[squareNum] = currentPlayer;
            // call function that updates DOM based on internal state
            updateBoard(currentPlayer, currBoard, gameState);
        }



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
            updateStorage(currentPlayer, currBoard, gameState);
            return;

        }

        // update player - switch current player
        if (currentPlayer==='O') {
            currentPlayer = 'X';
        } else {
            currentPlayer = 'O';
        }
        updateStorage(currentPlayer, currBoard, gameState);

        // computer plays a turn after human player
        computerTurn(currentPlayer, currBoard, gameState);


        // update player again after computer plays
        if (currentPlayer==='O') {
            currentPlayer = 'X';
        } else {
            currentPlayer = 'O';
        }
        // and update storage to reflect the new player
        updateStorage(currentPlayer, currBoard, gameState);

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
        updateStorage(currentPlayer, currBoard, gameState);
    })
})
