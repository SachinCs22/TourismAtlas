import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Review.css"

const Review = () => {
    // const {id}=useParams();
    const [reviews, setReviews] = useState([]);
    const [error, setError] = useState(null);
    const location = useLocation();
    const { destination } = location.state || {};

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get(`http://localhost:8082/reviews/${destination}`);
                setReviews(response.data);
            } catch (error) {
                setError('Error fetching reviews.');
                console.error(error);
            }
        };

        if (destination) {
            fetchReviews();
        }
    }, [destination]);

    const handleDeleteReview = async (reviewId) => {
        try {
            console.log(reviews)
            await axios.delete(`http://localhost:8082/reviews/${reviewId}`);
            
            setReviews(reviews.filter(review => review.id !== reviewId));
            alert("Review deleted successfully!");
        } catch (error) {
            console.error("Error deleting review:", error);
            alert("Error deleting review");
        }
    };

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="reviews-container">
            <h2>Reviews for {destination}</h2>
            {reviews.length === 0 ? (
                <p>No reviews available for this destination.</p>
            ) : (
                <ul>
                    {reviews.map((review) => (
                        <li key={review.id} className="review-item">
                            {review.imageDate && (
                                <img
                                    src={`data:image/jpeg;base64,${review.imageDate}`} 
                                    alt="Review"
                                    className="review-image"
                                />
                            )}
                            <h3>{review.rev}</h3>
                            <p>Rating: {review.rating}</p>
                            {/* Optionally display the image if it's uploaded */}
                            <button
                                onClick={() => handleDeleteReview(review.id)}
                                className="delete-btn"
                            >
                                Delete Review
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Review;
