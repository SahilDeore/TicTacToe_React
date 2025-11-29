import { useState } from 'react';
import Button from './Button';
import Join from './Join';
import { backend_url, Player1_moveStatusList, Player1Team, Player2_moveStatusList, Player2Team } from './Constants';
import OnlinePlayer from './OnlinePlayer';

export default function Online() {

    const [page, setPage] = useState("");
    const [error, setError] = useState(null);
    const [sessionId, setSessionId] = useState("");
    const [playerId, setPlayerId] = useState("");
    const [playerValues, setPlayerValues] = useState(null);

    const checkConnection = async () => {
        try {

            const response = await (fetch(backend_url+'/check', {
                method: 'GET'
            }))
            if (!response.ok) {
                throw new Error("Network error!");
            }  

            const data = await response.json();

        } catch (error) {
            console.log("ERROR");
            setError(error);
        }
    };

    const getSession = async () => {
        try {
            const response = await (fetch(backend_url+'/createSession', {
                method: 'GET'
            }))
            if (!response.ok) {
                throw new Error("Network error!");
            }  

            const data = await response.json();
            console.log(data);
            setSessionId(data.sessionId);
            setPlayerId(data.playerId);

        } catch (error) {
            console.log("ERROR");
            setError(error);
        }
    };

    function createSession() {
        checkConnection();
        getSession();
        setPlayerValues ({
            playerMoveStatus:Player1_moveStatusList,
            playerTeam:Player1Team,
            opponentMoveStatus:Player2_moveStatusList
        });
    }

    function joinPage() {
        checkConnection();
        setPage("Join");
        setPlayerValues({
            playerMoveStatus:Player2_moveStatusList,
            playerTeam:Player2Team,
            opponentMoveStatus:Player1_moveStatusList
        });
    }

    return (
        <>
            <div className='header'>Online Game</div>

            {!error && !page && (!sessionId || !playerId) && (
                <div>
            <Button text = "Create Match" onButtonClick={() => createSession()} />
            <Button text = "Join Match" onButtonClick={() => joinPage()} />
                </div>
            )}

            {!error && page === "Join" && (!sessionId || !playerId) && (
                <Join setError={setError} sessionId={sessionId} setSessionId={setSessionId} setPlayerId={setPlayerId}/>
            )}

            {!error && sessionId && playerId && playerValues && (
                <OnlinePlayer sessionId={sessionId} playerId={playerId} playerValues={playerValues}/>
            )}

            {error && (
                <div className='sub-header'>Cannot reach the server. Try again later.</div>
            )}

        </>

    );
}