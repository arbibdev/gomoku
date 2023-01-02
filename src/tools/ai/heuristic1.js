import { getBoard } from "./tools"

const singleStonesHeuristic = (board, data) => {
    var heuristic = 0
    var localHeuristic
    var freeNeighbour
    for (var y = 0; y < 19; y++){
        for (var x = 0; x < 19; x++){
            if (board[y][x]){
                localHeuristic = 10
                freeNeighbour = 1
                if (y - 1 >= 0 && !board[y - 1][x])
                    freeNeighbour += 1
                if (y - 1 >= 0 && x + 1 < 19 && !board[y - 1][x + 1])
                    freeNeighbour += 1
                if (x + 1 < 19 && !board[y][x + 1])
                    freeNeighbour += 1
                if (x + 1 < 19 && y + 1 < 19 && !board[y + 1][x + 1])
                    freeNeighbour += 1
                if (y + 1 < 19 && !board[y + 1][x])
                    freeNeighbour += 1
                if (y + 1 < 19 && x - 1 >= 0 && !board[y + 1][x - 1])
                    freeNeighbour += 1
                if (x - 1 >= 0 && !board[y][x - 1])
                    freeNeighbour += 1
                if (x - 1 >= 0 && y - 1 >= 0 && !board[y - 1][x - 1])
                    freeNeighbour += 1
                localHeuristic *= freeNeighbour
                if (localHeuristic > 10)
                {
                    if (board[y][x] === data.aiColor)
                        heuristic += localHeuristic
                    else
                        heuristic -= localHeuristic
                }
            }
        }
    }
    return heuristic
}

const getNeighbour1 = (x, y, board, orientation, data) => {
    if (
        (orientation === data.VERTICAL && y - 1 >= 0 && !board[y - 1][x]) ||
        (orientation === data.HORIZONTAL && x - 1 >= 0 && !board[y][x - 1]) ||
        (orientation === data.DIAGONAL1 && x - 1 >= 0 && y - 1 >= 0 && !board[y - 1][x - 1]) ||
        (orientation === data.DIAGONAL2 && x + 1 < 19 && y - 1 >= 0 && !board[y - 1][x + 1])
    )
        return 1
    return 0
}

const getNeighbour2 = (x, y, board, nb, orientation, data) => {
    if (
        (orientation === data.VERTICAL && y + nb < 19 && !board[y + nb][x]) ||
        (orientation === data.HORIZONTAL && x + nb < 19 && !board[y][x + nb]) ||
        (orientation === data.DIAGONAL1 && x + nb < 19 && y + nb < 19 && !board[y + nb][x + nb]) ||
        (orientation === data.DIAGONAL2 && x - nb >= 0 && y + nb < 19 && !board[y + nb][x - nb])
    )
        return 1
    return 0
}

const checkVerticalAlignment = (x, y, board, color, checkedBoard, data) => {
    var nb = 0
    while (y < 19 && board[y][x] === color && checkedBoard[y][x] !== data.VERTICAL){
        checkedBoard[y][x] = data.VERTICAL
        nb++
        y++
    }
    return nb
}

const checkHorizontalAlignment = (x, y, board, color, checkedBoard, data) => {
    var nb = 0
    while (x < 19 && board[y][x] === color && checkedBoard[y][x] !== data.HORIZONTAL){
        checkedBoard[y][x] = data.HORIZONTAL
        nb++
        x++
    }
    return nb
}

const checkDiagonal1Alignment = (x, y, board, color, checkedBoard, data) => {
    var nb = 0
    while (x < 19 && y < 19 && board[y][x] === color && checkedBoard[y][x] !== data.DIAGONAL1){
        checkedBoard[y][x] = data.DIAGONAL1
        nb++
        x++
        y++
    }
    return nb
}

const checkDiagonal2Alignment = (x, y, board, color, checkedBoard, data) => {
    var nb = 0
    while (x >= 0 && y < 19 && board[y][x] === color && checkedBoard[y][x] !== data.DIAGONAL2){
        checkedBoard[y][x] = data.DIAGONAL2
        nb++
        x--
        y++
    }
    return nb
}

const checkStones = (x, y, board, orientation, checkedBoard, data) => {
    var nb = 0
    var color = board[y][x]
    var neighbour1 = getNeighbour1(x, y, board, orientation, data)
    var saveX = x
    var saveY = y
    if (orientation === data.VERTICAL)
        nb = checkVerticalAlignment(x, y, board, color, checkedBoard, data)
    else if (orientation === data.HORIZONTAL)
        nb = checkHorizontalAlignment(x, y, board, color, checkedBoard, data)
    else if (orientation === data.DIAGONAL1)
        nb = checkDiagonal1Alignment(x, y, board, color, checkedBoard, data)
    else if (orientation === data.DIAGONAL2)
        nb = checkDiagonal2Alignment(x, y, board, color, checkedBoard, data)
    if (nb > 1){
        var neighbour2 = getNeighbour2(saveX, saveY, board, nb, orientation, data)
        if (nb < 5 && !neighbour1 && !neighbour2)
            return false
        return {
            nb,
            neighbour1,
            neighbour2
        }
    }
    return false
}

const checkAlignment = (x, y, board, checkedBoard, data) => {
    var alignment = []
    var ret
    for (var c = data.VERTICAL; c <= data.DIAGONAL2; c++){
        if ((ret = checkStones(x, y, board, c, checkedBoard, data)))
            alignment.push(ret)
    }
    return alignment
}

const initCheckedBoard = () => {
    var res = []
    for (var y = 0; y < 19; y++){
        res[y] = []
        for (var x = 0; x < 19; x++){
            res[y][x] = 0
        }
    }
    return res
}

const alignmentsHeuristic = (board, data) => {
    var heuristic = 0
    var alignment
    var checkedBoard = initCheckedBoard()
    for (var y = 0; y < 19; y++){
        for (var x = 0; x < 19; x++){
            if (board[y][x] && board[y][x] !== data.FORBIDDEN){
                alignment = checkAlignment(x, y, board, checkedBoard, data)
                for (var c = 0; c < alignment.length; c++){
                    if (board[y][x] === data.aiColor)
                        heuristic += Math.pow(10, alignment[c].nb) * (1 + alignment[c].neighbour1 + alignment[c].neighbour2)
                    else
                        heuristic -= Math.pow(10, alignment[c].nb) * (1 + alignment[c].neighbour1 + alignment[c].neighbour2)
                }
            }
        }
    }
    return heuristic
}

const getHeuristic = (node, data) => {
    const start = window.performance.now()
    var board = getBoard(node, data.board)
    var h1 = singleStonesHeuristic(board, data)
    var h2 = alignmentsHeuristic(board, data)
    const end = window.performance.now()
    data.heuristicTime += end - start
    return h1 + h2
}

export default getHeuristic