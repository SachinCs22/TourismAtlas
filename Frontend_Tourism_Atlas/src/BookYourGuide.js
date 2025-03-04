// src/pages/BookYourGuide.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GuideCard from './GuideCard';
import { useLocation } from 'react-router-dom';
import './BookYourGuide.css';

const BookYourGuide = () => {
  const [guides, setGuides] = useState([]);

  const location=useLocation();
  const { guidedest} = location.state || {};
  useEffect(() => {
    const fetchGuides = async () => {
      try {
        const response = await axios.get(`http://localhost:8082/guide/${guidedest}`);
        if (response.status === 200 && Array.isArray(response.data)) {
          setGuides(response.data);  // Set guides if response is a valid array
        } else if (response.status === 204) {
          console.log('No guides found for this location.');
          setGuides([]);  // Ensure guides is an empty array if no content
        }
      } catch (error) {
        console.error('Error fetching guides:', error);
      }
    };
    
    fetchGuides();
  }, []);

  return (
    <div className="book-your-guide">
      <h1>Book Your Guide</h1>
      <div className="guides-container">
        {guides.map((guide) => (
          <GuideCard key={guide.id} guide={guide} />
        ))}
      </div>
    </div>
  );
};

export default BookYourGuide;
