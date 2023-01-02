import getRandomInt from "../../tools/getRandomInt"

const createTree = (depth, nbChilds) => {
    var node = {}
    var child = 0
    node.var = getRandomInt(1000)
    while (child < nbChilds){
        if (depth > 0)
            node[child] = createTree(depth - 1, nbChilds)
        child += 1
    }
    return node
}

const printTree = (tree, indentation) => {
    var nbNode = 0
    var prefix = ''
    for (var c = 0; c < indentation; c++){
        prefix += '----'
    }
    console.log(`${prefix}(${tree.var})`)
    while (tree[nbNode]){
        printTree(tree[nbNode], indentation + 1)
        nbNode++
    }
}

const drawTree = (tree, depth, nbLeaves) => {
    const data = {}
    data.canvas = document.createElement('CANVAS');
    data.ctx = data.canvas.getContext('2d')
    // var myTree = createTree(3, 2)
    // printTree(myTree, 0)
    data.canvas.width = 100
    data.canvas.height = 100
    data.ctx.fillStyle = 'white'
    data.ctx.fillRect(0, 0, 100, 100)
    data.ctx.fillStyle = 'black'
    data.ctx.rect(0, 0, 50, 50)
    data.ctx.stroke()
    data.canvas.width += 100
    data.canvas.height += 100
    // data.ctx.rect(100, 100, 50, 50)
    // data.ctx.stroke()
    console.log(nbLeaves, 'leaves')
    var image = new Image()
    image.src = data.canvas.toDataURL()
    // image.onload = () => {
    //     document.getElementById('tmpDiv').appendChild(image)
    // }
}

export default drawTree