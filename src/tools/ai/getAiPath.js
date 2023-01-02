import { getRandomInt } from "../tools"

const getPos = (x, y, c) => {
    return [
        {x : x - (c + 1), y : y - (c + 1)},
        {x : x + (c + 1), y : y - (c + 1)},
        {x : x + (c + 1), y : y + (c + 1)},
        {x : x - (c + 1), y : y + (c + 1)}
    ]
}

const checkAround = (pos, board) => {
    if (
        (
            pos[0].x >= 0 && pos[0].x < 19 && pos[0].y >= 0 && pos[0].y < 19 &&
            (board[pos[0].y][pos[0].x] === 1 || board[pos[0].y][pos[0].x] === 2)
        ) ||
        (
            pos[1].x >= 0 && pos[1].x < 19 && pos[1].y >= 0 && pos[1].y < 19 &&
            (board[pos[1].y][pos[1].x] === 1 || board[pos[1].y][pos[1].x] === 2)
        ) ||
        (
            pos[2].x >= 0 && pos[2].x < 19 && pos[2].y >= 0 && pos[2].y < 19 &&
            (board[pos[2].y][pos[2].x] === 1 || board[pos[2].y][pos[2].x] === 2)
        ) ||
        (
            pos[3].x >= 0 && pos[3].x < 19 && pos[3].y >= 0 && pos[3].y < 19 &&
            (board[pos[3].y][pos[3].x] === 1 || board[pos[3].y][pos[3].x] === 2)
        )
    )
        return false
    return true
}

const blockCase = (x, y, board, offset) => {
    var pos
    for (var c = 0; c < offset; c++){
        pos = getPos(x, y, c)
        for (var i = 0; i < 3 + c * 2 - 1; i++){
            if (!checkAround(pos, board))
                return false
            pos[0].x++
            pos[1].y++
            pos[2].x--
            pos[3].y--
        }
    }
    return true
}

const blockBoard = (board, offset) => {
    for (var y = 0; y < 19; y++){
        for (var x = 0; x < 19; x++){
            if (!board[y][x] && blockCase(x, y, board, offset))
                board[y][x] = 9
        }
    }
}

const isEmpty = board => {
    for (var y = 0; y < 19; y++){
        for (var x = 0; x < 19; x++){
            if (board[y][x] === 9)
                return false
        }
    }
    return true
}

const getBlockedBoard = (board, offset) => {
    var res = []
    for (var y = 0; y < 19; y++){
        res[y] = []
        for (var x = 0; x < 19; x++){
            res[y][x] = board[y][x]
        }
    }
    blockBoard(res, offset)
    return res
}

const getBlockedBoards = board => {
    var blockedBoards = []
    var blockedBoard
    var offset = 1
    while (true){
        blockedBoard = getBlockedBoard(board, offset)
        blockedBoards.push(blockedBoard)
        if (isEmpty(blockedBoard))
            return blockedBoards
        offset += 1
    }
}

const noStonesOnTheBoard = board => {
    for (var y = 0; y < 19; y++){
        for (var x = 0; x < 19; x++){
            if (board[y][x])
                return false
        }
    }
    return true
}

const shuffle = array => {
    var res = []
    var randomInt
    while (array.length){
        randomInt = getRandomInt(array.length)
        res.push(array[randomInt])
        array.splice(randomInt, 1)
    }
    return res
}

const getAiPath = (board, treatmentSpace) => {
    var aiPath = []
    var path
    if (noStonesOnTheBoard(board))
        return ([{x : 9, y : 9}])
    var blockedBoards = getBlockedBoards(board)
    for (var c = 0; c < treatmentSpace && c < blockedBoards.length; c++){
        path = []
        for (var y = 0; y < 19; y++){
            for(var x = 0; x < 19; x++){
                if (!blockedBoards[c][y][x]){
                    path.push({x, y})
                    for (var i = c + 1; i < blockedBoards.length; i++){
                        blockedBoards[i][y][x] = 9
                    }
                }
            }
        }
        path = shuffle(path)
        aiPath.push(...path)
    }
    return aiPath
}

export default getAiPath