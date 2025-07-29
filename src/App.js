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

      {!page && (
        
        <div className='box'>
          <button className="clicker" onClick={() => handleButtonClick("CPU")}>CPU</button><br />
          <button className="clicker" onClick={() => handleButtonClick("Duo")}>Pass & Play</button><br />
          <button className="clicker" onClick={() => handleButtonClick("Online")}>Online</button><br/>
        </div>
        
      )}

      <div>
        {page === "CPU" && (
          <CPU />
        )}
        {page === "Duo" && (
          <Duo />
        )}
        {page === "Online" && (
          <Online />
        )}
      </div>

      <HomeButton onButtonClick={() => handleGoBack()} />
     
    </div>
  );
}

function HomeButton({ onButtonClick }) {
  return (
    <>
      <button className="clicker" onClick={onButtonClick}>HOME</button>
    </>
  )
}
