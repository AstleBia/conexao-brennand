import React, { useState } from 'react';
import HomePage from './pages/Home.tsx';
import FeedbackPage from './pages/Feedback.tsx';
import AdminPage from './pages/Admin.tsx';
import CadastroPage from './pages/Cadastro.tsx';
import AdminFeedbackDashboard from "./pages/AdminFeedbackDashboard";

const App = () => {
    const [currentPage, setCurrentPage] = useState('home');
    const [usuario, setUsuario] = useState(null);
    const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

    const handleCadastroComplete = (usuarioData) => {
        setUsuario(usuarioData);
    };

    const handleAdminLogin = () => {
        setIsAdminAuthenticated(true);
        setCurrentPage('admin-feedback');
    };

    const handleAdminLogout = () => {
        setIsAdminAuthenticated(false);
        setCurrentPage('home');
    };

    return (
        <div>
            {currentPage === 'home' && <HomePage setCurrentPage={setCurrentPage} />}
            {currentPage === 'cadastro' && <CadastroPage setCurrentPage={setCurrentPage} onCadastroComplete={handleCadastroComplete} />}
            {currentPage === 'feedback' && <FeedbackPage setCurrentPage={setCurrentPage} usuario={usuario} />}
            {currentPage === 'admin' && <AdminPage setCurrentPage={setCurrentPage} onLoginSuccess={handleAdminLogin} />}
            {currentPage === 'admin-feedback' && isAdminAuthenticated && (
                <AdminFeedbackDashboard setCurrentPage={setCurrentPage} onLogout={handleAdminLogout} />
            )}
            {currentPage === 'admin-feedback' && !isAdminAuthenticated && (
                <HomePage setCurrentPage={setCurrentPage} />
            )}
        </div>
    );
};

export default App;