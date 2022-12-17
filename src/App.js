import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from './pages/home/home'
import Humanvsia from './pages/humanvsia/humanvsia'
import gomokuBoard from './images/gomokuBoard.png'
import blackPiece from './images/blackPiece.png'
import whitePiece from './images/whitePiece.png'
import loadImages from './tools/loadImages'
import Loading from './tools/loading'

const imagesToLoad = [gomokuBoard, blackPiece, whitePiece]
const imgNames = ['gomokuBoard', 'blackPiece', 'whitePiece']

function App() {

    const [images, setImages] = useState(false)

    useEffect(() => {
        if (!images)
            loadImages(imagesToLoad, imgNames).then((images) => {
                setImages(images)
            })
    })

    if (images)
        return (
            <Router>
                <Routes>
                    <Route path='*' element={<Home images={images}/>}/>
                    <Route path='/home' element={<Home images={images}/>}/>
                    <Route path='/humanvsia' element={<Humanvsia images={images}/>}/>
                </Routes>
            </Router>
        )
    else
        return (<Loading/>)
}

export default App;
