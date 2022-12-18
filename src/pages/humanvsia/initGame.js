const printBackground = (data, images) => {
    data.ctx.fillStyle = '#a6683e'
    data.ctx.fillRect(0, 0, data.canvas.width, data.canvas.height)
    for (var y = 0; y < 18; y++){
        for (var x = 0; x < 18; x++)
            data.ctx.drawImage(
                images.gomokuBoard,
                x * images.gomokuBoard.width + images.blackPiece.width / 2,
                y * images.gomokuBoard.height + images.blackPiece.width / 2
            )
    }
}

const initGame = (images, playerColor) => {
    var data = {}
    data.canvas = document.getElementById('canvas')
    data.ctx = data.canvas.getContext('2d')
    printBackground(data, images)
    data.canvas.onmousemove = (e) => {
        var canvasOffsetWidth = data.canvas.offsetWidth
        var canvasOffsetHeight = data.canvas.offsetHeight
        var widthSquare = canvasOffsetWidth / 19
        var heightSquare = canvasOffsetHeight / 19
        printBackground(data, images)
        data.ctx.drawImage(
            playerColor === 'white' ? images.whitePiece : images.blackPiece,(
                (Math.floor(e.offsetX / widthSquare) * widthSquare) *
                (data.canvas.width / canvasOffsetWidth) +
                (data.canvas.width / 19) / 2 - images.blackPiece.width / 2
            ),(
                (Math.floor(e.offsetY / heightSquare) * heightSquare) *
                (data.canvas.height / canvasOffsetHeight) +
                (data.canvas.height / 19) / 2 - images.blackPiece.height / 2
            )
        )
    }
    data.canvas.onmouseleave = () => {
        printBackground(data, images)
    }
}

export default initGame