
import { getStonePosition, initBoard, serverIp } from '../../tools/tools'
import printBoard from '../../tools/printBoard'
import { checkEndGame } from '../../tools/checkEndGame'
import { io } from "socket.io-client"

/*
//AUTO PLAY

const setEndGame = (data) => {
}

const launchAi = data => {
	data.startAi = window.performance.now()
	data.aiLaunched = true
	data.socket.emit('ai', {aiColor : data.aiColor, board : data.board})
}

const receiveAiMove = (data, pos) => {
	data.aiLaunched = false
    const timeAi = Math.floor(window.performance.now() - data.startAi)
    data.board[pos.y][pos.x] = data.playerColor === data.BLACK ? data.WHITE : data.BLACK
    data.piecesOnBoard += 1
    var nbSeconds = Math.floor(timeAi / 1000) % 1000
    var nbMilliSeconds = `${timeAi % 1000}`.padStart(3, '0')
    data.aiMoves += 1
	data.piecesOnBoard += 1
    data.aiTotalTime += parseFloat(`${nbSeconds}.${nbMilliSeconds}`)
	console.log(`timer : ${nbSeconds},${nbMilliSeconds}s`)
	console.log(`average : ${(data.aiTotalTime / data.aiMoves).toFixed(3)}s`)
    printBoard(data)
    if ((data.endGame = checkEndGame(data))){
        setEndGame(data)
        return
    }
	data.aiColor = data.aiColor === data.BLACK ? data.WHITE : data.BLACK
	data.playerColor = data.aiColor === data.BLACK ? data.WHITE : data.BLACK
	launchAi(data)
}

const initGame = (images, firstPlayerColor) => {
    var data = {}
	data.socket = io(serverIp, {query : {page : 'human vs human'}})
    data.WHITE = 1
    data.BLACK = 2
    data.DRAW = 3
    data.canvas = document.getElementById('canvas')
    data.ctx = data.canvas.getContext('2d')
    data.board = initBoard()
    data.turn = firstPlayerColor
    data.piecesOnBoard = 0
    data.firstPlayerColor = firstPlayerColor
    data.images = images
    printBoard(data)
    data.aiMoves = 0
    data.aiTimePlay = 0
	data.aiTotalTime = 0

	data.socket.on('ai', pos => {receiveAiMove(data, pos)})
	data.aiColor = data.firstPlayerColor
	data.playerColor = data.aiColor === data.BLACK ? data.WHITE : data.BLACK
	launchAi(data)
}
*/

// CLICK

const setEndGame = (data) => {
}

const printSuggestion = data => {
    data.ctx.drawImage(
        data.images.suggestion,
        data.images.gomokuBoard.width * data.suggestion.x - 75,
        data.images.gomokuBoard.height * data.suggestion.y - 75
    )
}

const getSuggestion = data => {
	data.aiLaunched = true
	data.startAi = window.performance.now()
	data.aiLaunched = true
	data.socket.emit('ai', {aiColor : data.aiColor, board : data.board})
}

const canvasOnMouseLeave = (e, data) => {
	if (data.endGame)
			return
		printBoard(data)
	if (!data.aiLaunched)
		printSuggestion(data)
}

const canvasOnMouseMove = (e, data) => {
    if (data.endGame || data.aiLaunched)
        return
    var canvasOffsetWidth = data.canvas.offsetWidth
    var canvasOffsetHeight = data.canvas.offsetHeight
    var stone = getStonePosition(data, e, canvasOffsetWidth, canvasOffsetHeight)
    if (stone.y === 19)
        return
    if (!data.board[stone.y][stone.x]){
        printBoard(data)
        printSuggestion(data)
        data.ctx.globalAlpha = 0.5
        data.ctx.drawImage(
            data.aiColor === data.WHITE ? data.images.whitePiece : data.images.blackPiece,
            data.images.gomokuBoard.width * stone.x,
            data.images.gomokuBoard.height * stone.y
        )
        data.ctx.globalAlpha = 1
    }
    else{
        printBoard(data)
        printSuggestion(data)
    }
}

const canvasOnClick = (e, data) => {
    if (data.endGame || data.aiLaunched)
        return
    var canvasOffsetWidth = data.canvas.offsetWidth
    var canvasOffsetHeight = data.canvas.offsetHeight
    var stone = getStonePosition(data, e, canvasOffsetWidth, canvasOffsetHeight)
    if (!data.board[stone.y][stone.x]){
        data.board[stone.y][stone.x] = data.aiColor
        data.piecesOnBoard += 1
        printBoard(data)
        if ((data.endGame = checkEndGame(data))){
            setEndGame(data)
            return
        }
        data.aiColor = data.aiColor === data.BLACK ? data.WHITE : data.BLACK
		data.playerColor = data.aiColor === data.BLACK ? data.WHITE : data.BLACK
        getSuggestion(data)
    }
}

const launchAi = data => {
	data.startAi = window.performance.now()
	data.aiLaunched = true
	data.socket.emit('ai', {aiColor : data.aiColor, board : data.board})
}

const receiveAiMove = (data, pos) => {
	data.aiLaunched = false
    const timeAi = Math.floor(window.performance.now() - data.startAi)
	data.suggestion = {x : pos.x, y : pos.y}
    data.piecesOnBoard += 1
    var nbSeconds = Math.floor(timeAi / 1000) % 1000
    var nbMilliSeconds = `${timeAi % 1000}`.padStart(3, '0')
    data.aiMoves += 1
	data.piecesOnBoard += 1
    data.aiTotalTime += parseFloat(`${nbSeconds}.${nbMilliSeconds}`)
    printBoard(data)
	printSuggestion(data)
    if ((data.endGame = checkEndGame(data))){
        setEndGame(data)
        return
    }
}

const initGame = (images, firstPlayerColor) => {
    var data = {}
	data.socket = io(serverIp, {query : {page : 'human vs human'}})
	data.socket.on('ai', pos => {receiveAiMove(data, pos)})
    data.WHITE = 1
    data.BLACK = 2
    data.DRAW = 3
    data.canvas = document.getElementById('canvas')
    data.ctx = data.canvas.getContext('2d')
    data.board = initBoard()
    data.turn = firstPlayerColor
    data.piecesOnBoard = 0
    data.firstPlayerColor = firstPlayerColor
    data.images = images
    data.aiMoves = 0
    data.aiTimePlay = 0
	data.aiColor = data.firstPlayerColor
	data.playerColor = data.aiColor === data.BLACK ? data.WHITE : data.BLACK
	data.canvas.onclick = e => canvasOnClick(e, data)
	data.canvas.onmouseleave = e => canvasOnMouseLeave(e, data)
	data.canvas.onmousemove = e => canvasOnMouseMove(e, data)
	getSuggestion(data)
	launchAi(data)
}


export default initGame