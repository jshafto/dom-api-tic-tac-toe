# Tic-Tac-Toe Project

## Requirement 3: Determining Game Status
- [x] If a player has any three in a row, then that player wins.
- [x] If a player has any three in a column, then that player wins.
- [x] If a player has either of the diagonals, then that player wins.
- [ ] If there is no win and all squares have a player symbol in there, then the game is a tie.
- [x] When the game begins, the header at the top should have no text in it.
- [ ] When a player wins the game, then the following happens:
    - [ ] The header at the top should read "Winner: X" or "Winner: Y" depending on which player won.
    - [ ] Empty squares in the grid no longer react to clicks

## Requirement 4: Creating A New Game
- [ ] When the game status is not "won" or "tied", then the "New Game" button is disabled.
- [ ] When the game status is "won" or "tied", then the "New Game" button is enabled.
- When a player clicks the "New Game" button, then it
    - [ ] clears the game status,
    - [ ] clears the header,
    - [ ] clears the board, and
    - [ ] makes it so the next click of the tic-tac-toe board is an "X"
    - [ ] disables the "New Game" button

## Requirement 5: Giving Up
- When a player clicks the "Give Up" button:
    - [ ] Set the status of the game as "won" by the "other" player. That is, if "X" is the current player, when that player clicks the "Give Up" button, then "O" wins the game.
    - [ ] Show the winner status as won by the "other" player.
    - [ ] Disable the "Give Up" button.
    - [ ] Enable the "New Game" button.
- When a game is ongoing:
    - [ ] Enable the 'Give Up" button.

## Requirement 6: Saving Game State
- [ ] If someone refreshes the screen, the game state will be restored when the page shows back up.

## Bonus Requirement: Make The Computer Play
- [ ] When you click "New Game", randomly assign the computer as Player X or Player O. Then, have the computer play automatically in response to its turn.
    - For example, if you click "New Game" and the computer becomes Player X, then it will play an "X" on the board. Then, you will play an "O". After you click your square, the computer will automatically play its "X". And, so on.
    - If the computer is Player O, then it will play after you play your first "X".
