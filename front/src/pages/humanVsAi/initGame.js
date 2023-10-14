import inForcedMoves from '../../tools/inForcedMoves'
import { updateCapturedStones, getTwoCapturedStones } from '../../tools/updateCapturedStones'
import checkEndGame from '../../tools/checkEndGame'
import launchPutStoneAnimation from '../../tools/launchPutStoneAnimation'
import launchCaptureAnimation from '../../tools/launchCaptureAnimation'
import printBoard from '../../tools/printBoard'
import { getStonePosition, initBoard, serverIp } from '../../tools/tools'
import { io } from "socket.io-client"
import styles from './humanVsAi.module.css'

const printForcedMoves = data => {
	for (var c = 0; c < data.forcedMoves.length; c += 1){
		data.ctx.drawImage(
			data.images.mandatory,
			data.images.gomokuBoard.width * data.forcedMoves[c].x,
			data.images.gomokuBoard.height * data.forcedMoves[c].y
		)
	}
}

const canvasOnMouseMove = (e, data) => {
	data.mouseEvent = e
	if (!data.mouseEvent)
		return
    if (data.endGame || data.turn === 'ai' || data.ongoingAnimation)
        return
    var canvasOffsetWidth = data.canvas.offsetWidth
    var canvasOffsetHeight = data.canvas.offsetHeight
    var stone = getStonePosition(data, e, canvasOffsetWidth, canvasOffsetHeight)
    if (stone.y === 19)
        return
    if (!data.board[stone.y][stone.x] && inForcedMoves(data, stone.x, stone.y)){
        printBoard(data)
        data.ctx.globalAlpha = 0.5
        data.ctx.drawImage(
            data.playerColor === data.WHITE ? data.images.whitePiece : data.images.blackPiece,
            data.images.gomokuBoard.width * stone.x,
            data.images.gomokuBoard.height * stone.y
        )
        data.ctx.globalAlpha = 1
    }
    else{
        printBoard(data)
		printForcedMoves(data)
	}
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
	if (params[data.endGame]){
		document.getElementById('endGame').style.color = params[data.endGame].color
		document.getElementById('endGame').innerHTML = params[data.endGame].text
		document.getElementById('newGame').style.display = 'block'
	}
	else{
		document.getElementById('endGame').innerHTML = ''
		document.getElementById('newGame').style.display = 'none'
	}
}

const printWinStones = data => {
	for (var c = 0; c < data.winStones.length; c += 1){
		data.ctx.drawImage(
			data.images.flash,
			data.images.gomokuBoard.width * data.winStones[c].x,
			data.images.gomokuBoard.width * data.winStones[c].y
		)
	}
}

const setEndGame = data => {
	// console.log(data.winStones)
	printWinStones(data)
    printEndGameStatus(data)
	data.socket.disconnect()
}

const launchAi = data => {
	data.startAi = window.performance.now()
	data.socket.emit('ai', {
		aiColor : data.aiColor,
		blackCaptures : data.captures.black,
		whiteCaptures : data.captures.white,
		board : data.board
	})
}

const goToNextPlayer = (data, nextPlayer, color, captures) => {
	if (captures)
		updateCapturedStones(data, color, captures, styles)
	if ((data.endGame = checkEndGame(data))){
		saveMove(data)
		setEndGame(data)
		return
	}
	if (data.turn !== data.firstPlayer){
		data.turns += 1
		document.getElementById('turn').innerHTML = data.turns
	}
	if (data.turn === 'ai')
		saveMove(data)
	if (nextPlayer === 'human'){
		data.turn = 'human'
		data.ongoingAnimation = 0
		canvasOnMouseMove(data.mouseEvent, data)
	}
	else if (nextPlayer === 'ai'){
		data.turn = 'ai'
		data.ongoingAnimation = 0
		launchAi(data, data.images, data.playerColor)
	}
	
}

async function receiveAiMove(data, pos){
    const timeAi = Math.floor(window.performance.now() - data.startAi)
    var nbSeconds = Math.floor(timeAi / 1000) % 1000
    var nbMilliSeconds = `${timeAi % 1000}`.padStart(3, '0')
    data.aiMoves += 1
    data.aiTotalTime += parseFloat(`${nbSeconds}.${nbMilliSeconds}`)
	data.timer = {
		lastMove : `${nbSeconds},${nbMilliSeconds}s`,
		average : `${(data.aiTotalTime / data.aiMoves).toFixed(3)}s`
	}
    document.getElementById('timer').innerHTML = data.timer.lastMove
    document.getElementById('timerAverage').innerHTML = data.timer.average
	data.ongoingAnimation = 1
	launchPutStoneAnimation(data, pos, data.aiColor, 'human').then(() => {
		launchCaptureAnimation(data, pos, data.aiColor, 'human').then((captures) => {
			goToNextPlayer(data, 'human', data.aiColor, captures)
		})
	})
}

const canvasOnClick = (e, data) => {
	data.mouseEvent = e
    if (data.endGame || data.turn === 'ai' || data.ongoingAnimation)
        return
    var canvasOffsetWidth = data.canvas.offsetWidth
    var canvasOffsetHeight = data.canvas.offsetHeight
    var stone = getStonePosition(data, e, canvasOffsetWidth, canvasOffsetHeight)
    if (!data.board[stone.y][stone.x] && inForcedMoves(data, stone.x, stone.y)){
		data.ongoingAnimation = 1
		launchPutStoneAnimation(data, stone, data.playerColor).then(() => {
			launchCaptureAnimation(data, stone, data.playerColor).then((captures) => {
				goToNextPlayer(data, 'ai', data.playerColor, captures)
			})
		})
    }
}

const canvasOnMouseLeave = (e, data) => {
	data.mouseEvent = false
    if (data.endGame || data.turn === 'ai' || data.ongoingAnimation)
            return
    printBoard(data)
	printForcedMoves(data)
}

// const choosenBoard = () => {
// 	return [
// 		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
// 		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
// 		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
// 		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
// 		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
// 		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
// 		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0],
// 		[0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0],
// 		[0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0],
// 		[0, 0, 0, 0, 0, 0, 0, 2, 1, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0],
// 		[0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0],
// 		[0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 2, 1, 1, 1, 1, 2, 0, 0, 0],
// 		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
// 		[0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
// 		[0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
// 		[0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
// 		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
// 		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
// 		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
// 	]
// }

const choosenBoard = (startBoard) => {
	var board = []
	for (var y = 0; y < 19; y += 1){
		board[y] = []
		for (var x = 0; x < 19; x += 1){
			board[y][x] = startBoard[y][x]
		}
	}
	return board
}

const currentBoard = data => {
	var board = []
	for (var y = 0; y < 19; y += 1){
		board[y] = []
		for (var x = 0; x < 19; x += 1){
			board[y][x] = data.board[y][x]
		}
	}
	return board

}

const historyBoard = data => {
	var board = []
	for (var y = 0; y < 19; y += 1){
		board[y] = []
		for (var x = 0; x < 19; x += 1){
			board[y][x] = data.history.current.history[data.history.current.position].board[y][x]
		}
	}
	return board

}

const currentForcedMoves = data => {
	var forcedMoves = []

	for (var c = 0; c < data.forcedMoves.length; c += 1){
		forcedMoves.push({...data.forcedMoves[c]})
	}
	return forcedMoves
}

const currentWinStones = data => {
	var winStones = []

	for (var c = 0; c < data.winStones.length; c += 1){
		winStones.push({...data.winStones[c]})
	}
	return winStones
}

const saveMove = (data) => {
	if (data.history.current.position !== false){
		while (data.history.current.history.length !== data.history.current.position + 1)
			data.history.current.history.pop()
	}
	data.history.current.history.push(
		{
			board : currentBoard(data),
			aiMoves : data.aiMoves,
			piecesOnBoard : data.piecesOnBoard,
			turns : data.turns,
			captures : {...data.captures},
			forcedMoves : currentForcedMoves(data),
			aiTotalTime : data.aiTotalTime,
			winStones : currentWinStones(data),
			endGame : data.endGame,
			timer : {...data.timer}
		}
	)
	if (data.history.current.position !== false)
		data.history.current.position += 1
	else
		data.history.current.position = 0
}

const historyForcedMoves = data => {
	var forcedMoves = []

	for (var c = 0; c < data.history.current.history[data.history.current.position].forcedMoves.length; c += 1){
		forcedMoves.push({...data.history.current.history[data.history.current.position].forcedMoves[c]})
	}
	return forcedMoves
}

const historyWinStones = data => {
	var winStones = []

	for (var c = 0; c < data.history.current.history[data.history.current.position].winStones.length; c += 1){
		winStones.push({...data.history.current.history[data.history.current.position].winStones[c]})
	}
	return winStones
}

const getHistory = data => {
	if (data.history.current.position === false)
		return
	data.board = historyBoard(data)
	data.aiMoves = data.history.current.history[data.history.current.position].aiMoves
	data.piecesOnBoard = data.history.current.history[data.history.current.position].piecesOnBoard
	data.turns = data.history.current.history[data.history.current.position].turns
	data.captures = {...data.history.current.history[data.history.current.position].captures}
	data.forcedMoves = historyForcedMoves(data)
	data.aiTotalTime = data.history.current.history[data.history.current.position].aiTotalTime
	data.winStones = historyWinStones(data)
	data.endGame = data.history.current.history[data.history.current.position].endGame
	data.timer = {...data.history.current.history[data.history.current.position].timer}
	// if (data.history.current.history[data.history.current.position].posAiMove)
	// 	data.posAiMove = {...data.history.current.history[data.history.current.position].posAiMove}
	// else
	// 	data.posAiMove = false
}

const getSettingsBoard = data => {
	if (data.history.current.position !== false)
		return
	if (!data.settings.startBoard)
    	data.board = initBoard()
	else
		data.board = choosenBoard(data.settings.startBoard)
}

const getParameters =  (images, playerColor, firstPlayer, settings, history, data) => {
	data.socket = io(serverIp, {query : {page : 'human vs ai'}})
	data.images = images
	data.playerColor = playerColor
	data.firstPlayer = firstPlayer
	data.settings = settings
	data.history = history
}
const initVariables = data => {
	data.turns = 1
	data.captures = {black : 0, white : 0}
	data.ongoingAnimation = 0
	data.forcedMoves = []
	data.WHITE = 1
    data.BLACK = 2
    data.DRAW = 3
	data.canvas = document.getElementById('canvas')
    data.ctx = data.canvas.getContext('2d')
	data.aiMoves = 0
	data.aiTotalTime = 0
    data.piecesOnBoard = 0
	data.turn = data.firstPlayer
	data.aiColor = data.playerColor === data.WHITE ? data.BLACK : data.WHITE
	data.winStones = []
	data.timer = {lastMove : '0s', average : '0s'}
	data.socket.on('ai', pos => {receiveAiMove(data, pos)})
}

const initEvents = data => {
	data.canvas.onmousemove = e => canvasOnMouseMove(e, data)
    data.canvas.onclick = e => canvasOnClick(e, data)
    data.canvas.onmouseleave = e => canvasOnMouseLeave(e, data)
	data.canvas.onmouseenter = e => canvasOnMouseMove(e, data)
}

const setCaptures = data => {
	document.getElementById('blackCaptures').innerHTML = `${data.captures.black} / 10`
	document.getElementById('whiteCaptures').innerHTML = `${data.captures.white} / 10`
	document.getElementById('blackStonesCaptured').innerHTML = ''
	for (var c = 0; c < data.captures.black; c += 2)
		document.getElementById('blackStonesCaptured').append(getTwoCapturedStones(data, data.BLACK, styles))
	document.getElementById('whiteStonesCaptured').innerHTML = ''
	for (c = 0; c < data.captures.white; c += 2)
		document.getElementById('whiteStonesCaptured').append(getTwoCapturedStones(data, data.WHITE, styles))
}

const moveInGame = data => {
	document.getElementById('turn').innerHTML = data.turns
	setCaptures(data)
	printEndGameStatus(data)
	document.getElementById('timer').innerHTML = data.timer.lastMove
    document.getElementById('timerAverage').innerHTML = data.timer.average
}

const initGame = (images, playerColor, firstPlayer, settings, history) => {
	var data = {}
	getParameters(images, playerColor, firstPlayer, settings, history, data)
	initVariables(data)
	getSettingsBoard(data)
	getHistory(data)
	printBoard(data)
	printEndGameStatus(data)
	if (data.turn === 'ai'){
		launchAi(data)
		initEvents(data)
	}
	else if (data.history.current.position === false){
		saveMove(data)
		initEvents(data)
	}
	else{
		moveInGame(data)
		initEvents(data)
		printForcedMoves(data)
		printWinStones(data)
	}
}

export default initGame