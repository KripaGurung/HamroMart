import "./App.css";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./componennt/navbar/navbar";
import Footer from "./componennt/footer/footer";
import Login from "./pages/login/login";
import Home from "./pages/home/home";
import Product from "./pages/product/product";
import Cart from "./pages/cart/cart";
import Details from "./pages/details/Details";
import Profile from "./pages/profile/profile";
import AuthProvider from "./context/AuthProvider";


function AppContent() {
  const location = useLocation();
  const hidePaths = ["/"];

  const showPath = !hidePaths.includes(location.pathname);

  return (
    <div className="app">
      {showPath && <Navbar />}

      <ToastContainer position="top-center" autoClose={2000} />

      <div className="content">
        <AuthProvider>
          <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/products" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<Details />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        </AuthProvider>
        
      </div>

      {showPath && <Footer />}

    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;