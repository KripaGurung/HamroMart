import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { FaUser } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { GoSignOut } from "react-icons/go";
import useCart from "../../context/cart/useCart";
import "./Navbar.css";

const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);
    const user = authContext?.user;
    const { cartItems } = useCart();
    
    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    console.log("User logged-in from Navbar:", user);

    const handleLogout = () => {
        authContext?.logout();
        navigate("/");
    };

    return (
        <nav className="navBar">
            <h2 className="logo" onClick={() => navigate("/home")}>HamroMart</h2>

            <div className="navRight">
                <div className="navItem" onClick={() => navigate("/cart")}>
                    <FiShoppingCart />
                    {cartCount > 0 && (
                        <span className="cartCount">{cartCount}</span>
                    )}
                </div>

                {user ? (
                    <div className="navUser">
                        {user.image && (
                            <img src={user.image} alt={user.firstName} className="navAvatar" />
                        )}

                        <span className="navUsername">{user.firstName} {user.lastName}</span>
                        <div className="logoutBtn" onClick={handleLogout}> <GoSignOut /> </div>
                    </div>

                ) : (
                    <div className="navItem" onClick={() => navigate("/")}>
                        <FaUser />
                        <span>Login</span>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;