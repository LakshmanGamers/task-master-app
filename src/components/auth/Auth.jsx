import React, { useState ,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as Components from "./Components.jsx"; // Adjust the path if necessary
axios.defaults.withCredentials  = true;
import "./Auth.css";

export default function Auth() {
    const [error, setError] = useState(""); 
    const [signIn, toggle] = useState(true); // Toggle between sign in and sign up
    const navigate = useNavigate();
    const [fieldData, setFieldData] = useState({
        email: "",
        password: "",
        name: "",
        confirmPassword: ""
    });

  

    // Handle input changes
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFieldData(prev => ({
            ...prev,
            [name]: value
        }));
    };
useEffect(()=>{
        // Check if user is already logged in
        if (localStorage.getItem("user")) {
            navigate("/app");
        }
    },[]);
    // Handle form submission
    const handleLoginSubmit = async (event) => {
        event.preventDefault();
        const {  email, password } = fieldData;

        // Validation
        if (!email || !password ) {
            setError("All fields are required");
            return;
        }
        setError(""); // Clear previous errors

        try {
            const userData = {
                email: fieldData.email,
                password: fieldData.password
            }
            const result = await axios.post("/api/login", userData);
            console.log(result);
            
            if (result.status === 200) {
                localStorage.setItem("user", userData.email);
                localStorage.setItem("uid", result.data.id);
                navigate("/app");
            }
        } catch (error) {
            setError("Invalid email or password.");
        }
    };

    const handleSignUpSubmit = async (event) => {
        event.preventDefault();

      
    // Basic field data (make sure fieldData is defined in your component)
    const { name, email, password, confirmPassword } = fieldData;

    // Validation
    if (!name || !email || !password || !confirmPassword) {
        setError("All fields are required");
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        setError("Invalid email address");
        return;
    }

    // Password strength validation (example: at least 8 characters)
    if (password.length < 8) {
        setError("Password must be at least 8 characters long");
        return;
    }

    // Confirm password validation
    if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
    }

        try {
            const userData = {
                name: fieldData.name,
                email: fieldData.email,
                password: fieldData.password,
                confirmPassword: fieldData.confirmPassword
            }
            const result = await axios.post("https://render-backend-a89q.onrender.com/signup", userData);
            if (result.data.result) {
                localStorage.setItem("user", userData.email);
                localStorage.setItem("uid", result.data.id);
                navigate("/app");
            } else {
                setError("An error occurred , Please try again");
            }
        } catch (err) {
            console.error("Error during signup:", err);
            setError("An error occurred during signup  , Please try again");
        }
    };

    return (
        <div className="con">
        <Components.Container>
            <Components.SignUpContainer signingIn={signIn}>
                <Components.Form onSubmit={  handleSignUpSubmit}>
                    <Components.Title>Create Account</Components.Title>
                    <Components.Input 
                        type="text" 
                        name="name" // Add name attribute
                        placeholder="Name" 
                        onChange={handleChange} 
                        value={fieldData.name}
                    />
                    <Components.Input 
                        type="email" 
                        name="email" // Add name attribute
                        placeholder="Email" 
                        onChange={handleChange} 
                        value={fieldData.email}
                    />
                    <Components.Input 
                        type="password" 
                        name="password" // Add name attribute
                        placeholder="Password" 
                        onChange={handleChange} 
                        value={fieldData.password}
                    />
                    <Components.Input 
                        type="password" 
                        placeholder="Confirm Password" // Corrected placeholder
                        name="confirmPassword" // Add name attribute
                        onChange={handleChange}
                        value={fieldData.confirmPassword}
                    />
                    <p>{error} </p>
                    <Components.Button type="submit">Sign Up</Components.Button>
                </Components.Form>
            </Components.SignUpContainer>
            <Components.SignInContainer signingIn={signIn}>
                <Components.Form onSubmit={handleLoginSubmit}>
                    <Components.Title>Sign In</Components.Title>
                    <Components.Input 
                        type="email" 
                        name="email" // Add name attribute
                        placeholder="Email" 
                        onChange={handleChange} 
                    />
                    <Components.Input 
                        type="password" 
                        name="password" // Add name attribute
                        placeholder="Password" 
                        onChange={handleChange} 
                    />
                    <p style={{color : "red"}}>{error} </p>
                    <Components.Button type="submit">Sign In</Components.Button>
                </Components.Form>
            </Components.SignInContainer>
            <Components.OverlayContainer signingIn={signIn}>
                <Components.Overlay signingIn={signIn}>
                    <Components.LeftOverlayPanel signingIn={signIn}>
                        <Components.Title>Welcome Back!</Components.Title>
                        <Components.Paragraph>
                            To keep connected with us please login with your personal info
                        </Components.Paragraph>
                        <Components.GhostButton onClick={() => {toggle(true); setError("")}}>
                            Sign In
                        </Components.GhostButton>
                    </Components.LeftOverlayPanel>
                    <Components.RightOverlayPanel signingIn={signIn}>
                        <Components.Title>Hello, Friend!</Components.Title>
                        <Components.Paragraph>
                            Enter your personal details and start journey with us
                        </Components.Paragraph>
                        <Components.GhostButton onClick={() => {toggle(false); setError("")}}>
                            Sign Up
                        </Components.GhostButton>
                    </Components.RightOverlayPanel>
                </Components.Overlay>
            </Components.OverlayContainer>
        </Components.Container>
        </div>
    );
}
