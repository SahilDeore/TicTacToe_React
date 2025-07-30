import { useState, useEffect } from 'react';
import Board from './Board';
import Button from './Button';
import * as algo from './Algo';

export default function CPU() {

    const userPlayer = "X";
    const CPUPlayer = "O";

    const [squares, setSquares] = useState(Array(9).fill(null)); // Array of the squares to indicate current state of the board
    const [isActive, setIsActive] = useState(true); // boolean flag to determine if the game is still ongoing, false if it is either a win, a loss or a draw
    const [winner, setWinner] = useState(null); // contains the winner (X or O)
    const [difficulty, setDifficulty] = useState(null); // contains the difficulty value, EASY, MEDIUM, DIFFICULT
    const [firstPlayer, setFirstPlayer] = useState("X"); // contains the player that will go first 

    function selectDifficulty(difficultySelected) {
        setDifficulty(difficultySelected);
    }

    function handleClick(index) {

        if (squares[index] || !isActive || winner) {
            return;
        }
        
        const nextSquares = squares.slice();
        nextSquares[index] = userPlayer;
        let currWinner =  algo.calculateWinner(nextSquares);
        if (currWinner || !nextSquares.includes(null)) {
            setWinner(currWinner);
            setIsActive(false);
            setSquares(nextSquares);
        }
        else {
            playCPUMove(nextSquares);
        }
    }

    function playCPUMove(currSquares) {
        if (difficulty == "Easy") {
            algo.easyMove(currSquares, CPUPlayer);
        } else if (difficulty == "Medium") {
             algo.mediumMove(currSquares, CPUPlayer);
        } else if (difficulty == "Difficult") {
             algo.difficultMove(currSquares, CPUPlayer);
        }

        let currWinner =  algo.calculateWinner(currSquares);

        if (currWinner || !currSquares.includes(null)) {
            setWinner(currWinner);
            setIsActive(false);
        }
        setSquares(currSquares);

    }

    function resetBoard() {
        setSquares(Array(9).fill(null));
        setIsActive(true);
        setWinner(null);
        if(firstPlayer === userPlayer) {
            playCPUMove(Array(9).fill(null));
            setFirstPlayer(CPUPlayer);
        } else {
            setFirstPlayer(userPlayer);
        }
    }

    function generateStatus() {

        if(!isActive) {
            if (winner === userPlayer) {
                return "You WON!";
            } else if (winner === CPUPlayer) {
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

    function getLineList() {
        const lines = algo.lines;

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

