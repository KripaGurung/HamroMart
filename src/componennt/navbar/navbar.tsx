import { useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
    const navigate = useNavigate();

    return (
        <nav className="navbar">
            <h2 className="logo" onClick={() => navigate("/home")}>HamroMart</h2>

            <div className="nav-right">
                <div className="nav-item" onClick={() => navigate("/cart")}>
                    <FaShoppingCart />
                </div>

                <div className="nav-item" onClick={() => navigate("/")}>
                    <FaUser />
                    <span>Login</span>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;