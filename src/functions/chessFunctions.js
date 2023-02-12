
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
            white: array[i],
            black: array[i + 1]
        };
        newArray.push(move);
    }
    return newArray;
}


export{
    transformArrayToPGN,
    transformMovesInArray,
}