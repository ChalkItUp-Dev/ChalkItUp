import LoginPage from './pages/login';
import { Navigate, Route, Routes } from 'react-router-dom';

import RegisterPage from './pages/register';
import { AuthProvider, useAuth } from './contexts/authContext';
import HistoryPage from './pages/history';
import PlayerPage from './pages/stats';
import ProfilePage from './pages/profile';
import WelcomePage from './pages/welcome';
import GlobalSpinner from './components/spinner';

const App = () => {
    return (
        <AuthProvider>
            <GlobalSpinner />
            <Routes>
                {/* Public routes */}
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
