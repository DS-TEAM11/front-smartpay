import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

import Header from './component/Header';
import Home from './pages/Home';
import Footer from './component/Footer';
import Chat from './component/Chat';
import Seller from './pages/Seller';

function App() {
    return (
    <>
        <Header />
        
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/seller" element={<Seller />} />
            <Route path="/chat" element={<Chat />} />
        </Routes>
        <div>
            <Link to={"/"}>Home</Link>
            <Link to={"/seller"}>Seller</Link>
            <Link to={"/chat"}>Chat</Link>
        </div>
        <Footer />
    </>
    )
}

export default App;
