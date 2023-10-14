import printBoard from "./printBoard"
import capture from '../sounds/capture.mp3'

const printCapturedStones = (data, captured, sizeStones, color) => {
	var stone

	if (color === data.BLACK)
		stone = data.images.blackPiece
	else
		stone = data.images.whitePiece
	for (var c = 0; c < captured.length; c += 1){
		data.ctx.drawImage(
			stone,
			data.images.gomokuBoard.width * captured[c].x - ((sizeStones.width - data.images.gomokuBoard.width) / 2),
			data.images.gomokuBoard.height * captured[c].y - ((sizeStones.height - data.images.gomokuBoard.height) / 2),
			sizeStones.width,
			sizeStones.height
		)
	}
}

const check_capture = (data, captured, pos, xIncrement, yIncrement, color, ennemyColor) => {
	var x;
	var y;

	x = pos.x + xIncrement
	y = pos.y + yIncrement
	if (!(x >= 0 && x < 19 && y >= 0 && y < 19
	&& data.board[y][x] === ennemyColor))
		return
	x += xIncrement
	y += yIncrement
	if (!(x >= 0 && x < 19 && y >= 0 && y < 19
	&& data.board[y][x] === ennemyColor))
		return ;
	x += xIncrement
	y += yIncrement
	if (!(x >= 0 && x < 19 && y >= 0 && y < 19
		&& data.board[y][x] === color))
		return ;
	captured.push({x : pos.x + xIncrement, y : pos.y + yIncrement})
	captured.push({x : pos.x + 2 * xIncrement, y : pos.y + 2 * yIncrement})
}

const getCapturedStones = (data, captured, pos, color, ennemyColor) => {

	check_capture(data, captured, pos, 0, -1, color, ennemyColor)
	check_capture(data, captured, pos, 1, -1, color, ennemyColor)
	check_capture(data, captured, pos, 1, 0, color, ennemyColor)
	check_capture(data, captured, pos, 1, 1, color, ennemyColor)
	check_capture(data, captured, pos, 0, 1, color, ennemyColor)
	check_capture(data, captured, pos, -1, 1, color, ennemyColor)
	check_capture(data, captured, pos, -1, 0, color, ennemyColor)
	check_capture(data, captured, pos, -1, -1, color, ennemyColor)
}

async function launchCaptureAnimation(data, pos, color){
	return new Promise((resolve, reject) => {
		var captured = [];
		var ennemyColor;
		if (color === data.BLACK)
			ennemyColor = data.WHITE
		else
			ennemyColor = data.BLACK
		getCapturedStones(data, captured, pos, color, ennemyColor)
		if (!captured.length){
			resolve(0)
			return
		}
		if (color === data.BLACK)
			data.captures.black += captured.length
		else
			data.captures.white += captured.length
		for (var c = 0; c < captured.length; c += 1){
			data.board[captured[c].y][captured[c].x] = 0;
		}
		data.piecesOnBoard -= captured.length
		var sizeStones = {}
		sizeStones.width = data.images.gomokuBoard.width
		sizeStones.height = data.images.gomokuBoard.height
		var audio = new Audio(capture)
		audio.play()
		var inter = setInterval(() => {
			printBoard(data)
			printCapturedStones(data, captured, sizeStones, ennemyColor)
			sizeStones.width -= data.images.gomokuBoard.width / 70
			sizeStones.height -= data.images.gomokuBoard.height / 70
			if (sizeStones.width <= 0 && sizeStones.height <= 0){
				clearInterval(inter)
				resolve(captured.length)
				return
			}
		}, 10)
	})
}

export default launchCaptureAnimation