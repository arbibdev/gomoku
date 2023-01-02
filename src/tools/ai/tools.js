const getBoard = (node, bufferMemory) => {
    while (node.parent){
        bufferMemory[node.y][node.x] = node.color
        node = node.parent
    }
}

const freeBufferMemory = (node, bufferMemory) => {
    while (node.parent){
        bufferMemory[node.y][node.x] = 0
        node = node.parent
    }
}

module.exports = {
    getBoard,
    freeBufferMemory
}