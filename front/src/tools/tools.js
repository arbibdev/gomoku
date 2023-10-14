function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

const getStonePosition = (data, e, canvasOffsetWidth, canvasOffsetHeight) => {
    return {
        x : Math.floor(((e.offsetX * data.canvas.width) / canvasOffsetWidth) / (data.canvas.width / 19)),
        y : Math.floor(((e.offsetY * data.canvas.height) / canvasOffsetHeight) / (data.canvas.height / 19))
    }
}

const initBoard = () => {
    var board = []
    for (var y = 0; y < 19; y++){
        board[y] = []
        for (var x = 0; x < 19; x++){
            board[y][x] = 0
        }
    }
    return board
}

const serverIp = "http://localhost:8080/"

module.exports = {
    getRandomInt,
    getStonePosition,
    initBoard,
	serverIp
}