import ai from '../../tools/ai/ai'
import { checkEndGame } from '../../tools/checkEndGame'
import printBoard from '../../tools/printBoard'
import { getStonePosition, initBoard } from '../../tools/tools'

const canvasOnMouseMove = (e, data) => {
    if (data.endGame || data.turn === 'ia')
        return
    var canvasOffsetWidth = data.canvas.offsetWidth
    var canvasOffsetHeight = data.canvas.offsetHeight
    var stone = getStonePosition(data, e, canvasOffsetWidth, canvasOffsetHeight)
    if (stone.y === 19)
        return
    if (!data.board[stone.y][stone.x]){
        printBoard(data)
        data.ctx.globalAlpha = 0.5
        data.ctx.drawImage(
            data.playerColor === data.WHITE ? data.images.whitePiece : data.images.blackPiece,
            data.images.gomokuBoard.width * stone.x,
            data.images.gomokuBoard.height * stone.y
        )
        data.ctx.globalAlpha = 1
    }
    else
        printBoard(data)
}

const setEndGame = (data) => {
    var params = {}
    params[data.DRAW] = {
        text : 'END OF GAME, NO WINNER',
        color : 'orange'
    }
    params[data.playerColor] = {
        text : 'YOU WON THE GAME !',
        color : 'green'
    }
    params[data.iaColor] = {
        text : 'YOU LOST THE GAME',
        color : 'red'
    }
    document.getElementById('endGame').style.color = params[data.endGame].color
    document.getElementById('endGame').innerHTML = params[data.endGame].text
    document.getElementById('newGame').style.display = 'block'
}

const launchAi = (data) => {
    const startIa = window.performance.now()
    var pos = ai(data)
    const timeIa = Math.floor(window.performance.now() - startIa)
    data.board[pos.y][pos.x] = data.playerColor === data.BLACK ? data.WHITE : data.BLACK
    data.piecesOnBoard += 1
    var nbSeconds = Math.floor(timeIa / 1000) % 1000
    var nbMilliSeconds = `${timeIa % 1000}`.padStart(3, '0')
    data.iaMoves += 1
    data.iaTotalTime += parseFloat(`${nbSeconds}.${nbMilliSeconds}`)
    document.getElementById('timer').innerHTML = `${nbSeconds},${nbMilliSeconds}s`
    document.getElementById('timerAverage').innerHTML = `${(data.iaTotalTime / data.iaMoves).toFixed(3)}s`
    printBoard(data)
    if ((data.endGame = checkEndGame(data))){
        setEndGame(data)
        return
    }
    data.turn = 'human'
}

const canvasOnClick = (e, data) => {
    if (data.endGame || data.turn === 'ia')
        return
    var canvasOffsetWidth = data.canvas.offsetWidth
    var canvasOffsetHeight = data.canvas.offsetHeight
    var stone = getStonePosition(data, e, canvasOffsetWidth, canvasOffsetHeight)
    if (!data.board[stone.y][stone.x]){
        data.board[stone.y][stone.x] = data.playerColor
        data.piecesOnBoard += 1
        printBoard(data)
        if ((data.endGame = checkEndGame(data))){
            setEndGame(data)
            return
        }
        data.turn = 'ia'
        launchAi(data, data.images, data.playerColor)
    }
}

const canvasOnMouseLeave = (e, data) => {
    if (data.endGame || data.turn === 'ia')
            return
        printBoard(data)
}

const initGame = (images, playerColor, firstPlayer) => {
    var data = {}
    data.WHITE = 1
    data.BLACK = 2
    data.DRAW = 3
    data.canvas = document.getElementById('canvas')
    data.ctx = data.canvas.getContext('2d')
    data.board = initBoard()
    data.turn = firstPlayer
    data.iaMoves = 0
    data.iaTotalTime = 0
    data.piecesOnBoard = 0
    data.playerColor = playerColor
    data.iaColor = playerColor === data.WHITE ? data.BLACK : data.WHITE
    data.images = images
    printBoard(data)
    if (data.turn === 'ia')
        launchAi(data)
    data.canvas.onmousemove = e => canvasOnMouseMove(e, data)
    data.canvas.onclick = e => canvasOnClick(e, data)
    data.canvas.onmouseleave = e => canvasOnMouseLeave(e, data)
}

export default initGame