import { Routes, Route } from 'react-router-dom';
import Home from '../Pages/Home';
import Auth from '../Pages/Auth';
import PostComponent from '../Pages/Post';
import ShowComponent from '../Pages/Show';


const Main = () => {
    return (
        <main>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/auth" element={<Auth/>} />
                <Route path="/posts" element={< PostComponent />} />
                <Route path="/posts/:id" element={< ShowComponent />} />
            </Routes>
        </main>
    )
}

export default Main;