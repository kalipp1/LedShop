import { Container } from "react-bootstrap";
import { Routes, Route } from 'react-router-dom';
import Header from "./components/views/Header/Header";
import Footer from "./components/views/Footer/Footer";
import './App.css';

function App() {
  return (
    <div className="App">
       <Header />
        <Container className="content">
          <Routes>
            {/* <Route path="/" element={<MainPage />} /> */}
            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </Container>
        <Footer />
    </div>
  );
}

export default App;
