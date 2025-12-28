import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from './componennt/navbar/navbar';
import Signup from './pages/signup/signup';
import Login from './pages/login/login';
import Home from './pages/home/home';
import Footer from './componennt/footer/footer';

function AppContent() {
  const location = useLocation();

  const navbarPaths = ['/home'];
  const footerPaths = ['/home'];

  return (
    <>
      {navbarPaths.includes(location.pathname) && <Navbar />}
      
      <ToastContainer position="top-center" autoClose={2000} />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
      </Routes>

        {footerPaths.includes(location.pathname) && <Footer />}
        
    </>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
