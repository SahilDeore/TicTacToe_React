import { useState } from 'react'
import Board from './Board';

export default function Online() {

    const [squares, setSquares] = useState(Array(9).fill(null));

    function handleClick(index) {
        console.log("TODO: Handle API Calling here by updating " +  index);
    }

    return (
        <div>
            <div>Online Game</div>
            <Board squares={squares} handleClick={handleClick}/>
        </div>

    );
}