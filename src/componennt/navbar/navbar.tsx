import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import "./Navbar.css";

const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);
    const user = authContext?.user;

    console.log("User logged-in from Navbar:", user);

    const handleLogout = () => {
        authContext?.logout();
        navigate("/");
    };

    return (
        <nav className="navbar">
            <h2 className="logo" onClick={() => navigate("/home")}>HamroMart</h2>

            <div className="nav-right">
                <div className="nav-item" onClick={() => navigate("/cart")}>
                    <FaShoppingCart />
                </div>

                {user ? (
                    <div className="nav-user">
                        {user.image && (
                            <img src={user.image} alt={user.firstName} className="nav-avatar" />
                        )}

                        <span className="nav-username">{user.firstName} {user.lastName}</span>
                        <button className="logout-btn" onClick={handleLogout}>Logout</button>

                    </div>

                ) : (
                    <div className="nav-item" onClick={() => navigate("/")}>
                        <FaUser />
                        <span>Login</span>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;