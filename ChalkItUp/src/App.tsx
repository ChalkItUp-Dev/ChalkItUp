import LoginPage from "./pages/login.tsx";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";

import RegisterPage from "./pages/register.tsx";
import { AuthProvider, useAuth } from "./contexts/authContext/index.tsx";
import IndexPage from "@/pages";
import PlayerPage from "@/pages/player.tsx";

const App = () => {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    {/* Login & Register nur für nicht eingeloggte Nutzer */}
                    <Route path="/login" element={<RedirectIfAuthenticated><LoginPage/></RedirectIfAuthenticated>} />
                    <Route path="/register" element={<RedirectIfAuthenticated><RegisterPage/></RedirectIfAuthenticated>} />


                    {/* Geschützte Routen */}
                    <Route path="/" element={<ProtectedRoute><IndexPage /></ProtectedRoute>} />
                    <Route path="/players" element={<ProtectedRoute><PlayerPage /></ProtectedRoute>} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
};

// 🔹 Verhindert Zugriff auf Login/Register, wenn der User eingeloggt ist
const RedirectIfAuthenticated = ({ children }: { children: JSX.Element }) => {
    const { currentUser } = useAuth();
    return currentUser ? <Navigate to="/" replace /> : children;
};

// 🔹 Schützt private Routen
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const { currentUser } = useAuth();
    return currentUser ? children : <Navigate to="/login" replace />;
};

export default App;
