import getRandomInt from "../../tools/getRandomInt"

const playRandom = (data, playerColor) => {
    var x = getRandomInt(19)
    var y = getRandomInt(19)
    while (data.board[y][x]){
        x++
        if (x === 19){
            x = 0
            y++
        }
        if (y === 19)
            y = 0
    }
    return {x, y}
}

const ia = (data, playerColor) => {
    return (playRandom(data, playerColor))
    // for (var c = 0; c < 500000000; c++);
}

export default ia