
const SYMBOLS = {
    "N": "♞",
    "B": "♝",
    "R": "♜",
    "Q": "♛",
    "K": "♚",
    "P": "♟",
}


function transformArrayToPGN(array) {
    let pgn = "";
    for (let i = 0; i < array.length; i++) {
        if (i % 2 === 0) {
            pgn += `${Math.floor(i / 2) + 1}. `;
        }
        pgn += `${array[i]} `;
    }
    return pgn;
}
// 1. Nf3 Nf6 2. d4 d5

function transformMovesInArray(array) {
    let newArray = [];
    // iterate by 2
    for (let i = 0; i < array.length; i += 2) {
        let move = {
            white: transformNotation(array[i]),
            black: transformNotation(array[i + 1])
        };
        newArray.push(move);
    }
    return newArray;
}

function transformNotation(move){
    if (move === undefined) {
        return "";
    }
    if (move.length === 2 || "O" === move[0]) {
        return move;
    }
    let newMove = "";
    for (let i = 0; i < move.length; i++) {
        if (SYMBOLS[move[i]]) {
            newMove += SYMBOLS[move[i]];
        } else {
            newMove += move[i];
        }
    }
    return newMove;
}



export{
    transformArrayToPGN,
    transformMovesInArray,
}