import { getBoard, freeBufferMemory } from "./tools"

const singleStoneHeuristic = (board, node, data) => {
    var h = 10
    var free = 1
    var x = node.x
    var y = node.y
    if (y - 1 >= 0 && !board[y - 1][x])
        free += 1
    if (y - 1 >= 0 && x + 1 < 19 && !board[y - 1][x + 1])
        free += 1
    if (x + 1 < 19 && !board[y][x + 1])
        free += 1
    if (x + 1 < 19 && y + 1 < 19 && !board[y + 1][x + 1])
        free += 1
    if (y + 1 < 19 && !board[y + 1][x])
        free += 1
    if (y + 1 < 19 && x - 1 >= 0 && !board[y + 1][x - 1])
        free += 1
    if (x - 1 >= 0 && !board[y][x - 1])
        free += 1
    if (x - 1 >= 0 && y - 1 >= 0 && !board[y - 1][x - 1])
        free += 1
    h *= free
    if (node.color === data.aiColor)
        return h / data.heuristicAiDiviser
    return -h
}

const verticalAlignment = (board, node) => {
    var color = node.color
    var pos = {x : node.x, y : node.y}
    var neighbour1 = 0
    var neighbour2 = 0
    var sizeAlignment = 0
    while (pos.y >= 0 && board[pos.y][pos.x] === color){
        pos.y -= 1
    }
    if (pos.y >= 0 && !board[pos.y][pos.x])
        neighbour1 = 1
    pos.y += 1
    while (pos.y < 19 && board[pos.y][pos.x] === color){
        pos.y += 1
        sizeAlignment += 1
    }
    if (pos.y < 19 && !board[pos.y][pos.x])
        neighbour2 = 1
    if (sizeAlignment < 2 || (!neighbour1 && !neighbour2))
        return 0
    return Math.pow(10, sizeAlignment) * (neighbour1 + neighbour2 + 1)
}

const horizontalAlignment = (board, node) => {
    var color = node.color
    var pos = {x : node.x, y : node.y}
    var neighbour1 = 0
    var neighbour2 = 0
    var sizeAlignment = 0
    while (pos.x >= 0 && board[pos.y][pos.x] === color){
        pos.x -= 1
    }
    if (pos.x >= 0 && !board[pos.y][pos.x])
        neighbour1 = 1
    pos.x += 1
    while (pos.x < 19 && board[pos.y][pos.x] === color){
        pos.x += 1
        sizeAlignment += 1
    }
    if (pos.x < 19 && !board[pos.y][pos.x])
        neighbour2 = 1
    if (sizeAlignment < 2 || (!neighbour1 && !neighbour2))
        return 0
    return Math.pow(10, sizeAlignment) * (neighbour1 + neighbour2 + 1)
}

const diagonal1Alignment = (board, node) => {
    var color = node.color
    var pos = {x : node.x, y : node.y}
    var neighbour1 = 0
    var neighbour2 = 0
    var sizeAlignment = 0
    while (pos.x >= 0 && pos.y >= 0 && board[pos.y][pos.x] === color){
        pos.x -= 1
        pos.y -= 1
    }
    if (pos.x >= 0 && pos.y >= 0 && !board[pos.y][pos.x])
        neighbour1 = 1
    pos.x += 1
    pos.y += 1
    while (pos.x < 19 && pos.y < 19 && board[pos.y][pos.x] === color){
        pos.x += 1
        pos.y += 1
        sizeAlignment += 1
    }
    if (pos.x < 19 && pos.y < 19 && !board[pos.y][pos.x])
        neighbour2 = 1
    if (sizeAlignment < 2 || (!neighbour1 && !neighbour2))
        return 0
    return Math.pow(10, sizeAlignment) * (neighbour1 + neighbour2 + 1)
}

const diagonal2Alignment = (board, node) => {
    var color = node.color
    var pos = {x : node.x, y : node.y}
    var neighbour1 = 0
    var neighbour2 = 0
    var sizeAlignment = 0
    while (pos.x < 19 && pos.y >= 0 && board[pos.y][pos.x] === color){
        pos.x += 1
        pos.y -= 1
    }
    if (pos.x < 19 && pos.y >= 0 && !board[pos.y][pos.x])
        neighbour1 = 1
    pos.x -= 1
    pos.y += 1
    while (pos.x >= 0 && pos.y < 19 && board[pos.y][pos.x] === color){
        pos.x -= 1
        pos.y += 1
        sizeAlignment += 1
    }
    if (pos.x >= 0 && pos.y < 19 && !board[pos.y][pos.x])
        neighbour2 = 1
    if (sizeAlignment < 2 || (!neighbour1 && !neighbour2))
        return 0
    return Math.pow(10, sizeAlignment) * (neighbour1 + neighbour2 + 1)
}

const alignmentHeuristic = (board, node, data) => {
    var h = 0
    h += verticalAlignment(board, node)
    h += horizontalAlignment(board, node)
    h += diagonal1Alignment(board, node)
    h += diagonal2Alignment(board, node)
    if (node.color === data.aiColor)
        return h / data.heuristicAiDiviser
    return -h
}

const getHeuristic = (node, data) => {
    const start = window.performance.now()
    getBoard(node, data.bufferMemory)
    var h1 = 0
    var h2 = 0
    var saveNode = node
    while (node.parent){
        h1 += singleStoneHeuristic(data.board, node, data)
        h2 += alignmentHeuristic(data.bufferMemory, node, data)
        node = node.parent
    }
    freeBufferMemory(saveNode, data.bufferMemory)
    const end = window.performance.now()
    data.heuristicTime += end - start
    return h1 + h2
}

export default getHeuristic