
import { getStonePosition, initBoard } from '../../tools/tools'
import printBoard from '../../tools/printBoard'
import { checkEndGame } from '../../tools/checkEndGame'
import ai from '../../tools/ai/ai'

const getSuggestion = data => {
    data.playerColor = data.turn === data.WHITE ? data.BLACK : data.WHITE
    return ai(data)
}

const printSuggestion = data => {
    data.ctx.drawImage(
        data.images.suggestion,
        data.images.gomokuBoard.width * data.suggestion.x - 75,
        data.images.gomokuBoard.height * data.suggestion.y - 75
    )
}

const setEndGame = (data) => {

}

const canvasOnMouseMove = (e, data) => {
    if (data.endGame)
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
            data.turn === data.WHITE ? data.images.whitePiece : data.images.blackPiece,
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
    if (data.endGame)
        return
    var canvasOffsetWidth = data.canvas.offsetWidth
    var canvasOffsetHeight = data.canvas.offsetHeight
    var stone = getStonePosition(data, e, canvasOffsetWidth, canvasOffsetHeight)
    if (!data.board[stone.y][stone.x]){
        data.board[stone.y][stone.x] = data.turn
        data.piecesOnBoard += 1
        printBoard(data)
        if ((data.endGame = checkEndGame(data))){
            setEndGame(data)
            return
        }
        data.turn = data.turn === data.WHITE ? data.BLACK : data.WHITE
        data.suggestion = getSuggestion(data)
        printSuggestion(data)
    }
}

const canvasOnMouseLeave = (e, data) => {
    if (data.endGame)
            return
        printBoard(data)
        printSuggestion(data)
}

const initGame = (images, firstPlayerColor) => {
    var data = {}
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
    data.suggestion = getSuggestion(data)
    printBoard(data)
    printSuggestion(data)
    data.canvas.onmousemove = e => canvasOnMouseMove(e, data)
    data.canvas.onclick = e => canvasOnClick(e, data)
    data.canvas.onmouseleave = e => canvasOnMouseLeave(e, data)
}

export default initGame