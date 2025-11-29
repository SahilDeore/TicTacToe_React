import { useState } from 'react';
import Button from './Button';
import { backend_url } from './Constants';

export default function Join({setError, sessionId, setSessionId, setPlayerId}) {
    
    const joinSession = async (joinRequestBody) => {
        try {

            console.log("JOINING SESSION");
            const response = await (fetch(backend_url+'/joinSession', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'ngrok-skip-browser-warning': 'true',
                },
                body: JSON.stringify(joinRequestBody),
            }))
            if (!response.ok) {
                throw new Error("Network error!");
            }  

            const data = await response.json();
            console.log("RESPONSE RECEIVED");
            console.log(data);
            setPlayerId(data.playerId);

        } catch (error) {
            console.log("ERROR");
            setError(error);
        }
    };
    
    function joinClick() {

        const joinRequestBody = {
            "sessionId": sessionId
        }

        joinSession(joinRequestBody);

    }

    return (
        <div>
            <h1>Enter Session ID:</h1>
            <input className = 'input-field' id = 'joinSesssionId' type='text' value = {sessionId} onChange={(e) => setSessionId(e.target.value)}></input>
            <Button text="Join" onButtonClick={() => joinClick()}/>
        </div>
    )

}