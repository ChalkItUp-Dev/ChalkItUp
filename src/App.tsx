import LoginPage from './pages/login';
import { Navigate, Route, Routes } from 'react-router-dom';

import RegisterPage from './pages/register';
import { AuthProvider, useAuth } from './contexts/authContext/index';
import HistoryPage from './pages/history';
import PlayerPage from './pages/player';
import ProfilePage from './pages/profile';
import WelcomePage from './pages/welcome';

const App = () => {
    return (
        <AuthProvider>
            <Routes>
                {/* Login & Register nur für nicht eingeloggte Nutzer */}
                <Route
                    path="/login"
                    element={
                        <RedirectIfAuthenticated>
                            <LoginPage />
                        </RedirectIfAuthenticated>
                    }
                />
                <Route
                    path="/register"
                    element={
                        <RedirectIfAuthenticated>
                            <RegisterPage />
                        </RedirectIfAuthenticated>
                    }
                />

                {/* Geschützte Routen */}
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <WelcomePage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/games"
                    element={
                        <ProtectedRoute>
                            <HistoryPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/players"
                    element={
                        <ProtectedRoute>
                            <PlayerPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <ProfilePage />
                        </ProtectedRoute>
                    }
                />
            </Routes>
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
