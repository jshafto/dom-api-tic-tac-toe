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
        // right now we're changing one image based on what
        // the latest click was

        // instead we should update all squares with a for loop
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
    //
    updateBoard(currentPlayer, currBoard, gameState);
    // everytime we update internal game state (which includes
    // currBoard, gameState, and currentPlayer), we also need to
    // update local storage
    // let internalState = [
    //     currentPlayer,
    //     currBoard,
    //     gameState
    //     // update localstorage to have these new values
    // ]

    // write a function updateStorage that stores current game state
    // variables into localStorage
    let updateStorage = (currentPlayer, currBoard, gameState) => {
        localStorage.setItem("currentPlayer", currentPlayer);
        localStorage.setItem("currBoard", JSON.stringify(currBoard));
        localStorage.setItem("gameState", JSON.stringify(gameState));
    }

    //Use updateStorage function whenever we update internal state



    // make array

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
        localStorage.clear();
        return;
    }

    let computerTurn = (currentPlayer, currBoard, gameState) => {
        // get index of first empty element of currBoard

        //console.log(currentPlayer);
        if (!gameState) {
            //let squareNum = currBoard.indexOf("");
            // get an array that has the indices of all the empty string
            // elements in currBoard
            // choose a random number >= 0, and < empties.length
            // let squareNum = empties.[randomNum];
            let empties = currBoard.map( (el, ind) => {
                if (el === "") return ind;
                else return null;
            }).filter((el) => (el!==null));
            let randNum = Math.floor(Math.random()*empties.length);
            console.log(empties);
            let squareNum = empties[randNum];
            currBoard[squareNum] = currentPlayer;
            console.log(currentPlayer, currBoard, gameState);
            updateBoard(currentPlayer, currBoard, gameState);
            updateStorage(currentPlayer, currBoard, gameState);
            // select next square and turn it into an O
            // call updateBoard with internal state
            // call updateStorage
            //
            gameState = checkForWin(currBoard, currentPlayer);
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
        if (gameState) {

            return;
        }

        // if the click took place on a square that corresponds with an
        // empty space in the internal state (currBoard)
            // update internal state
        if (targSquare.classList.contains("square") && (currBoard[squareNum]==="")) {
            currBoard[squareNum] = currentPlayer;
            // call function that updates DOM based on internal state
                // move code from if statements below to own function
            updateBoard(currentPlayer, currBoard, gameState);
            // update local storage with updateStorage function
        }



        // checks state of internal array to see if a win has occurred
        gameState = checkForWin(currBoard, currentPlayer);
        if(gameState) {
            // make H1 equal to `Winner: ${gameState}`

            header.innerHTML = `Winner: ${gameState}`
            // enable newGame button
            gameButton.disabled = false;
            giveUp.disabled = true;
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
        computerTurn(currentPlayer, currBoard, gameState);
        // update player - switch current player
        if (currentPlayer==='O') {
            currentPlayer = 'X';
        } else {
            currentPlayer = 'O';
        }
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

        updateStorage(currentPlayer, currBoard, gameState);


    })





})
