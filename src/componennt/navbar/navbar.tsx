import { useNavigate } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
    const navigate = useNavigate();

    return (
        <div className="navbarContainer">
            <div className="navbarBox">
                <ul className="navLinks">
                    <li onClick={() => navigate("/home")}>Home</li>
                    <li onClick={() => navigate("/cart")}>Cart</li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar;