/*

This method first counts the number of free squares and then 
randomly selects one of the free squares and updates it with the new value

*/
export function easyMove(currSquares, value) {
    let freeSquares = 0;
    for (let i = 0; i < currSquares.length; i++) {
        if (!currSquares[i]) {
            freeSquares++;
        }
    }
    let moveSquare = Math.floor(Math.random() * freeSquares);
    freeSquares = 0;
    for (let i = 0; i < currSquares.length; i++) {
        if (!currSquares[i]) {
            if (freeSquares == moveSquare) {
                currSquares[i] = value;
            }
            freeSquares++;
        }
    }
}

export function mediumMove(currSquares, value) {
    easyMove(currSquares, value);
}

export function difficultMove(currSquares, value) {
    easyMove(currSquares, value);
}

export function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
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