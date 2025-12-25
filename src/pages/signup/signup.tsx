import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slice/userSlice";
import "./signup.css";

interface SignupFormDataProps {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Signup = () => {
    const [formData, setFormData] = useState<SignupFormDataProps>({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({...prev,[name]: value }));
    };
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            toast.error("Invalid email format!");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            toast.error("Password doesn't match!");
            return;
        }

        console.log("Form Submitted!", formData);

        dispatch(setUser({
            name: formData.name,
            email: formData.email,
            password: formData.password,
        }));
        
        try {
            const res = await fetch("https://dummyjson.com/users/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    firstName: formData.name,
                    email: formData.email,
                    password: formData.password,
                }),
            });
            
            const data = await res.json();
            console.log("Form Details: ", data);
        
            toast.success("Signup Successful!");
            navigate("/");
            
        } catch (error) {
            console.log(error);
            toast.error("Signup Failed!");
        }
    };

  return (
        <div className="signupContainer">
            <div className="signupBox">
                <h2>Registration Form</h2>

                <div className="formContainer">
                    <form onSubmit={handleSubmit} noValidate>

                        <label>Full Name</label>
                        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />

                        <label>Email</label>
                        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />

                        <label>Password</label>
                        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />

                        <label>Confirm Password</label>
                        <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />

                        <div className="signupButton">
                            <button type="submit">Sign Up</button>
                        </div>
                    
                        <p className="loginLink">Already have an account? <a href="/">Login</a></p>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;
