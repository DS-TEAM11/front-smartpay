import { BrowserRouter, Routes, Route } from "react-router-dom";
import Pay from "./pages/Pay"; 
import PaymentSuccess from "./component/Receipt"; 

function App() {
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
