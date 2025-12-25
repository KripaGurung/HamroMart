import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({...prev,[name]: value}));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const res = await fetch("https://dummyjson.com/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            console.log("Login Data:", data);

            if (data?.token) {
                toast.success("Login Successful!");
                navigate("/home");
            } else {
                toast.error("Invalid Credentials!");
            }
        } catch (error) {
            console.log(error);
            toast.error("Login Failed!");
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
