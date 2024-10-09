import { useState } from 'react';
import Online from "./Online";
import PP from "./PP";

export default function Duo() {

    const [page, setPage] = useState(null);

    function handleButtonClick(pageName) {
        setPage(pageName);
    }

    function handleGoBack() {
        setPage(null);
    }

    return (
        <div className="game">

            {!page && (
                <div>
                    <div><button className="clicker" onClick={() => handleButtonClick("Online")}>Online</button></div>
                    <div><button className="clicker" onClick={() => handleButtonClick("PP")}>Pass & Play</button></div>
                </div>

            )}


            {page === "Online" && (
                <div>
                    <Online />
                    <button className="clicker" onClick={() => handleGoBack()}>Go Back</button>
                </div>
            )}
            {page === "PP" && (
                <div>
                    <PP />
                    <button className="clicker" onClick={() => handleGoBack()}>Go Back</button>
                </div>
            )}
        </div>
    );
}