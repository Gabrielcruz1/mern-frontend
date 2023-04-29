import { Routes, Route } from 'react-router-dom';
import PostComponent from '../Pages/Post';
import ShowComponent from '../Pages/Show';


const Main = () => {
    return (
        <main>
            <Routes>
                <Route path="/" element={< PostComponent />} />
                <Route path="/posts/:id" element={< ShowComponent />} />
            </Routes>
        </main>
    )
}

export default Main;