import { useState, useEffect } from 'react';
import Board from './Board';

export default function CPU() {

    const [squares, setSquares] = useState(Array(9).fill(null));
    const [next, setNext] = useState("X");
    const [error, setError] = useState(null);
    const [waiting, setWaiting] = useState(false);
    const [isActive, setIsActive] = useState(true);

    const winner = calculateWinner(squares);
    let status;
    if (winner === "X") {
        status = "You WON!";
    } else if (winner === "O") {
        status = "You Lost."
    } else if (!squares.includes(null)) {
        status = "Draw";
    } else {
        status = "Your Turn!";
    }

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
            console.log(data.state);

            setSquares(data.state);
            setNext(data.next);

        } catch (error) {
            setError(error);
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
            setWaiting(false);
            if (calculateWinner(squares)) {
                setIsActive(false);
            }
        }

    }, [waiting]);


    function handleClick(index) {
        if (squares[index] || !isActive || calculateWinner(squares)) {
            return;
        }
        
        const nextSquares = squares.slice();
        nextSquares[index] = next;
        if (calculateWinner(nextSquares)) {
            setIsActive(false);
        }
        setSquares(nextSquares);
        switchNext();
        setWaiting(true);
    }

    function switchNext() {
        next == "X" ? setNext("O") : setNext("X");
    }

    if (error) {
        return (<div> {error}</div>);
    }

    function resetBoard() {
        setNext("X");
        setSquares(Array(9).fill(null));
        setIsActive(true);
        setWaiting(false);
    }

    return (

        <div>
            <div>CPU GAME!</div>
            <div className="label">{status}</div>
            <Board squares={squares} handleClick={handleClick} />
            <div>
                <button className="clicker" onClick={() => resetBoard()}>New Game</button>
            </div>
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