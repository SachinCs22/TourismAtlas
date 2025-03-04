import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import './Navbar.css';
import { useEffect } from 'react';

const Home = () => {
  const [startLocation, setStartLocation] = useState('');
  const [destination, setDestination] = useState('');
  const [startCoords, setStartCoords] = useState([]);
  const [destinationCoords, setDestinationCoords] = useState([]);
  const [userLocation, setUserLocation] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      navigate('/home'); 
    }
  }, [navigate]);
  const fetchCoordinates = async (placeName, setCoords) => {
    if (!placeName) {
      return;
    }

    const encodedPlaceName = encodeURIComponent(placeName);
    const url = `https://nominatim.openstreetmap.org/search?q=${encodedPlaceName}&format=json&addressdetails=1`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.length > 0) {
        const { lat, lon } = data[0];
        setCoords([parseFloat(lat), parseFloat(lon)]);
      } else {
        alert(`No results found for the location: ${placeName}`);
        setCoords(null);
      }
    } catch (error) {
      console.error('Error fetching coordinates:', error);
      setCoords(null);
    }
  };

  const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setStartCoords([latitude, longitude]);
            resolve([latitude, longitude]);
          },
          (error) => {
            console.error('Error getting location:', error.message);
            reject(error);
          },
          {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
        alert('Geolocation is not supported by this browser.');
        reject(new Error('Geolocation is not supported by this browser.'));
      }
    });
  };

  const handleGo = async () => {
    try {
      if (userLocation) {
        await getCurrentLocation();
      } else {
        await fetchCoordinates(startLocation, setStartCoords);
      }

      await fetchCoordinates(destination, setDestinationCoords);

      if (
        Array.isArray(startCoords) &&
        startCoords.length === 2 &&
        Array.isArray(destinationCoords) &&
        destinationCoords.length === 2
      ) {
        navigate('/map', {
          state: {
            start: startCoords,
            end: destinationCoords,
            dest : destination, 
          },
        });
      } else {
      }
    } catch (error) {
      console.error('Error handling the Go action:', error);
    }
  };

  const handleLocationToggle = () => {
    if (userLocation) {
      setUserLocation(false);
      setStartLocation('');
    } else {
      setUserLocation(true);
      setStartLocation('Your Location');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('isLoggedIn');
    navigate('/',{ replace: true }); 
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-brand">Tourism Atlas</div>
        <ul className="navbar-links">
          <li onClick={() => navigate('/home')}>Home</li>
          <li onClick={() => navigate('/map')}>Map</li>
          <li onClick={handleLogout}>Logout</li>
        </ul>
      </nav>

      {/* Main content */}
      <div className="home-container">
        <h2>Tourism Atlas</h2>
        <div>
          <button onClick={handleLocationToggle}>
            {userLocation ? 'Using Your Location' : 'Use Your Location'}
          </button>
        </div>
        <div className="form-group">
          <label>
            <p className='label'>Starting Position:</p>
            <input
              type="text"
              value={startLocation}
              onChange={(e) => setStartLocation(e.target.value)}
              placeholder="Enter starting location"
              disabled={userLocation} 
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            <p className='label'>Destination:</p>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Enter destination"
              required
            />
          </label>
        </div>
        <button onClick={handleGo}>Go</button>
      </div>
    </div>
  );
};

export default Home;
