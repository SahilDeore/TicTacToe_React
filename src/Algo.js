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
    console.log("IN " + currSquares + " for " + value);

    let winningMove = false;
    let criticalMove = false;
    let movePlace = null;

    for(let i = 0; i < lines.length; i++) {
        const currLine = lines[i];

        
        const lineStatusCurrentPlayer = isReadyLine(currSquares,currLine,value);
        console.log("Current move: " + lineStatusCurrentPlayer);

        const lineStatusOpponentPlayer = isReadyLine(currSquares,currLine,value && value=="X"?"O":"X");
        console.log("Opponent move: " + lineStatusOpponentPlayer);

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
    console.log("Line: " + currLine);
    console.log("a"+currSquares[currLine[0]]);
    console.log("b"+currSquares[currLine[1]]);
    console.log("c"+currSquares[currLine[2]]);
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
    mediumMove(currSquares, value);
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