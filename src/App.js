import React, { useEffect } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useNavigate,
} from 'react-router-dom';
import { PayProvider } from './provider/PayProvider';
import Home from './pages/Home';
import Register from './pages/Register';
import Chat from './component/Chat';
import Pay from './pages/Pay';
import Seller from './pages/Seller';
import CardRank from './pages/CardRank';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Afterkakao from './pages/Afterkakao'; // 경로 수정
import Receipt from './component/Receipt';
import 'bootstrap/dist/css/bootstrap.css';
import logo from './img/logo3.png';
import './App.css';
import WelcomePage from './pages/WelcomePage';
import Button from './component/Button';
import NotFoundPage from './pages/404';
import Test from './pages/Test';
import PayHistory from './pages/PayHistory';
import CardEdit from './pages/CardEdit';
import MyPage from './pages/MyPage';
// import CheckPwd from './pages/CheckPwd';
// import MemberPwd from './pages/MemberPwd';
import BenefitTest from './pages/BenefitTest';
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
        <>
            <Router>
                <PayProvider>
                    <Routes>
                        <Route path="/" element={<SplashScreen />} />
                        <Route path="/welcome" element={<WelcomePage />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/seller" element={<Seller />} />
                        <Route path="/chat" element={<Chat />} />
                        <Route path="/pay" element={<Pay />} />
                        <Route path="/pay/receipt" element={<Receipt />} />
                        <Route path="rank" element={<CardRank />} />
                        <Route path="test" element={<Test />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/afterkakao" element={<Afterkakao />} />
                        <Route path="/cardEdit" element={<CardEdit />} />
                        <Route path="*" element={<NotFoundPage />} />
                        <Route path="/history" element={<PayHistory />} />
                        <Route path="/benefitTest" element={<BenefitTest />} />
                        <Route path="/mypage" element={<MyPage />} />
                        {/* <Route path="/memberPwd" element={<MemberPwd />} />
                        <Route path="/checkPwd" element={<CheckPwd />} /> */}
                    </Routes>
                </PayProvider>
            </Router>
        </>
    );
}

export default App;
