import React from 'react';
import {BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import Home from './pages/Home';
import Chat from './component/Chat';
import Pay from "./pages/Pay"; 
import PaymentSuccess from "./component/Receipt"; 
import Seller from './pages/Seller';
import CardRank from './pages/CardRank';



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
                <Route path="/pay/success" element={<PaymentSuccess />} />
                <Route path="rank" element={<CardRank />} />
            </Routes>
        </>
    );
  
}

export default App;
