import { useEffect, useState } from 'react'
import Header from '../../tools/header.js'
import Footer from '../../tools/footer.js'
import styles from './humanvsia.module.css'
import initGame from './initGame'

const WhoBegin = ({setFirstPlayer}) => {
    return (
        <div>
            <div className={styles.settingsContainer}>
                <h1 style={{color:'whitesmoke'}}>Who begin ?</h1>
                <div>
                    <button className={styles.whoBeginButton} onClick={() => setFirstPlayer('human')}>YOU</button>
                    <button className={styles.whoBeginButton} onClick={() => setFirstPlayer('ia')}>THE IA</button>
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
                    <img alt='black' className={styles.colorButton} onClick={() => setPlayerColor('black')} src={images.blackPiece.src}/>
                    <img alt='white' className={styles.colorButton} onClick={() => setPlayerColor('white')} src={images.whitePiece.src}/>
                </div>
            </div>
        </div>
    )
}

const Board = ({images}) => {
    return (
        <div className={styles.canvasContainer}>
            <canvas
                id='canvas'
                width={`${images.gomokuBoard.width * 18 + images.blackPiece.width}`}
                height={`${images.gomokuBoard.height * 18 + images.blackPiece.height}`}
                className={styles.canvas}>
            </canvas>
            <div className={styles.infos}>
                <div style={{color:'white', width:'100%', display:'flex', justifyContent:'space-around'}}>
                    <p>IA'S RESPONSE</p>
                    <p>Last Move :<span id='timer' style={{marginLeft:'10px'}}></span></p>
                    <p>Average :<span id='timerAverage' style={{marginLeft:'10px'}}></span></p>
                </div>
                <hr color='white'/>
            </div>
        </div>
    )
}

const Game = ({images}) => {
    const [firstPlayer, setFirstPlayer] = useState(false)
    const [playerColor, setPlayerColor] = useState(false)

    useEffect(() => {
        if (firstPlayer && playerColor)
            /*var data = */initGame(images, playerColor, firstPlayer)
    })

    if (!firstPlayer)
        return <WhoBegin setFirstPlayer={setFirstPlayer}/>
    if (!playerColor)
        return <ChooseYourColor setPlayerColor={setPlayerColor} images={images}/>
    return <Board images={images} firstPlayer={firstPlayer} playerColor={playerColor}/>
}

const Humanvsia = ({images}) => {
    return (
        <div>
            <Header/>
            <Game images={images}/>
            <Footer/>
        </div>
    )
}

export default Humanvsia