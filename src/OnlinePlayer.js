import { useState , useEffect} from 'react';
import Board from "./Board";
import Button from './Button';
import { backend_url, gameCompletedStatus, waitingForPlayer2Status, waitingForReplayStatus } from './Constants';
import { POLLING_INTERVAL } from './Constants';

export default function OnlinePlayer({sessionId, playerId, playerValues}) {

    const [status, setStatus] = useState(null);
    const [error, setError] = useState(null);
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [waiting, setWaiting] = useState(true);
    const [replay, setReplay] = useState(false);
    const [waitingForMove, setWaitingForMove] = useState(null);
    const [waitingForReplay, setWaitingForReplay] = useState(null);
    const [waitingForPlayer2, setWaitingForPlayer2] = useState(null);

    const checkStatus = async () => {
        try {

            const requestBody = {
                "sessionId" : sessionId,
                "playerId" : playerId
            };

            const response = await(fetch(backend_url+"/sessionStatus", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'ngrok-skip-browser-warning': 'true',
                },
                body: JSON.stringify(requestBody),
            }));

            const data = await response.json();

            setStatus(data.sessionStatus);
            setSquares(data.squareState.state);

            console.log(data.sessionStatus);
            console.log("Waiting for:" + playerValues.playerMoveStatus);

            if(playerValues.playerMoveStatus.includes(data.sessionStatus)) {
                setWaiting(false);
                setWaitingForMove(false);
                setWaitingForReplay(false);
                setWaitingForPlayer2(false);
            } else if (data.sessionStatus === gameCompletedStatus) {
                setWaiting(false);
                setWaitingForMove(false);
                setWaitingForReplay(false);
                setReplay(true);
                setWaitingForPlayer2(false);
            } else if (playerValues.opponentMoveStatus.includes(data.sessionStatus)) {
                setWaiting(true);
                setWaitingForMove(true);
                setWaitingForReplay(false);
                setWaitingForPlayer2(false);
            } else if (data.sessionStatus === waitingForReplayStatus) {
                setWaiting(true);
                setWaitingForMove(false);
                setWaitingForReplay(true);
                setWaitingForPlayer2(false);
            }else if (data.sessionStatus == waitingForPlayer2Status) {
                setWaiting(true);
                setWaitingForMove(false);
                setWaitingForReplay(false);
                setWaitingForPlayer2(true);
            } else {
                setWaiting(true);
                setWaitingForMove(false);
                setWaitingForReplay(false);
                setWaitingForPlayer2(false);
            }


        } catch (err) {
            setError("Failed to check status: ${err.message}");
        }
    }

    const makeMove = async (nextSquares) => {
        try {

            const requestBody = {
                "sessionId": sessionId,
                "playerId": playerId,
                "squareList": nextSquares
            }

            const response = await(fetch(backend_url+"/move", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'ngrok-skip-browser-warning': 'true',
                },
                body: JSON.stringify(requestBody),
            }));

            if(!response.ok) {
                throw new Error("Network error!");
            }

            const data = await response.json();

        }
        catch (err) {
            setError(err.message);
        }
    }

    useEffect( () => {

        if(!waiting) {
            return;
        }

        const intervalId = setInterval(() => {
            checkStatus();
        }, POLLING_INTERVAL);

        return () => clearInterval(intervalId);

    });

    function squareClick(index) {
        if(!playerValues.playerMoveStatus.includes(status)) {
            console.log("cant play");
            return;
        }

        if(squares[index]) {
            return;
        }

        const nextSquares = squares.slice();
        nextSquares[index] = playerValues.playerTeam;

        makeMove(nextSquares);
        setWaiting(true);
    }

    function handleReplay() {

        setReplayReady();
        setWaiting(true);
        setReplay(false);
        
    }

    const setReplayReady = async () => {
        try {

            const requestBody = {
                "sessionId": sessionId,
                "playerId": playerId
            }

            const response = await(fetch(backend_url+"/replay", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'ngrok-skip-browser-warning': 'true',
                },
                body: JSON.stringify(requestBody),
            }));

            if(!response.ok) {
                throw new Error("Network error!");
            }

            const data = await response.json();

            
        } catch (err) {
            setError(err.message)
        }
    }

    return (
        <>
            <div className='sub-header'>Player: {playerValues.playerTeam}</div>
            <div className='sub-header'>Session Id: {sessionId} </div>
            
            <div className='sub-header'>
            {!error && !waiting && !replay && (<>Your turn:</>)}
            {!error && waitingForPlayer2 && (<>Waiting for Player2 to Join:</>)}
            {!error && waitingForMove && (<>Opponent Turn:</>)}
            {!error && waitingForReplay && (<>Waiting for Player2 to accept Replay:</>)}
            {!error && !waitingForPlayer2 && !waitingForMove && !waitingForReplay && waiting && (<>Waiting..</>)}
            </div>
            <Board handleClick={squareClick} squares={squares} />

            {!error && !waiting && replay && (<Button text = "Replay?" onButtonClick={() => handleReplay()}/>)}
            {error && (<div className='sub-header'>ERROR</div>)}
        </>
    );
}