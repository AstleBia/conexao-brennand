import React, { useState } from 'react';
import HomePage from './pages/Home';
import FeedbackPage from './pages/Feedback';
import AdminPage from './pages/Admin';

const App = () => {
    const [currentPage, setCurrentPage] = useState('home');

    return (
        <div>
            {currentPage === 'home' && <HomePage setCurrentPage={setCurrentPage} />}
            {currentPage === 'feedback' && <FeedbackPage setCurrentPage={setCurrentPage} />}
            {currentPage === 'admin' && <AdminPage setCurrentPage={setCurrentPage} />}
        </div>
    );
};

export default App;