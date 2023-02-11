import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from "react";
import RapportChessBoard from './integrations/RapportChess';
// import chessHook from "./hooks/puzzle.js";

function App() {
  // const fenPosition = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
  // const [positionState, setPositionState] = useState({
  //   position: fenPosition,
  //   turnColor: "w",
  //   moves: [],
  // });


  // const reset = () => {
  //   setPositionState({
  //     position: fenPosition,
  //     turnColor: "w",
  //     moves: [],
  //   });
  // };

  return (
    <div className="App">
      <header className="App-header">
        <h2>
          Rules for Rapport Chess
        </h2>
        <p>
          - All pieces (except the king) move like standard chess, with the restriction that at the beggining they only move foward.
        </p>
        <p>
          - When a piece reach the 7th rank, then they can move foward or backward.
        </p>
          
        <RapportChessBoard
            calcWidth={({ screenWidth }) => {
              return Math.min(screenWidth - 32 - 8, 560);
            }}
            // rapportEnabled={false}
          />
      </header>
      {/* <div>
        <p>{positionState.moves}</p>
      </div>
      <button primary onClick={reset}>
              Reset position
      </button> */}
    </div>
  );
}

export default App;

// https://github.com/jairtrejo/knight-moves/blob/main/src/hooks/usePuzzle.ts