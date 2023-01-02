import { useEffect, useState } from 'react'
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

const Board = ({images}) => {
    return (
        <div /*TMP DIV !!!*/ id='tmpDiv' /*style={{marginBottom:'500px'}}*/>
            <div className={styles.canvasContainer}>
                <Canvas images={images}/>
            </div>
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