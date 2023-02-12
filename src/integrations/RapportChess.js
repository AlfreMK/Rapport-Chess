import React, { Component, createRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Chess } from "chess.js"; // import Chess from  "chess.js"(default) if recieving an error about new Chess() not being a constructor

import Chessboard from "chessboardjsx";


// code extracted and adapted from https://codesandbox.io/s/x332zqpkl4?from-embed=&file=/src/integrations/WithMoveValidation.js
class RapportChess extends Component {
  static propTypes = { children: PropTypes.func };
  state = {
    fen: this.props.position,
    trackOfPieces:     // pieces that had arrived the 7th rank
        [
            {square: "a1", color: "w", piece: "qR", hasArrived: false},
            {square: "b1", color: "w", piece: "qN", hasArrived: false},
            {square: "c1", color: "w", piece: "qB", hasArrived: false},
            {square: "d1", color: "w", piece: "Q", hasArrived: false},
            {square: "e1", color: "w", piece: "K", hasArrived: false},
            {square: "f1", color: "w", piece: "B", hasArrived: false},
            {square: "g1", color: "w", piece: "N", hasArrived: false},
            {square: "h1", color: "w", piece: "R", hasArrived: false},
            {square: "a8", color: "b", piece: "qR", hasArrived: false},
            {square: "b8", color: "b", piece: "qN", hasArrived: false},
            {square: "c8", color: "b", piece: "qB", hasArrived: false},
            {square: "d8", color: "b", piece: "Q", hasArrived: false},
            {square: "e8", color: "b", piece: "K", hasArrived: false},
            {square: "f8", color: "b", piece: "B", hasArrived: false},
            {square: "g8", color: "b", piece: "N", hasArrived: false},
            {square: "h8", color: "b", piece: "R", hasArrived: false},
        ],
    // array of past game moves
    history: this.props.history,
  };

  componentDidMount() {
    this.game = new Chess();
  }

  allowDrag = ({ piece }) => {
    // we can only pick up pieces if it is thier turn
    return piece[0] === this.game.turn();
    };


  rapportEnabled = (boolean) => {
    this.setState({rapportEnabled: boolean});
    };
  

  onDrop = ({ sourceSquare, targetSquare }) => {
    // see if the move is legal
    try{
        const chess = new Chess(this.game.fen());
        let move = chess.move({
            from: sourceSquare,
            to: targetSquare,
            promotion: "q" // always promote to a queen for example simplicity
        });
        if (moveIsLegalByRapport(move, this.state.trackOfPieces) || this.props.rapportDisabled) {
            move = this.game.move({
                from: sourceSquare,
                to: targetSquare,
                promotion: "q"
            });
            this.setState(({ history }) => ({
                fen: this.game.fen(),
                history: history.concat(move.san),
                trackOfPieces: updateTrackOfPieces(this.state.trackOfPieces, move)
            }
            ));
            this.props.parentSetHistory(this.state.history.concat(move.san));
        }
    }
    catch(err){
        console.log(err);
        return;
    }
  };

//   onSquareRightClick = square =>
//     this.setState({
//       squareStyles: { [square]: { backgroundColor: "deepPink" } }
//     });

  render() {
    const { fen } = this.state;

    return this.props.children({
      position: fen,
      onDrop: this.onDrop,
      allowDrag: this.allowDrag,
    //   onSquareRightClick: this.onSquareRightClick,
    });
  }
}


const moveIsLegalByRapport = (move, trackOfPieces) => {  // by rapport chess rules
    if (move.san[0] === "K") {  // king can move anywhere
        return true;
    }
    const turn = move.color;
    const originRank = parseInt(move.lan[1]);
    const destinationRank = parseInt(move.lan[3]);
    const piece = trackOfPieces.find(piece => piece.square === move.from && piece.color === move.color);
    if (piece === undefined) {  // if the piece is not in the trackOfPieces array, it can move anywhere
        return true;
    }
    if (piece.hasArrived) {  // if the piece has arrived the 7th rank, it can move anywhere
        return true;
    }
    if (turn === "w" && originRank <= destinationRank) {  // white pieces move up the board
      return true;
    } else if (turn === "b" && originRank >= destinationRank) {  // black pieces move down the board
      return true;
    }
    return false;
  };

const updateTrackOfPieces = (trackOfPieces, move) => {
    let hasArrived = false;
    if ((move.to[1] === "7" && move.color === "w") || (move.to[1] === "2" && move.color === "b")) {
        hasArrived = true;
    }
    const newTrackOfPieces = trackOfPieces.map((piece) => {
        if (piece.square === move.from) {
            return {...piece, square: move.to, hasArrived: hasArrived || piece.hasArrived};
        }
        return piece;
    });
    return newTrackOfPieces;
    };

export default function RapportChessBoard(props) {
  const position = props.position || "start";

  return (
    <RapportChess
      position={position}
      rapportDisabled={props.rapportDisabled}
      parentSetHistory={props.parentSetHistory}
      history={props.history}
      >
      {({ position, onDrop, allowDrag }) => (
        <Chessboard
          position={position}
          onDrop={onDrop}
          allowDrag={allowDrag}
          orientation={props.orientation}

        />
      )}
    </RapportChess>
  );
}