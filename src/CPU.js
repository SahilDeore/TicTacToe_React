import { useState, useEffect } from 'react';
import Board from './Board';
import Error from './Error';

export default function CPU() {

    const firstPlayer = "X";
    const secondPlayer = "O";

    const [squares, setSquares] = useState(Array(9).fill(null)); // Array of the squares to indicate current state of the board
    const [next, setNext] = useState(firstPlayer); // The next player
    const [error, setError] = useState(null); // boolean flag to indicate error status
    const [waiting, setWaiting] = useState(false); // boolean flag to indicate if application waiting for server response
    const [isActive, setIsActive] = useState(true); // boolean flag to determine if the game is still ongoing, false if it is either a win, a loss or a draw
    const [winner, setWinner] = useState(null); // contains the winner (X or O)

    const fetchData = async () => {
        try {

            const response = await (fetch('http://localhost:8080/play', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(getCurrentState()),
            }));
            if (!response.ok) {
                throw new Error("Network error!");
            }

            const data = await response.json();
            // console.log(data.state);

            setSquares(data.state);
            setNext(data.next);
            setWaiting(false);
            let currWinner = calculateWinner(data.state);
            if(currWinner || !data.state.includes(null)) {
                setWinner(currWinner);
                setIsActive(false);
            }

        } catch (exception) {
            setWaiting(false);
            setError(exception);
        }
    };

    function getCurrentState() {
        const jsonBody = {
            "state": squares,
            "next": next
        };

        return jsonBody;
    }

    useEffect(() => {
        if (waiting && isActive) {
            fetchData();
        }

    }, [waiting]);


    function handleClick(index) {
        
        if (squares[index] || !isActive || waiting || error || winner) {
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
        setWaiting(true);
    }

    function switchNext() {
        next == "X" ? setNext("O") : setNext("X");
    }

    function resetBoard() {
        setNext(firstPlayer);
        setSquares(Array(9).fill(null));
        setIsActive(true);
        setWaiting(false);
        setError(false);
        setWinner(null);
    }

    function generateStatus() {

        if(!isActive) {
            if (winner === firstPlayer) {
                return "You WON!";
            } else if (winner === secondPlayer) {
                return "You Lost"
            } else if (!squares.includes(null)) {
                return "Draw";
            }
        } else if(waiting) {
            return "Waiting for server";
        } else if(error){
            return (<Error message="Unable to contact server. Please try again later."/>);
        } else {
            return "Your turn"
        }

    }

    function status() {
        let statusmessage = generateStatus();
        return (
            <div>
                {statusmessage}
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
            <Board squares={squares} handleClick={handleClick} strike={getLineList()} />
            <div>
                <button className="clicker" onClick={() => resetBoard()}>New Game</button>
            </div>
        </>

    );
}

