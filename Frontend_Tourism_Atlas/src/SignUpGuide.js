import React, { useState } from "react";
import axios from "axios";
import './SignUpGuide.css';
import { useNavigate } from "react-router-dom";

function SignUpGuide() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhone] = useState('');
    const [charges, setCharges] = useState('');
    const [location, setLocation] = useState('');
    const [aboutMe, setAboutMe] = useState('');
    const [password, setPassword] = useState('');
    
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            "name": name,
            "email": email,
            "phoneNumber": phoneNumber,
            "charges": charges,
            "location": location,
            "aboutMe": aboutMe, 
            "password": password
        };
        
        try {
            const response = await axios.post('http://localhost:8082/addGuide', data);
            console.log(response.data);
            if (!response.data) {
                alert("Registration Failed. Please check your inputs.");
            } else {
                alert("Guide Registration Successful");
                navigate("/");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="container-signup-guide">
            <form className="form-signup-guide" onSubmit={handleSubmit}>
                <h2 className="heading-signup-guide">Sign Up as Guide</h2>

                <label className="label-signup-guide-name">Name:</label>
                <input
                    className="input-signup-guide-name"
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <br /><br />

                <label className="label-signup-guide-email">Email:</label>
                <input
                    className="input-signup-guide-email"
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <br /><br />

                <label className="label-signup-guide-phone">Phone Number:</label>
                <input
                    className="input-signup-guide-phone"
                    type="text"
                    name="phoneNumber"
                    placeholder="Enter your phone number"
                    value={phoneNumber}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                />
                <br /><br />

                <label className="label-signup-guide-location">Location:</label>
                <input
                    className="input-signup-guide-location"
                    type="text"
                    name="location"
                    placeholder="Enter your location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                />
                <br /><br />

                <label className="label-signup-guide-about-me">About Me:</label>
                <textarea
                    className="textarea-signup-guide-about-me"
                    name="aboutMe"
                    placeholder="Tell us about yourself"
                    value={aboutMe}
                    onChange={(e) => setAboutMe(e.target.value)}
                    required
                />
                <br /><br />

                <label className="label-signup-guide-password">Password:</label>
                <input
                    className="input-signup-guide-password"
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <br /><br />

                <label className="label-signup-guide-charges">Charges:</label>
                <input
                    className="input-signup-guide-charges"
                    type="number"
                    name="charges"
                    placeholder="Enter your charges (for guides)"
                    value={charges}
                    onChange={(e) => setCharges(e.target.value)}
                    min="0"
                    step="0.01"
                />
                <br /><br />

                <button className="button-signup-guide-submit" type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default SignUpGuide;
