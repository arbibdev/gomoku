const getTwoCapturedStones = (data, color, styles) => {
	var div
	var image
	var src

	div = document.createElement('div')
	div.className = styles.twoCapturedStones
	if (color === data.BLACK)
		src = data.images.whitePiece.src
	else
		src = data.images.blackPiece.src
	for (var c = 0; c < 2; c += 1){
		image = document.createElement('img')
		image.className = styles.capturedStoneImg
		image.src = src
		div.append(image)
	}
	return div
}

const updateCapturedStones = (data, color, captures, styles) => {
	var html

	if (color === data.BLACK){
		html = document.getElementById('blackStonesCaptured')
		document.getElementById('blackCaptures').innerHTML = `${data.captures.black} / 10`
	}
	else{
		html = document.getElementById('whiteStonesCaptured')
		document.getElementById('whiteCaptures').innerHTML = `${data.captures.white} / 10`
	}
	for (var c = 0; c < captures; c += 2)
		html.append(getTwoCapturedStones(data, color, styles))
}

module.exports = {
	updateCapturedStones,
	getTwoCapturedStones
}