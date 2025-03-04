import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './BookingForGuide.css';

const BookingForGuide = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const guideId = sessionStorage.getItem('guideId');
   
    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get(`http://localhost:8082/guide/bookings/${guideId}`);
                setBookings(response.data);
            } catch (err) {
                setError('Error fetching bookings');
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, [bookings]);

    if (loading) {
        return <div className="bookings-for-guide-loading">Loading bookings...</div>;
    }

    if (error) {
        return <div className="bookings-for-guide-error">{error}</div>;
    }

    return (
        <div className="bookings-for-guide">
            <h1 className="bookings-for-guide-header">Bookings for Guide</h1>
            {bookings.length > 0 ? (
                <table className="bookings-for-guide-table">
                    <thead>
                        <tr>
                            <th className="bookings-for-guide-table-header">Tourist Name</th>
                            <th className="bookings-for-guide-table-header">Booking Date</th>
                            <th className="bookings-for-guide-table-header">Tourist Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking, index) => (
                            <tr key={index} className="bookings-for-guide-table-row">
                                <td className="bookings-for-guide-table-cell">{booking.touristName}</td>
                                <td className="bookings-for-guide-table-cell">{booking.bookingDate}</td>
                                <td className="bookings-for-guide-table-cell">{booking.touristMail}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="bookings-for-guide-no-bookings">No bookings available.</p>
            )}
        </div>
    );
};

export default BookingForGuide;
