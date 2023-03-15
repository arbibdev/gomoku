import { checkEndGame } from '../../tools/checkEndGame'
import printBoard from '../../tools/printBoard'
import { getStonePosition, initBoard, serverIp } from '../../tools/tools'
import { io } from "socket.io-client"

const canvasOnMouseMove = (e, data) => {
    if (data.endGame || data.turn === 'ai')
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

const printEndGameStatus = data => {
	var params = {}
    params[data.DRAW] = {
        text : 'END OF GAME, NO WINNER',
        color : 'orange'
    }
    params[data.playerColor] = {
        text : 'YOU WON THE GAME !',
        color : 'green'
    }
    params[data.aiColor] = {
        text : 'YOU LOST THE GAME',
        color : 'red'
    }
    document.getElementById('endGame').style.color = params[data.endGame].color
    document.getElementById('endGame').innerHTML = params[data.endGame].text
    document.getElementById('newGame').style.display = 'block'
}

const setEndGame = data => {
    printEndGameStatus(data)
	data.socket.disconnect()
}

const launchAi = data => {
	data.startAi = window.performance.now()
	data.aiLaunched = true
	data.socket.emit('ai', {aiColor : data.aiColor, board : data.board})
}

const receiveAiMove = (data, pos) => {
    const timeAi = Math.floor(window.performance.now() - data.startAi)
    data.board[pos.y][pos.x] = data.playerColor === data.BLACK ? data.WHITE : data.BLACK
    data.piecesOnBoard += 1
    var nbSeconds = Math.floor(timeAi / 1000) % 1000
    var nbMilliSeconds = `${timeAi % 1000}`.padStart(3, '0')
    data.aiMoves += 1
    data.aiTotalTime += parseFloat(`${nbSeconds}.${nbMilliSeconds}`)
    document.getElementById('timer').innerHTML = `${nbSeconds},${nbMilliSeconds}s`
    document.getElementById('timerAverage').innerHTML = `${(data.aiTotalTime / data.aiMoves).toFixed(3)}s`
    printBoard(data)
    if ((data.endGame = checkEndGame(data))){
        setEndGame(data)
        return
    }
    data.turn = 'human'
	data.aiLaunched = false
}

const canvasOnClick = (e, data) => {
    if (data.endGame || data.turn === 'ai')
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
        data.turn = 'ai'
        launchAi(data, data.images, data.playerColor)
    }
}

const canvasOnMouseLeave = (e, data) => {
    if (data.endGame || data.turn === 'ai')
            return
        printBoard(data)
}

const initGame = (images, playerColor, firstPlayer) => {
	// test()
    var data = {}
	data.socket = io(serverIp, {query : {page : 'human vs ai'}})
	data.aiLaunched = false
    data.WHITE = 1
    data.BLACK = 2
    data.DRAW = 3
    data.canvas = document.getElementById('canvas')
    data.ctx = data.canvas.getContext('2d')
    data.board = initBoard()
    data.turn = firstPlayer
    data.aiMoves = 0
    data.aiTotalTime = 0
    data.piecesOnBoard = 0
    data.playerColor = playerColor
    data.aiColor = playerColor === data.WHITE ? data.BLACK : data.WHITE
    data.images = images
    printBoard(data)
	data.socket.on('ai', pos => {receiveAiMove(data, pos)})
    if (data.turn === 'ai')
        launchAi(data)
    data.canvas.onmousemove = e => canvasOnMouseMove(e, data)
    data.canvas.onclick = e => canvasOnClick(e, data)
    data.canvas.onmouseleave = e => canvasOnMouseLeave(e, data)
}

export default initGame