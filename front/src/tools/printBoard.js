const printBackground = (data) => {
    data.ctx.fillStyle = '#a6683e'
    data.ctx.fillRect(0, 0, data.canvas.width, data.canvas.height)
    for (var y = 0; y < 18; y++){
        for (var x = 0; x < 18; x++)
            data.ctx.drawImage(
                data.images.gomokuBoard,
                x * data.images.gomokuBoard.width + data.images.blackPiece.width / 2,
                y * data.images.gomokuBoard.height + data.images.blackPiece.width / 2
            )
    }
}

const printStones = (data) => {
    for (var y = 0; y < 19; y++){
        for (var x = 0; x < 19; x++){
            if (data.board[y][x]){
                var stone = data.board[y][x] === data.BLACK ? data.images.blackPiece : data.images.whitePiece
                data.ctx.drawImage(
                    stone,
                    data.images.gomokuBoard.width * x,
                    data.images.gomokuBoard.height * y
                )
            }
        }
    }
}



async function printBoard(data){
    printBackground(data)
    printStones(data)
}

export default printBoard