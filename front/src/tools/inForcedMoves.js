const inForcedMoves = (data, x, y) => {
	if (!data.forcedMoves.length)
		return true
	for (var c = 0; c < data.forcedMoves.length; c += 1){
		if (data.forcedMoves[c].x === x && data.forcedMoves[c].y === y)
			return true
	}
	return false
}

export default inForcedMoves