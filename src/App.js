import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import Home from './pages/Home';
import Chat from './component/Chat';
import Pay from './pages/Pay';
import Seller from './pages/Seller';
import CardRank from './pages/CardRank';
import Receipt from './component/Receipt';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
    return (
        <>
            {/* <div>
                <Link to={'/'}>Home</Link>
                <Link to={'/seller'}>Seller</Link>
                <Link to={'/chat'}>Chat</Link>
            </div> */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/seller" element={<Seller />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/pay" element={<Pay />} />
                <Route path="/pay/receipt" element={<Receipt />} />
                <Route path="rank" element={<CardRank />} />
            </Routes>
        </>
    );
}

export default App;
