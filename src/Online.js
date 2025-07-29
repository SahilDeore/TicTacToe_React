import { useState } from 'react';
import PP_Board from './PP_Board';
import Session from './Session';

export default function Online() {

    const [page, setPage] = useState("Session");

    function handleClick(index) {
        console.log("TODO: Handle API Calling here by updating " +  index);
    }

    return (
        <>
            <h1>Online Game</h1>
            {(page === "Session") && <Session/>}
            {(page === "Play") && <PP_Board/>}
        </>

    );
}