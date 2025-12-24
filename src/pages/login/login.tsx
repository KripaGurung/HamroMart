import React, { useState } from 'react';
import { toast } from 'react-toastify';
import './login.css'

interface LoginFormDataProps {
  email: string;
  password: string;
}

const Login = () => {
    const [formData, setFormData] = useState<LoginFormDataProps>({
        email: "",
        password: "",
    });

    const handlechange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData((prev) => ({...prev,[name]: value,}));
    };

     const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log("Login Form Submitted!", formData);
        toast.success("Login Successful!");
    }
    return(

        <div className="loginContainer">

            <div className="loginBox">
                <h2>Welcome Back to Your Account</h2>

                <form onSubmit={handleSubmit} noValidate>

                    <label>Email</label>
                    <input type="email" name="email" placeholder="Email" onChange={handlechange} />

                    <label>Password</label>
                    <input type="password" name="password" placeholder="Password" onChange={handlechange} />

                    <div className="loginButton">
                        <button type="submit">Login</button>
                    </div>

                    <p className="signupLink">Don't have an account? <a href="/signup">Sign Up</a></p>

                </form>
            </div>
        </div>
    );
}

export default Login;