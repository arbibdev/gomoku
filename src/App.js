import Home from './pages/home'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
    return (
        <Router>
            <Routes>
                <Route path='/home' element={<Home/>}/>
                <Route path='*' element={<Home/>}/>
            </Routes>
        </Router>
    )
}

export default App;
