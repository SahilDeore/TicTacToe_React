import { useState } from 'react';
import Board from "./Board";

export default function PP_Board() {

    const [squares, setSquares] = useState(Array(9).fill(null));
    const [next, setNext] = useState("X");
    const [winner, setWinner] = useState(null);

    function handleClick(index) {
        if (squares[index] || winner) {
            return;
        }

        switchNext();
        const nextSquares = squares.slice();
        nextSquares[index] = next;
        let currWinner = calculateWinner(nextSquares);
        if(currWinner || !nextSquares.includes(null)) {
            setWinner(currWinner);
        }
        setSquares(nextSquares);
    }

    function switchNext() {
        next == "X" ? setNext("O") : setNext("X");
    }

    function resetBoard() {
        setNext("X");
        setSquares(Array(9).fill(null));
        setWinner(null);
    }

    function generateStatus() {

        if (winner) {
            return "Winner: " + winner;
        } else if (!squares.includes(null)) {
            return "Draw";
        } else {
            return "Next player: " + (next);
        }

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

    function getLineList() {
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

        if(!winner) {
            return [];
        }
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return lines[i];
            }
        }
        return [];
    }

    return (
        <div>
            <div className="label">{generateStatus()}</div>
            <Board squares={squares} handleClick={handleClick} strike={getLineList()} />
            <div>
                <button className="clicker" onClick={() => resetBoard()}>New Game</button>
            </div>
        </div>);
}