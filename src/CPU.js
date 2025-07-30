import { useState, useEffect } from 'react';
import Board from './Board';
import Button from './Button';

export default function CPU() {

    const firstPlayer = "X";
    const secondPlayer = "O";

    const [squares, setSquares] = useState(Array(9).fill(null)); // Array of the squares to indicate current state of the board
    const [next, setNext] = useState(firstPlayer); // The next player
    const [isActive, setIsActive] = useState(true); // boolean flag to determine if the game is still ongoing, false if it is either a win, a loss or a draw
    const [winner, setWinner] = useState(null); // contains the winner (X or O)
    const [difficulty, setDifficulty] = useState(null); // contains the difficulty value, EASY, MEDIUM, DIFFICULT
    const [userPlayer, setUserPlayer] = useState("X"); // contains the symbol that will be played by user

    function selectDifficulty(difficultySelected) {
        setDifficulty(difficultySelected);
    }

    function handleClick(index) {

        if (squares[index] || !isActive || winner) {
            return;
        }
        
        const nextSquares = squares.slice();
        nextSquares[index] = next;
        let currWinner = calculateWinner(nextSquares);
        if (currWinner || !nextSquares.includes(null)) {
            setWinner(currWinner);
            setIsActive(false);
        }
        setSquares(nextSquares);
        switchNext();
    }

    function switchNext() {
        next == "X" ? setNext("O") : setNext("X");
    }

    function resetBoard() {
        setNext(firstPlayer);
        setSquares(Array(9).fill(null));
        setIsActive(true);
        setWinner(null);
    }

    function generateStatus() {

        if(!isActive) {
            if (winner === userPlayer) {
                return "You WON!";
            } else if (winner && winner !== userPlayer) {
                return "You Lost!"
            } else if (!squares.includes(null)) {
                return "Draw";
            }
        } else if (!difficulty){
            return "Select Difficulty";
        }

    }

    function status() {
        return (
            <div>
                {generateStatus()}
            </div>
        );
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

        <>
            CPU GAME!
            {status()}
            {!difficulty && (
                <div>
                    <Button text="Easy" onButtonClick={() => selectDifficulty("Easy")}/>
                    <Button text="Medium" onButtonClick={() => selectDifficulty("Medium")}/>
                    <Button text="Difficult" onButtonClick={() => selectDifficulty("Difficult")}/>
                </div>
            )
            }
            {difficulty && (
                <div>
                    
                    <Board squares={squares} handleClick={handleClick} strike={getLineList()} />
                    <div>
                        <Button text="New Game" onButtonClick={() => resetBoard()} />
                    </div>
                </div>
            )}
        </>

    );
}

