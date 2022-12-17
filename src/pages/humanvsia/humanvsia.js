import { useEffect } from 'react'
import Header from '../../tools/header.js'
import Footer from '../../tools/footer.js'
import styles from './humanvsia.module.css'
import initGame from './initGame'

const Game = ({images}) => {

    useEffect(() => {
        var data = initGame(images)
    })

    return (
        <div className={styles.canvasContainer}>
            <canvas
                id='canvas'
                width={`${images.gomokuBoard.width * 18 + images.blackPiece.width}`}
                height={`${images.gomokuBoard.height * 18 + images.blackPiece.height}`}
                className={styles.canvas}>
            </canvas>
        </div>
    )
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