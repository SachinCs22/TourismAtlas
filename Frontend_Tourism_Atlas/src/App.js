import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import Map from './Map';
import SignUp from './SignUp';
import History from './History';
import AddReview from './AddReview';
import Review from './Review';
import SignUpGuide from './SignUpGuide';
import HomeGuide from './HomeGuide';
import BookYourGuide from './BookYourGuide';
import BookingForGuide from './BookingForGuide';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/addUser" element={<SignUp />} />
          <Route path="/guide" element={<BookYourGuide />} />
          <Route path="/home" element={<Home />} />
          <Route path='/history' element={<History />}/>
          <Route path='/addReview' element={<AddReview />}/>
          <Route path='/signUpGuide' element={<SignUpGuide />}/>
          <Route path='/homeGuide' element={<HomeGuide />}/>
          <Route path='/bookingsforguide' element={<BookingForGuide />}/>
          <Route path='/review' element={<Review />}/>
          <Route path="/map" element={<Map />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
