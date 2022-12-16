import { useEffect, useState } from 'react'
import styles from './home.module.css'
import getImages from './getImages'

const Home = () => {
    const [images, setImages] = useState(false)

    useEffect(() => {
        if (!images)
            getImages(setImages)
    }, [images])

    if (images){
        var htmlImages = []
        htmlImages[0] = document.createElement('img')
        htmlImages[0].src = images[0].src
        htmlImages[1] = document.createElement('img')
        htmlImages[1].src = images[1].src
        return (
                <div className={styles.container}>
                    <div className={styles.button} style={{backgroundImage:`url(${htmlImages[0].src}`}}>
                        <div className={styles.hvsia}>

                        </div>
                    </div>
                    <div className={styles.button} style={{backgroundImage:`url(${htmlImages[1].src}`}}>
                        <div className={styles.hvsh}>

                        </div>
                    </div>
                </div>
        )
    }
    return (
        <h1 className={styles.loading}>
            LOADING...
        </h1>
    )
}

export default Home