# Tic-Tac-Toe Project
Tic-Tac-Toe project for App Academy. Implementation by Juliet Shafto and Clayton Reinhardt. Project status: Complete! Computer chooses moves at random.

Original project [here](https://github.com/appacademy-starters/dom-api-tic-tac-toe).


Project requirements (there was no requirement 1):


## Requirement 2: Tracking Grid Clicks
- [x] For the "X" player, use the image found at https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/player-x.svg.
- [x] For the "O" player, use the image found at https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/player-o.svg.
- [x] When the player clicks an empty square, then it is filled with that player's symbol.
- [x] When the player clicks a square that already contains a symbol, the game does nothing.
- [x] The first click results in an "X". After that, the symbols "O" and "X" alternate with each click per the rules of tic-tac-toe.

## Requirement 3: Determining Game Status
- [x] If a player has any three in a row, then that player wins.
- [x] If a player has any three in a column, then that player wins.
- [x] If a player has either of the diagonals, then that player wins.
- [x] If there is no win and all squares have a player symbol in there, then the game is a tie.
- [x] When the game begins, the header at the top should have no text in it.
- [x] When a player wins the game, then the following happens:
    - [x] The header at the top should read "Winner: X" or "Winner: Y" depending on which player won.
    - [x] Empty squares in the grid no longer react to clicks

## Requirement 4: Creating A New Game
- [x] When the game status is not "won" or "tied", then the "New Game" button is disabled.
- [x] When the game status is "won" or "tied", then the "New Game" button is enabled.
- When a player clicks the "New Game" button, then it
    - [x] clears the game status,
    - [x] clears the header,
    - [x] clears the board, and
    - [x] makes it so the next click of the tic-tac-toe board is an "X"
    - [x] disables the "New Game" button

## Requirement 5: Giving Up
- When a player clicks the "Give Up" button:
    - [x] Set the status of the game as "won" by the "other" player. That is, if "X" is the current player, when that player clicks the "Give Up" button, then "O" wins the game.
    - [x] Show the winner status as won by the "other" player.
    - [x] Disable the "Give Up" button.
    - [x] Enable the "New Game" button.
- When a game is ongoing:
    - [x] Enable the 'Give Up" button.

## Requirement 6: Saving Game State
- [x] If someone refreshes the screen, the game state will be restored when the page shows back up.

## Bonus Requirement: Make The Computer Play
- [x] When you click "New Game", randomly assign the computer as Player X or Player O. Then, have the computer play automatically in response to its turn.
    - [x] If you click "New Game" and the computer becomes Player X, then it will play an "X" on the board. Then, you will play an "O". After you click your square, the computer will automatically play its "X". And, so on.
    - [x] If the computer is Player O, then it will play after you play your first "X".
