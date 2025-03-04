import React, { useEffect, useState } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import './HomeGuide.css';
import './Navbar.css';

const HomeGuide = () => {
    // const { id } = useParams();
  const [guide, setGuide] = useState(null); // State to hold the logged-in guide's details
  const navigate = useNavigate();
  const location = useLocation();
  const { guiden } = location.state || {};

//   useEffect(() => {
//     const isLoggedIn = sessionStorage.getItem('isLoggedIn');
//     const guideId = sessionStorage.getItem('guideId'); // Assume guide ID is stored in session storage on login

//     if (!isLoggedIn || !guideId) {
//       navigate('/homeGuide');
//     } else {
//       fetchGuideDetails(guideId);
//     }
//   }, [navigate]);

  // Function to fetch the logged-in guide's details
  useEffect(()=>{
    const fetchGuideDetails = async () => {
        try {
          const response = await fetch(`http://localhost:8082/homeGuide/${guiden}`);
          if (response.ok) {
            const data = await response.json();
            setGuide(data);
          } else {
            console.error('Failed to fetch guide details');
          }
        } catch (error) {
          console.error('Error fetching guide details:', error);
        }
      };
      fetchGuideDetails();
  })
  

  const handleLogout = () => {
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('guideId'); // Clear the stored guide ID
    navigate('/', { replace: true });
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-brand">Tourism Atlas</div>
        <ul className="navbar-links">
          <li onClick={() => navigate('/bookingsforguide')}>Bookings</li>
          {/* <li onClick={() => navigate('/homeGuide')}>Profile</li> */}
          <li onClick={handleLogout}>Logout</li>
        </ul>
      </nav>

      {/* Main content */}
      <div className="home-guide-container">
        <h2>Guide Profile</h2>
        {guide ? (
          <div className="guide-details">
            <p><strong>Name:</strong> {guide.name}</p>
            <p><strong>Email:</strong> {guide.email}</p>
            <p><strong>Phone Number:</strong> {guide.phoneNumber}</p>
            <p><strong>Location:</strong> {guide.location}</p>
            <p><strong>About Me:</strong> {guide.aboutMe}</p>
          </div>
        ) : (
          <p>Loading guide details...</p>
        )}
      </div>
    </div>
  );
};

export default HomeGuide;
