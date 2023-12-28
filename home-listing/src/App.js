import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeList from './components/HomeList'
import HomeShow from './components/HomeShow';
import HomeCreate from './components/HomeCreate'
import Home from './components/Home';
import BookingHome from './components/BookingHome';


function App() {
  return (
      <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<HomeCreate />} />
            <Route path="/listing/:id" element={<HomeShow />} />
            <Route path="/booking" element={<BookingHome />} />
          </Routes>
      </Router>
    );
}

export default App;
