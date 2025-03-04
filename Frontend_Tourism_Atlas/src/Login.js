import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('Tourist');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const data = {
      userId: username,
      password: password,
    };

    try {
      if (userType === "Tourist") {
        const response = await axios.post("http://localhost:8082/loginUser", data);

        if (response.data===-1) {
          alert("Invalid User ID or Password");
        } else {
          alert("Login Successful");
          sessionStorage.setItem('isLoggedIn', 'true'); 
          sessionStorage.setItem('userId', response.data);
          navigate("/home");
        }
      } else if (userType === "Guide") {
        const response = await axios.post("http://localhost:8082/loginGuide", data);

        if (!response.data) {
          alert("Invalid User ID or Password");
        } else {
          alert("Login Successful");
          console.log(response.data);
          sessionStorage.setItem('guideId', response.data);
          navigate('/homeGuide',{
            state:{
              guiden:username,
            },
          });
        }
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred while logging in. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className='login-form-back'>
      <h2>Tourism Atlas</h2>
      <form onSubmit={handleLogin}>
        <label>
          Email:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          I am a:
          <select
            className="option"
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
          >
            <option value="Tourist">Tourist</option>
            <option value="Guide">Guide</option>
          </select>
        </label>
        <button type="submit">Login</button>
      </form>
      <div className="signup">
        <p>Don't have an account?</p>
        <button
          onClick={() => {
            if (userType === "Tourist") {
              navigate('/addUser');
            } else {
              navigate('/signUpGuide');
            }
          }}
        >
          Sign Up
        </button>
      </div>
      </div>
    </div>
  );
};

export default Login;
