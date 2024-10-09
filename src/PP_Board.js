import { useState } from 'react';
import Board from "./Board";

export default function PP_Board() {

    const [squares, setSquares] = useState(Array(9).fill(null));
    const [next, setNext] = useState("X");

    const winner = calculateWinner(squares);
    let status;
    if (winner) {
        status = "Winner: " + winner;
    } else if (!squares.includes(null)) {
        status = "Draw";
    } else {
        status = "Next player: " + (next);
    }

    function handleClick(index) {
        if (squares[index] || calculateWinner(squares)) {
            return;
        }

        switchNext();
        const nextSquares = squares.slice();
        nextSquares[index] = next;
        setSquares(nextSquares);
    }

    function switchNext() {
        next == "X" ? setNext("O") : setNext("X");
    }

    function resetBoard() {
        setNext("X");
        setSquares(Array(9).fill(null));
    }

    return (
        <div>
            <div className="label">{status}</div>
            <Board squares={squares} handleClick={handleClick} />
            <div>
                <button className="clicker" onClick={() => resetBoard()}>New Game</button>
            </div>
        </div>);
}

function calculateWinner(squares) {
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