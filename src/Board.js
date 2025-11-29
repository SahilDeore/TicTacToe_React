import Square from './Square';
import * as algo from './Algo';

export default function Board({ squares, handleClick }) {

  const classNames = {

    "strike-first-row" : [0, 1, 2],
    "strike-second-row" : [3, 4, 5],
    "strike-third-row" : [6, 7, 8],
    "strike-first-column" : [0, 3, 6],
    "strike-second-column" : [1, 4, 7],
    "strike-third-column" : [2, 5, 8],
    "strike-first-diagonal" : [0, 4, 8],
    "strike-second-diagonal" : [2, 4, 6],

  };

  function getStrikeList() {
      const lines = algo.lines;

      for (let i = 0; i < lines.length; i++) {
          const [a, b, c] = lines[i];
          if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
              return lines[i];
          }
      }
      return [];
  }

  function getStrikeClassname() {

    const strike = getStrikeList();
    
    for (const [className, coordinates] of Object.entries(classNames)) {
      if (coordinates.every((item, index) => item === strike[index])) {
        return className;
      }
    }
    return "";
  }

  return (
    <div className="board">
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
      <div id='strikeLine' className={getStrikeClassname()}></div>
    </div>);
}