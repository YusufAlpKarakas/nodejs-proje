import React from 'react';
import { Link } from 'react-router-dom';

const Navi = () => {
    return (
        <nav>
            {/* Diğer navigasyon bağlantıları */}
            <Link to="/">Ana Sayfaya Dön</Link>
        </nav>
    );
};

export default Navi;
