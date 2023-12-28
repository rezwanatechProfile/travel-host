import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';



const SearchBar = ({ onSearch }) => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = () => {
    // Call the onSearch prop with selectedDate and location
    onSearch(fromDate, toDate, location);
    console.log('From Date:', fromDate);
    console.log('To Date:', toDate);
    console.log('Location:', location);
  };

  const stateOptions = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
    'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
    'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri',
    'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina',
    'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
    'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
  ];


  return (
    <div className="search-bar">
      <div className="date-picker-container">
        <label>From Date:</label>
        <DatePicker
          selected={fromDate}
          onChange={(date) => setFromDate(date)}
          placeholderText="Select From Date"
          dateFormat="MM/dd/yyyy"
          className="date-picker"
        />
      </div>
      <div className="date-picker-container">
        <label>To Date:</label>
        <DatePicker
          selected={toDate}
          onChange={(date) => setToDate(date)}
          placeholderText="Select To Date"
          dateFormat="MM/dd/yyyy"
          className="date-picker"
        />
      </div>
      <div className="location-container">
      <label>Location</label>
        <select value={location} onChange={(e) => setLocation(e.target.value)}>
          <option value="">Select your area</option>
          {stateOptions.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>

      </div>
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;