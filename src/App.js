import { useState } from 'react';
import CPU from "./CPU";
import Duo from "./Duo";

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
            <div><button className="clicker" onClick={() => handleButtonClick("Duo")}>Play vs Friend</button></div>
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
