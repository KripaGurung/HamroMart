import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth/AuthContext";
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

  console.log("Navbar auth user:", user);
  console.log("Navbar cart items:", cartItems);

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  console.log("Navbar cart count:", cartCount);

  const handleLogout = () => {
    console.log("Logout clicked from Navbar");

    authContext?.logout();

    console.log("User logged out, navigating to home");
    navigate("/");
  };

  return (
    <nav className="navBar">
      <h2 className="logo" onClick={() => { console.log("Logo clicked, navigating to /home"); navigate("/home"); }}> HamroMart </h2>

      <div className="navRight">
        <div className="navItem" onClick={() => { console.log("Cart icon clicked"); navigate("/cart"); }}>
          <FiShoppingCart />
          {cartCount > 0 && ( <span className="cartCount">{cartCount}</span> )}
        </div>

        {user ? (
          <div className="navUser" onClick={() => { console.log("Profile clicked"); navigate("/profile"); }}>
            {user.image && (
              <img src={user.image} alt={user.firstName} className="navAvatar"/> )}

            <span className="navUsername"> {user.firstName} {user.lastName} </span>

            <div className="logoutBtn" onClick={(event) => { event.stopPropagation(); handleLogout(); }}> <GoSignOut /> </div>
          </div>
        ) : (
          <div className="navItem" onClick={() => { console.log("Login button clicked"); navigate("/"); }}> <FaUser /> <span>Login</span> </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;