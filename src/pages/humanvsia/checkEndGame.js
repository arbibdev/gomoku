
// Return 'ia' if ia is the winner, else 'human'
const checkWinner = (data) => {

}


 // Return true if the board is full, else false
const checkFullBoard = (data) => {

}

// Add functions as needed
const checkEndGame = (data) => {
    if ((data.winner = checkWinner(data)) !== false)
        data.endGame = true
    else if (checkFullBoard(data))
        data.endGame = true
}

export default checkEndGame