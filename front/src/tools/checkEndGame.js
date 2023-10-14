const inBoard = pos => {
	if (pos.x >= 0 && pos.x < 19 && pos.y >= 0 && pos.y < 19)
		return true
	return false
}

const getColor = (board, pos) => {
	return board[pos.y][pos.x]
}

const possibleCapture = (data, x, y, color, ennemyColor, increment) => {
	var pos
	var forcedMoves = []
	for (var c = 0; c < 3; c += 1){
		pos = [
			{x : x + increment[c][0] * 2, y : y + increment[c][1] * 2},
			{x : x + increment[c][0], y : y + increment[c][1]},
			{x, y},
			{x : x - increment[c][0], y : y - increment[c][1]},
			{x : x - increment[c][0] * 2, y : y - increment[c][1] * 2}
		]
		if (inBoard(pos[0]) && getColor(data.board, pos[0]) === color &&
		inBoard(pos[1]) && getColor(data.board, pos[1]) === ennemyColor &&
		inBoard(pos[3]) && getColor(data.board, pos[3]) === 0)
			forcedMoves.push(pos[3])
		if (inBoard(pos[1]) && getColor(data.board, pos[1]) === color &&
		inBoard(pos[3]) && getColor(data.board, pos[3]) === ennemyColor &&
		inBoard(pos[4]) && getColor(data.board, pos[4]) === 0)
			forcedMoves.push(pos[4])
		if (inBoard(pos[1]) && getColor(data.board, pos[1]) === 0 &&
		inBoard(pos[3]) && getColor(data.board, pos[3]) === ennemyColor &&
		inBoard(pos[4]) && getColor(data.board, pos[4]) === color)
			forcedMoves.push(pos[1])
		if (inBoard(pos[0]) && getColor(data.board, pos[0]) === 0 &&
		inBoard(pos[1]) && getColor(data.board, pos[1]) === ennemyColor &&
		inBoard(pos[3]) && getColor(data.board, pos[3]) === color)
			forcedMoves.push(pos[0])
	}
	if (forcedMoves.length)
		return forcedMoves
	return false
}

const checkPossibleCaptures = (data, x, y, ennemyColor, color, captureIncrement,
sizeAlignment, xIncrement, yIncrement) => {
	var forcedMoves = []
	var res
	var sizeMaxAlignment = 0
	var count = 0
	for (var c = 0; c < sizeAlignment; c += 1){
		res = possibleCapture(data, x, y, ennemyColor, color, captureIncrement)
		if (res){
			forcedMoves.push(...res)
			if (count > sizeMaxAlignment)
				sizeMaxAlignment = count
			count = 0
		}
		else
			count += 1
		x += xIncrement
		y += yIncrement
	}
	if (sizeMaxAlignment >= 5 || count >= 5)
		return false
	return forcedMoves
}

const checkAlignment = (x, y, data, xIncrement, yIncrement, captureIncrement) => {
	var sizeAlignment = 0
	var color = data.board[y][x]
	var ennemyColor
	var saveX
	var saveY
	var forcedMoves = []
	var alignment = []
	saveX = x
	saveY = y
	if (color === data.BLACK)
		ennemyColor = data.WHITE
	else
		ennemyColor = data.BLACK
	while (x >= 0 && x < 19 && y >= 0 && y < 19 && data.board[y][x] === color){
		alignment.push({x, y})
		sizeAlignment += 1;
		x += xIncrement
		y += yIncrement
	}
	if (sizeAlignment >= 5)
	{
		forcedMoves = checkPossibleCaptures(data, saveX, saveY, ennemyColor,
		color, captureIncrement, sizeAlignment, xIncrement, yIncrement)
		if (forcedMoves){
			data.forcedMoves.push(...forcedMoves)
			return false
		}
		data.winStones.push(...alignment)
		return color
	}
	return false
}

const checkAlignments = (x, y, data) => {
	var res = []

	res[0] = checkAlignment(x, y, data, 0, 1, [[-1, 0], [-1, -1], [-1, 1]])
	res[1] = checkAlignment(x, y, data, 1, 0, [[0, -1], [-1, -1], [1, -1]])
	res[2] = checkAlignment(x, y, data, 1, 1, [[-1, 1], [-1, 0], [0, 1]])
	res[3] = checkAlignment(x, y, data, -1, 1, [[-1, -1], [0, -1], [-1, 0]])
	for (var c = 0; c < 4; c += 1){
		if (res[c])
			return res[c]
	}
    return false
}

const checkBoard = data => {
    var winner
	var res
	winner = false
	data.forcedMoves = []
    for (var y = 0; y < 19; y++){
        for (var x = 0; x < 19; x++){
            if (data.board[y][x]){
				res = checkAlignments(x, y, data)
				if (res)
            		winner = res
			}
        }
	}
	return winner
}

const checkEndGame = (data) => {
    if (data.piecesOnBoard === 361)
        return data.DRAW
	if (data.captures.white >= 10)
		return data.WHITE
	if (data.captures.black >= 10)
		return data.BLACK
	return checkBoard(data)
}

export default checkEndGame