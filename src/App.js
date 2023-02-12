import { useState, useEffect } from "react";
import RapportChessBoard from './integrations/RapportChess';
import Rules from './components/Rules';
import MovesTable from './components/MovesTable';
import styled from 'styled-components';
import { transformArrayToPGN, transformMovesInArray } from './functions/chessFunctions';
import Switch from '@mui/material/Switch';
import ScreenRotationAltIcon from '@mui/icons-material/ScreenRotationAlt';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';


function App() {

  const [props, setProps] = useState({
    position: "start",
    rapportDisabled: false,
    orientation: "white",
    playYourself: false,
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
      case "playYourself":
        setProps({...props, playYourself: !props.playYourself});
        break;
      default:
        setProps({...props, position: "start", rapportDisabled: false, orientation: "white"});
    }
  }
  
  const updatePropsFromHistory = (history) => {
    setProps({...props, history: history})
    if (props.playYourself) {
      if (history.length % 2 === 1) {
        setProps({...props, orientation: "black"});
      } else {
        setProps({...props, orientation: "white"});
      }
    }
  }

  return (
    <CenterContainer>
      <h2>Rapport Chess</h2>
    <Container>
        <LeftContainer>
          <Rules />
          {/* <button>
                Reset position
          </button> */}
          <SwitchContainer>
            <SpanSwitch>Rapport Mode</SpanSwitch>
            <Switch defaultChecked onClick={() => updateProps("rapportDisabled")}></Switch>
          </SwitchContainer>
          <SwitchContainer>
            <SpanSwitch>Play Yourself Mode</SpanSwitch>
            <Switch onClick={() => updateProps("playYourself")}></Switch>
          </SwitchContainer>
        </LeftContainer>
        <BorderChessBoard>
          <RapportChessBoard
              rapportDisabled={props.rapportDisabled}
              orientation={props.orientation}
              history={props.history}
              parentSetHistory={(history) => updatePropsFromHistory(history)}
              // position={props.position}
            />
        </BorderChessBoard>
        <RightContainer>
          <Button onClick={() => updateProps("orientation")}>
            <ScreenRotationAltIcon fontSize='small' className='icon-styled'/>Flip Board
          </Button>
          <Button onClick={(event)=>{event.preventDefault();navigator.clipboard.writeText(transformArrayToPGN(props.history));}}>
            <ContentCopyIcon fontSize='small' className='icon-styled'/>Copy PGN to Clipboard
          </Button>
          <MovesTable history={transformMovesInArray(props.history)} />
        </RightContainer>
    </Container>
    <Footer>
      Made by <Link href="https://github.com/AlfreMK"> Alfredo Medina</Link>.
      Inspired by <Link href="https://www.jairtrejo.com/"> Jair Trejo</Link>,
      <Link href="https://www.youtube.com/@Ajedrezconmiguelito"> GM Miguel Santos </Link>
      and <Link href="https://www.youtube.com/@gmgascon">GM José Gascón</Link>.
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
    justify-content: center;
    margin-right: 5%;
    margin-left: 5%;
`;

const BorderChessBoard = styled.div`
    padding: 5px;
    background-color: #373531;
    margin: 5px;
`;

const Footer = styled.footer`
    margin: 10px;
    margin-top: 30px;
    margin-bottom: 50px;
    text-align: center;
    @media (max-width: 640px) { 
      font-size: 0.8em;
    }
`;

const SpanSwitch = styled.span`
    margin-left: 15px;
`;

const SwitchContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-radius: 10px;
    padding: 5px;
    margin: 7px;
    background-color: #373531;
    min-width: 250px;
`;

const LeftContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 5px;
    margin-top: 10px;
    @media (max-width: 640px) { 
      order: 2;
    }
`;

const Link = styled.a`
    color: #4183c4;
    text-decoration: none;
    font-weight: bold;
    &:hover {
        text-decoration: underline;
    }
`;

const RightContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 5px;
    margin-top: 30px;
    min-width: 300px;
`;

const Button = styled.button`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: #373531;
    font-weight: bold;
    color: #bababa;
    padding: 10px;
    border-radius: 10px;
    margin: 5px;
    border: none;
    cursor: pointer;
    min-width: 250px;
    &:hover {
        background-color: #2d5b7c;
    }
`;