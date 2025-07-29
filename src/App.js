import { useState } from 'react';
import CPU from "./CPU";
import Duo from "./Duo";
import Online from './Online';
import Button from './Button';

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
          <Button text = "CPU" onButtonClick={() => handleButtonClick("CPU")}/>
          <Button text = "Pass & Play" onButtonClick={() => handleButtonClick("Duo")}/>
          <Button text = "Online" onButtonClick={() => handleButtonClick("Online")}/>
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
