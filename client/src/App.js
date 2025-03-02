import { Container } from "react-bootstrap";
import { Routes, Route } from 'react-router-dom';
import Header from "./components/views/Header/Header";
import Footer from "./components/views/Footer/Footer";
import NotFound from "components/pages/NotFound/NotFound";
import Home from "components/pages/Home/Home";
import ProductPage from "components/pages/ProductPage/ProductPage";
import CartPage from "components/pages/CartPage/CartPage";
import PaymentPage from "components/pages/PaymentPage/PaymentPage";
import SuccessPage from "components/pages/SuccessPage/SuccessPage";
import CancelOrderPage from "components/pages/CancelOrderPage/CancelOrderPage";
import './App.css';

function App() {
  return (
    <div className="App">
       <Header />
        <Container className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products/:id" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/success/:orderId" element={<SuccessPage />} />
            <Route path="/cancelOrder" element={<CancelOrderPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Container>
        <Footer />
    </div>
  );
}

export default App;
