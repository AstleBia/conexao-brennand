import React, { useState } from 'react';
import HomePage from './pages/Home.tsx';
import FeedbackPage from './pages/Feedback.tsx';
import AdminPage from './pages/Admin.tsx';
import CadastroPage from './pages/Cadastro.tsx';

const App = () => {
    const [currentPage, setCurrentPage] = useState('home');
    const [usuario, setUsuario] = useState(null);

    const handleCadastroComplete = (usuarioData) => {
        setUsuario(usuarioData);
    };

    return (
        <div>
            {currentPage === 'home' && <HomePage setCurrentPage={setCurrentPage} />}
            {currentPage === 'cadastro' && <CadastroPage setCurrentPage={setCurrentPage} onCadastroComplete={handleCadastroComplete} />}
            {currentPage === 'feedback' && <FeedbackPage setCurrentPage={setCurrentPage} usuario={usuario} />}
            {currentPage === 'admin' && <AdminPage setCurrentPage={setCurrentPage} />}
        </div>
    );
};

export default App;