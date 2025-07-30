/*

This method first counts the number of free squares and then 
randomly selects one of the free squares and updates it with the new value

*/
export function easyMove(currSquares, value) {
    let freeSquares = 0;
    for(let i = 0; i < currSquares.length; i++) {
        if(!currSquares[i]) {
            freeSquares++;
        }
    }
    let moveSquare = Math.floor(Math.random() * freeSquares);
    freeSquares = 0;
    for(let i = 0; i < currSquares.length; i++) {
        if(!currSquares[i]) {
            if(freeSquares == moveSquare) {
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