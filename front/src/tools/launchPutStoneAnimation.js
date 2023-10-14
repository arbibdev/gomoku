import printBoard from "./printBoard"
import putStone from '../sounds/putStone.mp3'

const printNewStone = (data, newStone, pos, color) => {
	var stone
	if (color === data.BLACK)
		stone = data.images.blackPiece
	else
		stone = data.images.whitePiece
	data.ctx.drawImage(
		stone,
		data.images.gomokuBoard.width * pos.x - ((newStone.width - data.images.gomokuBoard.width) / 2),
		data.images.gomokuBoard.height * pos.y - ((newStone.height - data.images.gomokuBoard.height) / 2),
		newStone.width,
		newStone.height
	)
}

async function launchPutStoneAnimation(data, pos, color){
	return new Promise((resolve, reject) => {
		var newStone = {}
		newStone.width = data.images.gomokuBoard.width * 10;
		newStone.height = data.images.gomokuBoard.height * 10;
		var inter = setInterval(() => {
			printBoard(data)
			printNewStone(data, newStone, pos, color);
			newStone.width -= data.images.gomokuBoard.width / 4;
			newStone.height -= data.images.gomokuBoard.height / 4;
			if (newStone.width <= data.images.gomokuBoard.width &&
			newStone.height <= data.images.gomokuBoard.height){
				data.board[pos.y][pos.x] = color
				data.piecesOnBoard += 1;
				printBoard(data)
				clearInterval(inter)
				var audio = new Audio(putStone)
				audio.play();
				resolve()
			}
		}, 10);
	})
}

export default launchPutStoneAnimation