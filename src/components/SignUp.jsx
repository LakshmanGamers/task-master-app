import React, { useState ,useEffect} from 'react';
import { GoogleIcon } from './CustomIcons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
axios.defaults.withCredentials = true; // This ensures cookies are sent with requests

const SignUp = () => {
    const [fieldData, setFieldData] = useState({
        email: "",
        password: "",
        name: "",
        confirmPassword: ""
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(()=>{
        // Check if user is already logged in
        if (localStorage.getItem("user")) {
            navigate("/app");
        }
    },[]);
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFieldData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Basic validation
        if (fieldData.password !== fieldData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            console.log(fieldData)
            const result = await axios.post("/api/signup", fieldData);
            if (result.data.result) {
                localStorage.setItem("user", fieldData.email);
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
        <div className='sign-up-container'>
            <form onSubmit={handleSubmit}>
                <div className='form-element'>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={fieldData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
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
                <div className='form-element'>
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input
                        type="password"
                        id="confirm-password"
                        name="confirmPassword"
                        value={fieldData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                </div>
                {error && <p className="error">{error}</p>}
                <input
                    type="submit"
                    value="Sign Up"
                    className="submit-button"
                />
            </form>

            <p>or</p>
            <br />
            <button>
                <GoogleIcon /> Sign In with Google
            </button>
        </div>
    );
};

export default SignUp;
