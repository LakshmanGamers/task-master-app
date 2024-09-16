import React, { useEffect, useState } from 'react';
import { GoogleIcon } from './CustomIcons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
axios.defaults.withCredentials = true; // This ensures cookies are sent with requests

const SignIn = () => {
    const [fieldData, setFieldData] = useState({ email: "", password: "" });
    const [error, setError] = useState(""); 
    const navigate = useNavigate();

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
    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(""); // Clear previous errors

        try {
            const result = await axios.post("/api/login", fieldData);
            if (result.status === 200) {
                localStorage.setItem("user", fieldData.email);
                localStorage.setItem("uid", result.data.id);
                navigate("/app");
            }
        } catch (error) {
            // Handle specific error responses
            setError("Invalid email or password.");
           
        }
    };

    return (
        <div className="sign-in-container">
            <form onSubmit={handleSubmit}>
                <div className='form-element'>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={fieldData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='form-element'>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={fieldData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                
                <input
                    type="submit"
                    value="Sign In"
                    className="submit-button"
                />

                {error && <p className="error-message">{error}</p>} 
            </form>

            <p>or</p>
            <button className="google-button">
                <GoogleIcon className="google-icon" /> Sign In with Google
            </button>
        </div>
    );
};

export default SignIn;



