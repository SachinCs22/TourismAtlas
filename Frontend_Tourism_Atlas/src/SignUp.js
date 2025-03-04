import React, { useState } from "react";
import axios from "axios";
import './SignUp.css';
import { useNavigate } from "react-router-dom";

function SignUp() {

  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      "name": name,
      "password": password,
      "email": email
    };

    try {
      const response = await axios.post('http://localhost:8082/addUser', data);
      console.log(response.data);
      if (!response.data) {
        alert("Invalid User Id or Password");
      } else {
        alert("Registration Successful");
        navigate("/");
      }

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container-signup">
      <form className="form-signup" onSubmit={handleSubmit}>
        <h2 className="heading-signup">Sign Up</h2>

        <label className="label-signup-name">Name:</label>
        <input
          className="input-signup-name"
          type="text"
          name="name"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br /><br />

        <label className="label-signup-email">Email:</label>
        <input
          className="input-signup-email"
          type="email"
          name="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br /><br />

        <label className="label-signup-password">Password:</label>
        <input
          className="input-signup-password"
          type="password"
          name="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br /><br />

        <button className="button-signup-submit" type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;
