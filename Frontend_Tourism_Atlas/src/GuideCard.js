import React, { useState } from 'react';
import axios from 'axios';


const GuideCard = ({ guide }) => {
  const [bookingDate, setBookingDate] = useState('');
  
  const handleBooking = async () => {
    
const userId = sessionStorage.getItem('userId');
    if (!bookingDate) {
      alert('Please select a booking date.');
      return;
    }

    try {
      const formattedBookingDate = new Date(bookingDate).toISOString().split('T')[0];
      
      const response = await axios.post('http://localhost:8082/create', {
        "bookingDate": formattedBookingDate,
        "userId":userId,
        "guideId": guide.id 
      });

      if (response.status === 200) {
        alert('Slot Booked');
      }
    } catch (error) {

       if (error.response.status === 400) {
        alert(error.response.data);
      }
     else {
      console.error('Error booking guide:', error);
      alert(error);
    }
    }
  };

  return (
    <div className="guide-card">
      <h3>{guide.name}</h3>
      <p><strong>Email:</strong> {guide.email}</p>
      <p><strong>Phone Number:</strong> {guide.phoneNumber}</p>
      <p><strong>Location:</strong> {guide.location}</p>
      <p><strong>About Me:</strong> {guide.aboutMe}</p>
      <p><strong>Charges:</strong> ₹{guide.charges}</p> 

      <label>
        <strong>Select Booking Date:</strong>
        <input 
          type="date" 
          value={bookingDate} 
          onChange={(e) => setBookingDate(e.target.value)} 
          required 
        />
      </label>

      <button onClick={handleBooking}>
        {'Book Guide'}
      </button>
    </div>
  );
};

export default GuideCard;
