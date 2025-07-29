import { useState } from "react";
import { Client } from "@stomp/stompjs";

export default function Session() {

    const [page, setPage] =  useState(null);
    
    let currSession = Math.floor(10000000 + Math.random() * 90000000);
    let otherSession = parseInt(currSession.toString().split("").reverse().join(""));
    console.log(currSession, otherSession);

    const stompClient = new Client({
        brokerURL: 'ws://localhost:8080/twoplayer-websocket', // Replace with your STOMP server WebSocket URL
        reconnectDelay: 5000, // Auto-reconnect after 5 seconds if the connection drops
        heartbeatIncoming: 4000, // Incoming heartbeat every 4 seconds
        heartbeatOutgoing: 4000, // Outgoing heartbeat every 4 seconds
        debug: (str) => console.log(str), // Debug logs
    });


    stompClient.onConnect = (frame) => {
        console.log('Connected:', frame);

        stompClient.subscribe('/user/{user2}/next', (message) => {
            console.log('Received message:', JSON.parse(message.body));
        });

        // // Subscribe to a topic (e.g., broadcast messages)
        // stompClient.subscribe('/topic/messages', (message) => {
        //     console.log('Received message:', JSON.parse(message.body));
        // });

        // // Subscribe to user-specific messages
        // stompClient.subscribe('/user/queue/next', (message) => {
        //     console.log('User-specific message:', JSON.parse(message.body));
        // });
    };

    stompClient.onDisconnect = (frame) => {
        console.log('Disconnected:', frame);
    };

    const connect = () => {
        if (!stompClient.active) {
            stompClient.activate();
        }
    };

    const sendMessage = (messageBody) => {
        if (stompClient.connected) {
            stompClient.publish({
                destination: destination,
                body: JSON.stringify(messageBody),
            });
        } else {
            console.error('STOMP client is not connected.');
        }
    };

    // Disconnect the client
    const disconnect = () => {
        if (stompClient.connected) {
            stompClient.deactivate();
        }
    };



    function createSession() {
        connect();
        setPage("Create");
    }

    function joinSession() {
        setPage("Join");
    }

    function CreateSession() {
        return(<>        
        Session ID: {currSession}
        </>);
    }
    
    function JoinSession() {
        return(<>
        Enter Session ID: 
        </>);
    }

    return (
        <>
            {(!page && <>
            <button className="clicker" onClick={() => createSession()}>Create Session </button>
            <br/>
            <button className="clicker" onClick={() => joinSession()}>Join Session </button>
            </>)}
            {(page === "Create") && <CreateSession/>}
            {(page === "Join") && <JoinSession/>}
        </>
    );
}