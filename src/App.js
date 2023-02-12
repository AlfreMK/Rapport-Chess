import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from "react";
import RapportChessBoard from './integrations/RapportChess';
import Rules from './components/Rules';
import MovesTable from './components/MovesTable';
import styled from 'styled-components';
import { transformArrayToPGN, transformMovesInArray } from './functions/chessFunctions';
// import chessHook from "./hooks/puzzle.js";

function App() {

  const [props, setProps] = useState({
    position: "start",
    rapportDisabled: false,
    orientation: "white",
    history: [],
  });

  const updateProps = (newProps) => {
    switch (newProps) {
      case "position":
        setProps({...props, position: "start"});
        break;
      case "rapportDisabled":
        setProps({...props, rapportDisabled: !props.rapportDisabled});
        break;
      case "orientation":
        setProps({...props, orientation: props.orientation === "white" ? "black" : "white"});
        break;
      default:
        setProps({...props, position: "start", rapportDisabled: false, orientation: "white"});
    }
  }

  // useEffect(() => {
  //   if (props.history.length % 2 === 1) {
  //     setProps({...props, orientation: "black"});
  //   } else {
  //     setProps({...props, orientation: "white"});
  //   }
  // }, [props]);

  return (
    <CenterContainer>
    <Container>
        <div>
          <Rules />
          {/* <button>
                Reset position
          </button> */}
          <button onClick={() => updateProps("rapportDisabled")}>
            Rapport {props.rapportDisabled ? "Disabled" : "Enabled"}
          </button>
        </div>
        <BorderChessBoard>
          <RapportChessBoard
              calcWidth={({ screenWidth }) => {
                return Math.min(screenWidth - 32 - 8, 560);
              }}
              rapportDisabled={props.rapportDisabled}
              orientation={props.orientation}
              history={props.history}
              parentSetHistory={(history) => setProps({...props, history: history})}
              // position={props.position}
            />
        </BorderChessBoard>
        <div>
          <MovesTable history={transformMovesInArray(props.history)} />
          <button onClick={() => updateProps("orientation")}>
            Flip Board
          </button>
          <button onClick={(event)=>{event.preventDefault();navigator.clipboard.writeText(transformArrayToPGN(props.history));}}>
            Copy PGN to Clipboard
          </button>
        </div>
    </Container>
    <Footer>
      Made by <a href="https://github.com/AlfreMK"> Alfredo Medina</a>.
      Inspired by <a href="https://www.jairtrejo.com/"> Jair Trejo</a>,
      <a href="https://www.youtube.com/@Ajedrezconmiguelito"> GM Miguel Santos </a>
      and <a href="https://www.youtube.com/@gmgascon">GM José Gascón</a>.
    </Footer>
    </CenterContainer>
  );
}

export default App;

// https://github.com/jairtrejo/knight-moves/blob/main/src/hooks/usePuzzle.ts


const CenterContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Container = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    background-color: #f5f5f5;
    padding: 2%;
    margin: 2%;
    margin-right: 5%;
    margin-left: 5%;
`;

const BorderChessBoard = styled.div`
    padding: 5px;
    background-color: #481d24;
    margin: 5px;
`;

const Footer = styled.footer`
`