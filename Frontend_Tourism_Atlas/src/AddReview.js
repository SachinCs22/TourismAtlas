import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import './AddReview.css';

const AddReview = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { destination } = location.state || {};
    const [review, setReview] = useState({
        rev: "",         
        rating: 0,
        destination: destination,
    });
    const [image, setImage] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setReview({ ...review, [name]: value });
    };

    const handleImageUpload = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('imageFile', image);
        formData.append('product', new Blob([JSON.stringify(review)], { type: "application/json" }));

        axios.post("http://localhost:8082/addReview", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }).then((response) => {
            console.log("review added successfully:", response.data);
            alert("review added successfully");
            sessionStorage.setItem('reviewId', response.data);
            navigate("/review",{
                state:{
                    destination:destination,
                }
            })
        }).catch((error) => {
            console.error("Error adding review:", error);
            alert("Error adding review");
        });
    };

    return (
        <div className="add-review-container">
            <h2>Add Your Review</h2>
            {<div className="error-message"></div>}
            <form onSubmit={handleSubmit} className="review-form">
                <div className="form-group">
                    <label htmlFor="image">Upload Image:</label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        accept="image/*"
                        onChange={handleImageUpload}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="rev">Review:</label> {/* Updated name to match state */}
                    <textarea
                        id="rev"
                        name="rev" // Updated to match the state key
                        value={review.rev}
                        onChange={handleInputChange}
                        placeholder="Write your review here..."
                        required
                    ></textarea>
                </div>

                <div className="form-group">
                    <label htmlFor="rating">Rating (1-5):</label>
                    <input
                        type="number"
                        id="rating"
                        name="rating"
                        value={review.rating}
                        onChange={handleInputChange}
                        min="1"
                        max="5"
                        required
                    />
                </div>

                <button type="submit" className="submit-btn">Submit Review</button>
            </form>
        </div>
    );
};

export default AddReview;
