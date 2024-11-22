import { useState } from 'react';
import CPU from "./CPU";
import Duo from "./Duo";
import Online from './Online';

export default function Game() {

  const [page, setPage] = useState(null);

  function handleButtonClick(pageName) {
    setPage(pageName);
  }

  function handleGoBack() {
    setPage(null);
  }

  return (
    <div className="game">
      <div>
        {!page && (
          <div>
            <div><button className="clicker" onClick={() => handleButtonClick("CPU")}>CPU</button></div>
            <div><button className="clicker" onClick={() => handleButtonClick("Duo")}>Pass & Play</button></div>
            <div><button className="clicker" onClick={() => handleButtonClick("Online")}>Online</button></div>
          </div>

        )}


        {page === "CPU" && (
          <div>
            <CPU />
            <HomeButton onButtonClick={() => handleGoBack()} />
          </div>
        )}
        {page === "Duo" && (
          <div>
            <Duo />
            <HomeButton onButtonClick={() => handleGoBack()} />
          </div>
        )}
        {page === "Online" && (
          <div>
            <Online />
            <HomeButton onButtonClick={() => handleGoBack()} />
          </div>
        )}
      </div>
    </div>
  );
}

function HomeButton({ onButtonClick }) {
  return (
    <div>
      <button className="clicker" onClick={onButtonClick}>HOME</button>
    </div>
  )
}
