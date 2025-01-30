import { Route, Routes } from 'react-router-dom';

import IndexPage from '@/pages/index';
import PlayerPage from './pages/player';

function App() {
    return (
        <Routes>
            <Route element={<IndexPage />} path="/" />
            <Route element={<PlayerPage />} path="/player" />
        </Routes>
    );
}

export default App;
