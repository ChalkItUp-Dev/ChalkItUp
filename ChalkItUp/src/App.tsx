import { Route, Routes } from 'react-router-dom';

import IndexPage from '@/pages/index';
import PlayerPage from './pages/player';
import EditStats from './pages/editStats';

function App() {
    return (
        <Routes>
            <Route element={<IndexPage />} path="/" />
            <Route element={<PlayerPage />} path="/players" />
            <Route element={<EditStats />} path="/edit-player/:p1/:p2" />
        </Routes>
    );
}

export default App;
