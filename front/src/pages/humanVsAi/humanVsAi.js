import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../tools/header.js'
import Footer from '../../tools/footer.js'
import styles from './humanVsAi.module.css'
import initGame from './initGame'

const WhoBegin = ({setFirstPlayer}) => {
    return (
        <div>
            <div className={styles.settingsContainer}>
                <h1 style={{color:'whitesmoke'}}>Who begins ?</h1>
                <div>
                    <button className={styles.whoBeginButton} onClick={() => setFirstPlayer('human')}>YOU</button>
                    <button className={styles.whoBeginButton} onClick={() => setFirstPlayer('ai')}>THE AI</button>
                </div>
            </div>
        </div>
    )
}

const ChooseYourColor = ({setPlayerColor, images}) => {
    return (
        <div>
            <div className={styles.settingsContainer}>
                <h1 style={{color:'whitesmoke'}}>Choose your color</h1>
                <div style={{backgroundColor:'#a6683e'}}>
                    <img alt='black' className={styles.colorButton} onClick={() => setPlayerColor(2)} src={images.blackPiece.src}/>
                    <img alt='white' className={styles.colorButton} onClick={() => setPlayerColor(1)} src={images.whitePiece.src}/>
                </div>
            </div>
        </div>
    )
}

const Canvas = ({images}) => {
    return (
        <canvas
            id='canvas'
            width={`${images.gomokuBoard.width * 18 + images.blackPiece.width}`}
            height={`${images.gomokuBoard.height * 18 + images.blackPiece.height}`}
            className={styles.canvas}>
        </canvas>
    )
}

const Timer = () => {
    return (
        <div style={{color:'white', width:'100%', display:'flex', justifyContent:'space-around'}}>
            <p>AI'S RESPONSE</p>
            <p>Last Move :<span id='timer' style={{marginLeft:'10px'}}>0s</span></p>
            <p>Average :<span id='timerAverage' style={{marginLeft:'10px'}}>0s</span></p>
        </div>
    )
}

const EndGame = () => {

    const navigate = useNavigate()

    return (
        <div style={{width:'100%', display:'flex', justifyContent:'space-around', alignItems:'center'}}>
            <p id='endGame'></p>
            <button
                id='newGame'
                style={{display:'none'}}
                className={styles.newGameButton}
                onClick={() => navigate('/home')}
            >Go home</button>
        </div>
    )
}

const Captures = ({images}) => {
	return (
		<div>
			<div className={styles.capturesContainer}>
				<div>
					<p>black's captures</p>
					<p id='blackCaptures' style={{textAlign:'center'}}>0 / 10</p>
				</div>
				<div>
					<p>white's captures</p>
					<p id='whiteCaptures' style={{textAlign:'center'}}>0 / 10</p>
				</div>
			</div>
			<div className={styles.capturedPiecesContainer}>
				<div className={styles.capturedStonesPairs} id='blackStonesCaptured'>
				</div>
				<div className={styles.capturedStonesPairs} id='whiteStonesCaptured'>
				</div>
			</div>
		</div>
	)
}

const Turns = () => {
	return (
		<div style={{color:'white', textAlign:'center'}}>
			<p>TURN <span id='turn'>1</span></p>
		</div>
	)
}

const backward = (history, settings, images, playerColor) => {
	if (history.current.position === false)
		return
	if (history.current.position > 0){
		history.current.position -= 1
		initGame(images, playerColor, 'human', settings, history)
	}
}

const forward = (history, settings, images, playerColor) => {
	if (history.current.position === false)
		return
	if (history.current.position < history.current.history.length - 1){
		history.current.position += 1
		initGame(images, playerColor, 'human', settings, history)
	}
}

const MoveInGame = ({images, firstPlayer, playerColor, settings, history}) => {
	return (
		<div className={styles.moveInGameContainer}>
			<button
                onClick={() => {
					history.current = {history : [], position : false}
					initGame(images, playerColor, firstPlayer, settings, history)
				}}
            >Restart the game</button>
			<button onClick={() => backward(history, settings, images, playerColor)}>Previous move</button>
			<button onClick={() => forward(history, settings, images, playerColor)}>Next move</button>
		</div>
	)
}

const Infos = ({images, firstPlayer, playerColor, settings, history}) => {
    return (
        <div className={styles.infos}>
            <Timer/>
            <hr color='white'/>
			<Turns/>
			<hr color='white'/>
			<Captures images={images}/>
			<hr color='white'/>
			<MoveInGame images={images} firstPlayer={firstPlayer}
				playerColor={playerColor} settings={settings} history={history}/>
			<hr color='white'/>
			<EndGame/>
        </div>
    )
}

const Board = ({images, firstPlayer, playerColor, settings, history}) => {
    return (
        <div className={styles.canvasContainer}>
            <Canvas images={images}/>
            <Infos images={images} firstPlayer={firstPlayer} playerColor={playerColor}
				settings={settings} history={history}/>
        </div>
    )
}

const copyStartBoard = startBoard => {
	var copy = []
	for (var c = 0; c < 19; c += 1){
		copy.push([...startBoard[c]])
	}
	return copy
}

const boxToEditClick = (x, y, startBoard, setStartBoard) => {
	var startBoardCopy = copyStartBoard(startBoard)
	if (startBoardCopy[y][x] < 2)
		startBoardCopy[y][x] += 1
	else
		startBoardCopy[y][x] = 0
	setStartBoard(startBoardCopy)
}

const BoxToEdit = ({x, y, color, startBoard, setStartBoard}) => {
	return (
		<div style={{
				position:'relative',
				zIndex:0,
				width:'30px',
				height:'30px',
				backgroundColor:'#a6683e'
			}} onClick={() => boxToEditClick(x, y, startBoard, setStartBoard)}>
			<div style={{
				width:'2px',
				height:'50%',
				backgroundColor:'black',
				marginLeft:'50%'
			}}>
			</div>
			<div style={{
				width:'100%',
				height:'2px',
				backgroundColor:'black'
			}}>
			</div>
			<div style={{
				width:'2px',
				height:'50%',
				backgroundColor:'black',
				marginLeft:'50%'
			}}>
			</div>
			<div style={{
				width:'26px',
				height:'26px',
				backgroundColor:color,
				borderRadius:'50%',
				position:'absolute',
				top:'2px',
				left:'2px'
			}}>
			</div>
		</div>
	)
}

const LineBoardToEdit = ({startBoard, setStartBoard, y}) => {
	var line = []
	var color
	for (var x = 0; x < 19; x += 1){
		switch (startBoard[y][x]){
			case 0 :
				color = 'transparent'
				break
			case 1 :
				color = 'white'
				break
			case 2 :
				color = 'black'
				break
		}
		line.push(<BoxToEdit
			key={`box${x}`}
			x={x}
			y={y}
			color={color}
			startBoard={startBoard}
			setStartBoard={setStartBoard}/>
		)
	}
	return line
}

const BoardToEdit = ({startBoard, setStartBoard}) => {
	var board = []
	for (var y = 0; y < 19; y += 1){
		board.push(
			<div style={{display:'flex'}} key={`line${y}`}>
				<LineBoardToEdit startBoard={startBoard} setStartBoard={setStartBoard} y={y}/>
			</div>
		)
	}
	return (
		<div>
			{board}
		</div>
	)
}

const initStartBoard = () => {
	var startBoard = []
	for (var y = 0; y < 19; y += 1){
		startBoard.push([])
		for (var x = 0; x < 19; x += 1){
			startBoard[y].push(0)
		}
	}
	return startBoard
}

const emptyStartBoard = (setStartBoard) => {
	var newEmptyBoard = initStartBoard()
	setStartBoard(newEmptyBoard)
}

const ModifyStartBoard = ({startBoard, setStartBoard}) => {
	return (
		<div style={{width:'100vw', display:'flex', flexDirection:'column', alignItems:'center'}}>
			<h3 style={{color:'white'}}>Start board</h3>
			<p style={{color:'white'}}> Click on the boxes to edit the start board </p>
			<div>
				<BoardToEdit startBoard={startBoard} setStartBoard={setStartBoard}/>
			</div>
			<button
				style={{marginTop:'10px'}}
				onClick={() => emptyStartBoard(setStartBoard)}>Empty start board</button>
		</div>
	)
}

const ModifySettings = ({setSettings}) => {
	const [startBoard, setStartBoard] = useState(initStartBoard())
	return (
		<div>
			<ModifyStartBoard startBoard={startBoard} setStartBoard={setStartBoard}/>
			<div style={{width:'100vw', display:'flex', justifyContent:'center'}}>
				<button style={{width:'200px', height:'50px', marginTop:'40px'}}
				onClick={() => {setSettings({
					captures : true,
					winAlignment : 5,
					difficulty : 4,
					startBoard,
					widthBoard : 19,
					heightBoard : 19	
				})}}>Start Game</button>
			</div>
		</div>
	)
}

const Settings = ({setSettings}) => {
	const [openSettings, setOpenSettings] = useState(false)
	if (!openSettings)
		return (
			<div className={styles.settingsContainer}>
				<button className={styles.settingsButton} onClick={() => setSettings({
					captures : true,
					winAlignment : 5,
					difficulty : 4,
					startBoard : false,
					widthBoard : 19,
					heightBoard : 19
				})}>Begin</button>
				<button className={styles.settingsButton} onClick={() => setOpenSettings(true)}>
					Modify settings
				</button>
			</div>
		)
	return (
		<div className={styles.modifySettingsContainer}>
			<ModifySettings setSettings={setSettings}/>
		</div>
	)
}

const Game = ({images}) => {
    const [firstPlayer, setFirstPlayer] = useState(false)
    const [playerColor, setPlayerColor] = useState(false)
	const [settings, setSettings] = useState(false)
	const history = useRef({history : [], position : false})

    useEffect(() => {
        if (firstPlayer && playerColor && settings)
            initGame(images, playerColor, firstPlayer, settings, history)
    })

    if (!firstPlayer)
        return <WhoBegin setFirstPlayer={setFirstPlayer}/>
    if (!playerColor)
        return <ChooseYourColor setPlayerColor={setPlayerColor} images={images}/>
	if (!settings)
		return <Settings setSettings={setSettings}/>
    return <Board images={images} firstPlayer={firstPlayer}
			playerColor={playerColor} settings={settings} history={history}/>
}

const HumanVsAi = ({images}) => {
    return (
        <div>
            <Header/>
            <Game images={images}/>
            <Footer/>
        </div>
    )
}

export default HumanVsAi