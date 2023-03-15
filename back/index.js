const port = 8080
const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const socketIo = require('socket.io')
const clientIp = 'http://localhost:3000'
const { exec } = require("child_process")

const io = socketIo(server, {
	cors: {
		origin: clientIp
    }
})

const options = {
	name: 'Electron'
  }

const transformBoard = board => {
	var string = ''
	for (var y = 0; y < 19; y++){
		for (var x = 0; x < 19; x++){
			string += board[y][x]
		}
		string += ' '
	}
	return string
}

io.on('connection', socket => {
	console.log('CONNECTION ', socket.request._query['page'])

	socket.on('ai', ({aiColor, board}) => {
		stringBoard = transformBoard(board)
		exec(`./ai/ai ${aiColor} ${stringBoard}`, (error, stdout, stderr) => {
			
			if (stdout){
				console.log(stdout)
				splittedStdout = stdout.split(' ')
				pos = {
					x : parseInt(splittedStdout[0]),
					y : parseInt(splittedStdout[1])
				}
				socket.emit('ai', pos)
			}
			if (error)
				console.log(error)
			if (stderr)
				console.log(stderr)
		})
	})
})

server.listen(port, () => console.log(`Listening on port ${port}`))