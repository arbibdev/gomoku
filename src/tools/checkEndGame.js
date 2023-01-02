const checkStones = (x, y, board, orientation) => {
    var nb = 0
    var color = board[y][x]
    while (orientation === 'vertical' && y++ < 19 && board[y - 1][x] === color)nb++
    while (orientation === 'horizontal' && x++ < 19 && board[y][x - 1] === color)nb++
    while (orientation === 'diagonal1' && x++ < 19 && y++ < 19 && board[y - 1][x - 1] === color)nb++
    while (orientation === 'diagonal2' && x-- >= 0 && y++ < 19 && board[y - 1][x + 1] === color)nb++
    if (nb >= 5)
        return color
    return false
}

const checkAlignment = (x, y, board) => {
    var winner
    if (
        (winner = checkStones(x, y, board, 'vertical')) ||
        (winner = checkStones(x, y, board, 'horizontal')) ||
        (winner = checkStones(x, y, board, 'diagonal1')) ||
        (winner = checkStones(x, y, board, 'diagonal2'))
    )
        return winner
    return false
}

const checkWinner = (board) => {
    var winner
    for (var y = 0; y < 19; y++){
        for (var x = 0; x < 19; x++){
            if (board[y][x] && (winner = checkAlignment(x, y, board)))
                return winner
        }
    }
    return false
}

const checkEndGame = (data) => {
    var winner = checkWinner(data.board)
    if (data.piecesOnBoard === 361)
        return data.DRAW
    if (winner)
        return winner
    return false
}

module.exports = {
    checkEndGame,
    checkWinner
}