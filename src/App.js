import React, { useEffect } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useNavigate,
} from 'react-router-dom';
import logo from './img/sp_logo.png';
import './App.css';
import WelcomePage from './pages/WelcomePage';
import Home from './pages/Home';
import Register from './pages/Register';
import Chat from './component/Chat';
import Pay from './pages/Pay';
import PaymentSuccess from './component/Receipt';
import Seller from './pages/Seller';
import CardRank from './pages/CardRank';

const SplashScreen = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/welcome');
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="MainLogo">
            <img src={logo} alt="SP Logo" />
        </div>
    );
};

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<SplashScreen />} />
                <Route path="/welcome" element={<WelcomePage />} />
                <Route path="/home" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/seller" element={<Seller />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/pay" element={<Pay />} />
                <Route path="/pay/success" element={<PaymentSuccess />} />
                <Route path="rank" element={<CardRank />} />
            </Routes>
        </Router>
    );
}

export default App;
