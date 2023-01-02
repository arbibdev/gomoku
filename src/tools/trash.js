const increment = (pos) => {
    pos.x++
    if (pos.x === 19){
        pos.x = 0
        pos.y++
    }
    if (pos.y === 19)
        return false
    return true
}

const playRandom = (data, playerColor) => {
    var x = getRandomInt(19)
    var y = getRandomInt(19)
    while (data.board[y][x]){
        x++
        if (x === 19){
            x = 0
            y++
        }
        if (y === 19)
            y = 0
    }
    return {x, y}
}

const printBoards = (ctx, images, canvas) => {
    var c = -1
    document.onkeydown = e => {
        if (e.key === 'Enter')
            c++
        else if (e.key === ' ')
            c += 100
        else if (e.key === 'Backspace')
            c -= 100
        else
            return
        if (!data.boards[c])
            return
        printBoard(data.boards[c].board, ctx, images, canvas)
        console.clear()
        console.log('------------------------')
        // console.log('heuristic:', data.boards[c].node.heuristic)
        // console.log('parent heuristic:', data.boards[c].node.parent.heuristic)
        // console.log('infos heuristic:', data.boards[c].h2)
        console.log(data.boards[c].h2)
        console.log('------------------------')
    }
}

const printForbiddenStones = (data, images) => { // TMP
    if (!data.forbiddenStones)
        return
    for (var y = 0; y < 19; y++){
        for (var x = 0; x < 19; x++){
            if (data.forbiddenStones[y][x] === 9){
                data.ctx.drawImage(
                    images.forbidden,
                    images.gomokuBoard.width * x,
                    images.gomokuBoard.height * y
                )
            }
        }
    }
}

const printTree = (tree, indentation) => {
    var nbNode = 0
    var prefix = ''
    for (var c = 0; c < indentation; c++){
        prefix += '----'
    }
    console.log(`${prefix}(${tree.heuristic})`)
    while (tree[nbNode]){
        printTree(tree[nbNode], indentation + 1)
        nbNode++
    }
}

const getStartBoard = (board, offset) => {
    var res = []
    for (var y = 0; y < 19; y++){
        res[y] = []
        for (var x = 0; x < 19; x++){
            res[y][x] = board[y][x]
        }
    }
    blockBoard(res, offset)
    if (emptyBoard(res))
        freeSquareOnTheMiddle(res)
    return res
}

const emptyBoard = board => {
    for (var y = 0; y < 19; y++){
        for (var x = 0; x < 19; x++){
            if (board[y][x] !== data.FORBIDDEN)
                return false
        }
    }
    return true
}

const getTreeToPrint = (node, depth) => {
    var nbNode = 0
    var res = {}
    res.heuristic = node.heuristic
    res.x = node.x
    res.y = node.y
    while (node[nbNode]){
        if (depth > 0)
            res[nbNode] = getTreeToPrint(node[nbNode], depth - 1)
        nbNode += 1
    }
    return res
}

const getBlockedBoardToPrint = (iaPath) => {
    var res = []
    for (var y = 0; y < 19; y++){
        res[y] = []
        for (var x = 0; x < 19; x++){
            res[y][x] = 0
        }
    }
    for (var c = 0; c < iaPath.length; c++){
        res[iaPath[c].y][iaPath[c].x] = 1
    }
    return res
}

const printBlockedBoard = (data) => {
    for (var y = 0; y < 19; y++){
        for (var x = 0; x < 19; x++){
            if (data.blockedBoard && !data.blockedBoard[y][x])
                data.ctx.drawImage(
                data.images.forbidden,
                data.images.gomokuBoard.width * x,
                data.images.gomokuBoard.height * y
            )
        }
    }
}