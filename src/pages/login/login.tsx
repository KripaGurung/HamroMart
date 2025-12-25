import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"; 
import type { RootState } from "../../redux/store";
import "./login.css";

interface LoginFormDataProps {
  username: string; 
  password: string;
}

const Login: React.FC = () => {
    const [formData, setFormData] = useState<LoginFormDataProps>({
        username: "",
        password: "",
    });

    const navigate = useNavigate();

    const storedUser = useSelector((state: RootState) => state.user);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({...prev,[name]: value}));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (
            formData.username === storedUser.name &&
            formData.password === storedUser.password
        ) {
            toast.success("Login Successful!");
            navigate("/home");
        } else {
            toast.error("Invalid Credentials!");
        }
    };

  return (
        <div className="loginContainer">
            <div className="loginBox">
                <h2>Welcome Back to Your Account</h2>

                <form onSubmit={handleSubmit} noValidate>

                    <label>Username</label>
                    <input type="text" name="username" placeholder="Enter Username" value={formData.username} onChange={handleChange} />

                    <label>Password</label>
                    <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />

                    <div className="loginButton">
                        <button type="submit">Login</button>
                    </div>

                    <p className="signupLink">Don't have an account? <a href="/signup">Sign Up</a></p>
                </form>
            </div>
        </div>
    );
};

export default Login;