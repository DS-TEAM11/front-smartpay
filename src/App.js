import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

import Home from './pages/Home';
import Chat from './component/Chat';
import Seller from './pages/Seller';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Pay from "./pages/Pay"; 
import PaymentSuccess from "./component/Receipt"; 

function App() {
    return (
        <>
            <div>
                <Link to={'/'}>Home</Link>
                <Link to={'/seller'}>Seller</Link>
                <Link to={'/chat'}>Chat</Link>
            </div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/seller" element={<Seller />} />
                <Route path="/chat" element={<Chat />} />
            </Routes>
        </>
    );
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/pay" element={<Pay />} />
        <Route path="/pay/success" element={<PaymentSuccess />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
