import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './home.module.css'
import getButtons from './getButtons'
import Header from '../../tools/header.js'
import Footer from '../../tools/footer.js'
import Loading from '../../tools/loading'

const Buttons = ({buttons}) => {

    const navigate = useNavigate()

    return (
        <div className={styles.container}>
            <div className={styles.button} style={{backgroundImage:`url(${buttons.humanvsia.src}`}}>
                <div className={styles.hvsia} onClick={() => navigate('/humanvsia')}>
                </div>
            </div>
            <div className={styles.button} style={{backgroundImage:`url(${buttons.humanvshuman.src}`}}>
                <div className={styles.hvsh}>
                </div>
            </div>
        </div>
    )
}

const Home = ({images}) => {
    const [buttons, setButtons] = useState(false)

    useEffect(() => {
        if (!buttons)
            getButtons(images, setButtons)
    }, [buttons, images])

    if (buttons){
        return (
            <div>
                <Header/>
                <Buttons buttons={buttons}/>
                <Footer/>
            </div>
        )
    }
    return (<Loading/>)
}

export default Home