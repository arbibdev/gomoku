import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from './pages/home/home'
import HumanVsAi from './pages/humanVsAi/humanVsAi'
import HumanVsHuman from './pages/humanVsHuman/humanVsHuman'
import gomokuBoard from './images/gomokuBoard.png'
import blackPiece from './images/blackPiece.png'
import whitePiece from './images/whitePiece.png'
import forbidden from './images/forbidden.png'
import suggestion from './images/suggestion.png'
import mandatory from './images/mandatory.png'
import flash from './images/flash.png'
import loadImages from './tools/loadImages'
import Loading from './tools/loading'

const imagesToLoad = [gomokuBoard, blackPiece, whitePiece, forbidden, suggestion, mandatory, flash]
const imgNames = ['gomokuBoard', 'blackPiece', 'whitePiece', 'forbidden', 'suggestion', 'mandatory', 'flash']

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
                    <Route path='/humanvsai' element={<HumanVsAi images={images}/>}/>
                    <Route path='/humanvshuman' element={<HumanVsHuman images={images}/>}/>
                </Routes>
            </Router>
        )
    else
        return (<Loading/>)
}

export default App;
