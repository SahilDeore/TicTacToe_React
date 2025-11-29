/*

This method first counts the number of free squares and then 
randomly selects one of the free squares and updates it with the new value

*/
export function easyMove(currSquares, value) {
    let freeSquares = 0;
    for (let i = 0; i < currSquares.length; i++) {
        if (currSquares[i] == null) {
            freeSquares++;
        }
    }
    let moveSquare = Math.floor(Math.random() * freeSquares);
    freeSquares = 0;
    for (let i = 0; i < currSquares.length; i++) {
        if (currSquares[i] == null) {
            if (freeSquares == moveSquare) {
                currSquares[i] = value;
            }
            freeSquares++;
        }
    }
     console.log("Random");
}

/**

This method will check that if there are any possible moves that will give an immediate win
or an immediate loss. It will prioritize the winning move. If no winning move is present, 
it will go for the defending the immediate loss. If no such moves are present it will call
the easyMove function.

 */

export function mediumMove(currSquares, value) {
    let winningMove = false;
    let criticalMove = false;
    let movePlace = null;

    for(let i = 0; i < lines.length; i++) {
        const currLine = lines[i];

        
        const lineStatusCurrentPlayer = isReadyLine(currSquares,currLine,value);

        const lineStatusOpponentPlayer = isReadyLine(currSquares,currLine,value && value=="X"?"O":"X");

        if(lineStatusCurrentPlayer != null) {
            movePlace = lineStatusCurrentPlayer;
            winningMove = true;
            continue;
        }
        else if(lineStatusOpponentPlayer != null && !winningMove){
            movePlace = lineStatusOpponentPlayer;
            criticalMove = true;
            continue;
        }
    }


    if(!winningMove && !criticalMove) {
        easyMove(currSquares, value);
        return;
    }

    currSquares[movePlace] = value;
}

function isReadyLine(currSquares,currLine, value) {
    if (currSquares[currLine[0]] == value && currSquares[currLine[1]] == value && currSquares[currLine[2]] == null) {
        return currLine[2];
    }
    else if (currSquares[currLine[0]] == value && currSquares[currLine[2]] == value && currSquares[currLine[1]] == null) {
        return currLine[1];
    }
    else if(currSquares[currLine[1]] == value && currSquares[currLine[2]] == value && currSquares[currLine[0]] == null) {
        return currLine[0];
    }
    return null;
}

export function difficultMove(currSquares, value) {
    makeBestMove(currSquares, value);
}

export function calculateWinner(squares) {
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a]!= null && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

export const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function makeBestMove(board, player) {
  // Determine who the opponent is
  const opponent = player === "X" ? "O" : "X";

  // --- Helper: Check for Terminal State (Win/Loss/Draw) ---
  function checkWinner(currentBoard) {
    const winningCombos = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Cols
      [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (let combo of winningCombos) {
      const [a, b, c] = combo;
      // Check if not null and all match
      if (currentBoard[a] !== null && 
          currentBoard[a] === currentBoard[b] && 
          currentBoard[a] === currentBoard[c]) {
        return currentBoard[a] === player ? 10 : -10;
      }
    }

    // Check for Draw (no nulls left)
    if (!currentBoard.includes(null)) {
      return 0;
    }

    return null; // Game is ongoing
  }

  // --- Helper: Minimax Algorithm ---
  function minimax(currentBoard, depth, isMaximizing) {
    let score = checkWinner(currentBoard);
    if (score !== null) return score;

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 9; i++) {
        if (currentBoard[i] === null) {
          currentBoard[i] = player;
          let currentScore = minimax(currentBoard, depth + 1, false);
          currentBoard[i] = null; // Backtrack (Reset to null)
          bestScore = Math.max(currentScore, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 9; i++) {
        if (currentBoard[i] === null) {
          currentBoard[i] = opponent;
          let currentScore = minimax(currentBoard, depth + 1, true);
          currentBoard[i] = null; // Backtrack (Reset to null)
          bestScore = Math.min(currentScore, bestScore);
        }
      }
      return bestScore;
    }
  }

  // --- Main Execution ---
  let bestScore = -Infinity;
  let move = -1;

  for (let i = 0; i < 9; i++) {
    // Strictly check for null
    if (board[i] === null) {
      board[i] = player;
      let score = minimax(board, 0, false);
      board[i] = null; // Undo the move

      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  }

  // Update the original array reference
  if (move !== -1) {
    board[move] = player;
  }
}