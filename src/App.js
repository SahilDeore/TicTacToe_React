import { useState } from 'react';
import CPU from "./CPU";
import Online from './Online';
import Button from './Button';
import PP_Board from './PP_Board';

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
      <div className='box'>
        {!page && (
          <>
            <Button text = "CPU" onButtonClick={() => handleButtonClick("CPU")}/>
            <Button text = "Pass & Play" onButtonClick={() => handleButtonClick("Duo")}/>
            <Button text = "Online" onButtonClick={() => handleButtonClick("Online")}/>
          </>
          
        )}

        <div>
          {page === "CPU" && (
            <CPU />
          )}
          {page === "Duo" && (
            <PP_Board />
          )}
          {page === "Online" && (
            <Online />
          )}
        </div>
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
