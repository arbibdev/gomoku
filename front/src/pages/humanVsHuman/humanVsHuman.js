import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../tools/header.js'
import Footer from '../../tools/footer.js'
import styles from './humanVsHuman.module.css'
import initGame from './initGame'

const FirstPlayerColor = ({setFirstPlayerColor, images}) => {
    return (
        <div>
            <div className={styles.settingsContainer}>
                <h1 style={{color:'whitesmoke'}}>First player's color</h1>
                <div style={{backgroundColor:'#a6683e'}}>
                    <img alt='black' className={styles.colorButton} onClick={() => setFirstPlayerColor(2)} src={images.blackPiece.src}/>
                    <img alt='white' className={styles.colorButton} onClick={() => setFirstPlayerColor(1)} src={images.whitePiece.src}/>
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
            <p>Last Move :<span id='timer' style={{marginLeft:'10px'}}></span></p>
            <p>Average :<span id='timerAverage' style={{marginLeft:'10px'}}></span></p>
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
            >New game</button>
        </div>
    )
}

const Infos = ({images}) => {
    return (
        <div className={styles.infos}>
            <Timer/>
            <hr color='white'/>
			<Captures images={images}/>
			<hr color='white'/>
			<EndGame/>
        </div>
    )
}

const Board = ({images}) => {
    return (
        <div className={styles.canvasContainer}>
            <Canvas images={images}/>
			<Infos images={images}/>
        </div>
    )
}

const Game = ({images}) => {
    const [firstPlayerColor, setFirstPlayerColor] = useState(false)

    useEffect(() => {
        if (firstPlayerColor)
            initGame(images, firstPlayerColor)
    })

    if (!firstPlayerColor)
        return <FirstPlayerColor setFirstPlayerColor={setFirstPlayerColor} images={images}/>
    return <Board images={images}/>
}

const HumanVsHuman = ({images}) => {
    return (
        <div>
            <Header/>
            <Game images={images}/>
            <Footer/>
        </div>
    )
}

export default HumanVsHuman