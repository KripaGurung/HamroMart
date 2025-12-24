import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Signup from './pages/signup/signup';

function AppContent() {

  return (
    <>

       <ToastContainer position="top-center" autoClose={2000} />

      <Routes>
        <Route path="/signup" element={<Signup />} />
      </Routes>
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