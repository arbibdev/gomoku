import ia from './ia'
import checkEndGame from './checkEndGame'

const printBackground = (data, images) => {
    data.ctx.fillStyle = '#a6683e'
    data.ctx.fillRect(0, 0, data.canvas.width, data.canvas.height)
    for (var y = 0; y < 18; y++){
        for (var x = 0; x < 18; x++)
            data.ctx.drawImage(
                images.gomokuBoard,
                x * images.gomokuBoard.width + images.blackPiece.width / 2,
                y * images.gomokuBoard.height + images.blackPiece.width / 2
            )
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

const printStones = (data, images) => {
    for (var y = 0; y < 19; y++){
        for (var x = 0; x < 19; x++){
            if (data.board[y][x]){
                var stone = data.board[y][x] === 'black' ? images.blackPiece : images.whitePiece
                data.ctx.drawImage(
                    stone,
                    images.gomokuBoard.width * x,
                    images.gomokuBoard.height * y
                )
            }
        }
    }
}

const printBoard = (data, images) => {
    printBackground(data, images)
    printStones(data, images)
}

const getStonePosition = (data, e, canvasOffsetWidth, canvasOffsetHeight) => {
    return {
        x : Math.floor(((e.offsetX * data.canvas.width) / canvasOffsetWidth) / (data.canvas.width / 19)),
        y : Math.floor(((e.offsetY * data.canvas.height) / canvasOffsetHeight) / (data.canvas.height / 19))
    }
}

const canvasOnMouseMove = (e, data, images, playerColor) => {
    if (data.endGame || data.turn === 'ia')
        return
    var canvasOffsetWidth = data.canvas.offsetWidth
    var canvasOffsetHeight = data.canvas.offsetHeight
    var stone = getStonePosition(data, e, canvasOffsetWidth, canvasOffsetHeight)
    printBoard(data, images)
    data.ctx.globalAlpha = 0.5
    data.ctx.drawImage(
        playerColor === 'white' ? images.whitePiece : images.blackPiece,
        images.gomokuBoard.width * stone.x,
        images.gomokuBoard.height * stone.y
    )
    data.ctx.globalAlpha = 1
}

const launchIa = (data, images, playerColor) => {
    const startIa = Date.now();
    var pos = ia(data, playerColor)
    const timeIa = Date.now() - startIa
    data.board[pos.y][pos.x] = playerColor === 'black' ? 'white' : 'black'
    var nbSeconds = Math.floor(timeIa / 1000) % 1000
    var nbMilliSeconds = `${timeIa % 1000}`.padStart(3, '0')
    data.iaMoves += 1
    data.iaTotalTime += parseFloat(`${nbSeconds}.${nbMilliSeconds}`)
    document.getElementById('timer').innerHTML = `${nbSeconds},${nbMilliSeconds}s`
    document.getElementById('timerAverage').innerHTML = (data.iaTotalTime / data.iaMoves).toFixed(3)
    printBoard(data, images)
    if ((data.endGame = checkEndGame(data)) === true)
        return
    data.turn = 'human'
}

const canvasOnClick = (e, data, images, playerColor) => {
    if (data.endGame || data.turn === 'ia')
        return
    var canvasOffsetWidth = data.canvas.offsetWidth
    var canvasOffsetHeight = data.canvas.offsetHeight
    var stone = getStonePosition(data, e, canvasOffsetWidth, canvasOffsetHeight)
    if (!data.board[stone.y][stone.x]){
        data.board[stone.y][stone.x] = playerColor
        printBoard(data, images)
        if ((data.endGame = checkEndGame(data)) === true)
            return
        data.turn = 'ia'
        launchIa(data, images, playerColor)
    }
}

const canvasOnMouseLeave = (e, data, images) => {
    if (data.endGame || data.turn === 'ia')
            return
        printBoard(data, images)
}

const initGame = (images, playerColor, firstPlayer) => {
    var data = {}
    data.canvas = document.getElementById('canvas')
    data.ctx = data.canvas.getContext('2d')
    data.board = initBoard()
    data.turn = firstPlayer
    data.iaMoves = 0
    data.iaTotalTime = 0
    printBoard(data, images)
    if (data.turn === 'ia')
        launchIa(data, images, playerColor)
    data.canvas.onmousemove = e => canvasOnMouseMove(e, data, images, playerColor)
    data.canvas.onclick = e => canvasOnClick(e, data, images, playerColor)
    data.canvas.onmouseleave = e => canvasOnMouseLeave(e, data, images)
}

export default initGame