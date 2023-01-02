import getAiPath from "./getAiPath"
import { checkWinner } from "../../tools/checkEndGame"
import getHeuristic from "./heuristic2"
import { getBoard, freeBufferMemory } from "./tools"

// À FAIRE :
// IMPLEMENTER POUR LE CAS OU BOARD EST FULL
// IMPLEMENTER LA POSSIBILITÉ DE CHOISIR UNE DEPTH PAIRE OU IMPAIRE
// PEUT ETRE REMPLACER NOSTONES PAR UN TABLEAU CRÉÉ EN DEBUT DE FONCTION
// VOIR CE QU'ON A RÉELLEMENT BESOIN DE METTRE DANS LE NOUVEAU NODE
// PRENDRE EN COMPTE LES ALIGNEMENTS QUI N'ONT PAS DE BLOCAGES
// LIMITER LA ZONE D'ANALYSE DE L'IA. POUR CELA PLACER DES 1 DANS BOARD AUTOUR DES ZONES PRISES
// AU FUR ET A MESURE DE L'ALGORITHME, AGRANDIR LA ZONE, DE TOUTE FAÇON LE PRUNING AURA LIEU
// FAIRE DES STRUCTURES POUR LES DIFFÉRENTES COMPOSITIONS DU PLATEAU
// POUR OPTIMISER, COMMENCER LA SIMULATION TOUJOURS PRÈS DE LA ZONE DE JEU
// CHANGER LES VALEUR WHITE ET BLACK POUR DES VALEURS NUMERIQUES POUR ACCELERER LES COMPARAISONS
// CHANGER LES INDEX DE TREE PAR DES NOMBRES
// RÉGLER LE PROBLÈME OÙ L'IA VEUT FAIRE 6 ET NE BLOQUE PAS LE 5 DE L'ADVERSAIRE
// CHANGER TOUS LES IA PAR DES AI.......
// RÉGLER LE PROBLÈME OÙ L'IA NE VEUT PAS TOUT DE SUITE GAGNER MAIS S'AMUSE
var data

const noStones = (node, x, y) => {
    var start = window.performance.now()
    var end
    while (node.parent){
        if (node.x === x && node.y === y){
            end = window.performance.now()
            data.noStonesTime += end - start
            return false
        }
        node = node.parent
    }
    end = window.performance.now()
    data.noStonesTime += end - start
    return true
}

const getAlphaBetaPruning = (node, heuristic, aiTurn) => {
    if (aiTurn){
        if (heuristic > node.alpha)
            node.alpha = heuristic
    }
    else{
        if ((heuristic < node.beta))
            node.beta = heuristic
    }
    if (node.beta <= node.alpha)
        return true
    return false
}

const getChild = (pos, node, color) => {
    return {
        x : pos.x, y : pos.y,
        parent : node,
        color,
        alpha : node.alpha, beta : node.beta // A SUPPRIMER POUR LA DERNIERE LIGNE DE L'ARBRE
    }
}

const cancelForward = (node) => {
    var start = window.performance.now()
    getBoard(node, data.bufferMemory)
    var endGame = checkWinner(data.bufferMemory)
    freeBufferMemory(node, data.bufferMemory)
    var end = window.performance.now()
    data.cancelForwardTime += end - start
    if (endGame === data.aiColor){
        node.heuristic = Infinity
        return true
    }
    if (endGame === data.playerColor){
        node.heuristic = -Infinity
        return true
    }
    return false
}

const uploadHeuristic = (node, child, depth, aiTurn) => {
    if (aiTurn){
        if (node.heuristic === undefined || child.heuristic > node.heuristic){
            node.heuristic = child.heuristic
            if (data.depth === depth){
                node.bestPos = {
                    x : child.x,
                    y : child.y
                }
            }
        }
    }
    else{
        if (node.heuristic === undefined || child.heuristic < node.heuristic)
            node.heuristic = child.heuristic
    }
}

const minmax = (node, depth) => {
    data.callsToMinMax += 1
    var nbNode = 0
    var aiTurn = data.depth % 2 === depth % 2 ? true : false
    var color = aiTurn ? data.aiColor : data.playerColor
    if (cancelForward(node)){
        // console.log(`Cancel forward ${node.heuristic} aiTurn: ${aiTurn}`)
        return
    }
    for (var c = 0; c < data.aiPath.length; c++){
        if (!data.board[data.aiPath[c].y][data.aiPath[c].x] && noStones(node, data.aiPath[c].x, data.aiPath[c].y)){
            node[nbNode] = getChild(data.aiPath[c], node, color)
            if (depth > 1)
                minmax(node[nbNode], depth - 1)
            else
                node[nbNode].heuristic = getHeuristic(node[nbNode], data)
            uploadHeuristic(node, node[nbNode], depth,aiTurn)
            if (getAlphaBetaPruning(node, node[nbNode].heuristic, aiTurn))
                break
            // node[nbNode] = undefined // À remettre
            nbNode++
        }
    }
}

const getBufferMemory = (board) => {
    var res = []
    for (var y = 0; y < 19; y++){
        res[y] = []
        for (var x = 0; x < 19; x++){
            res[y][x] = board[y][x]
        }
    }
    return res
}

const initData = (mainData) => {
    var start = window.performance.now()
    data = {}
    data.depth = 3
    data.treatmentSpace = 3
    if (361 - data.piecesOnBoard < data.depth)
        data.depth = 361 - data.piecesOnBoard
    data.WHITE = 1
    data.BLACK = 2
    data.MIN = 3
    data.MAX = 4
    data.VERTICAL = 5
    data.HORIZONTAL = 6
    data.DIAGONAL1 = 7
    data.DIAGONAL2 = 8
    data.FORBIDDEN = 9
    data.playerColor = mainData.playerColor
    data.aiColor = data.playerColor === data.WHITE ? data.BLACK : data.WHITE
    console.log(`${data.aiColor === data.WHITE ? 'WHITE\'S' : 'BLACK\'S'} TURN`)
    data.board = mainData.board
    data.aiPath = getAiPath(mainData.board, data.treatmentSpace)
    data.bufferMemory = getBufferMemory(mainData.board)
    data.heuristicAiDiviser = 1
    if (data.depth % 2)
        data.heuristicAiDiviser = (data.depth - Math.floor(data.depth / 2)) / (Math.floor(data.depth / 2))
    data.heuristicTime = 0 // TMP
    data.cancelForwardTime = 0 // TMP
    data.noStonesTime = 0 // TMP
    var end = window.performance.now()
    data.initDataTime = end - start // TMP
}

const printTime = data => {
    console.log(`heuristic time: ${Math.floor(data.heuristicTime)}ms`)
    console.log(`cancel forward time: ${Math.floor(data.cancelForwardTime)}ms`)
    console.log(`no stones time: ${Math.floor(data.noStonesTime)}ms`)
    console.log(`init data time: ${Math.floor(data.initDataTime)}ms`)
    console.log(`total time: ${Math.floor(data.heuristicTime + data.cancelForwardTime + data.noStonesTime + data.initDataTime)}ms`)
}

// eslint-disable-next-line
const printChoosenStones = (node, line) => {
    var nbNode = 0
    if (!node || !node[0])
        return
    while (node[nbNode].heuristic !== node.heuristic)
        nbNode++
    var color = line % 2 ? data.playerColor : data.aiColor
    var stringColor = color === data.BLACK ? 'black' : 'white'
    console.log(`${stringColor} in ${node[nbNode].x} ${node[nbNode].y}`)
    printChoosenStones(node[nbNode], line + 1)
}

const ai = (mainData) => {
    initData(mainData)
    var tree = {alpha : -Infinity, beta : +Infinity}
    minmax(tree, data.depth)
    printTime(data,tree)
    console.log(`heuristic: ${tree.heuristic}`)
    //printChoosenStones(tree, 0)
    console.log('----------------')
    var pos = {...tree.bestPos}
    data = undefined
    tree = undefined
    return pos
}

export default ai