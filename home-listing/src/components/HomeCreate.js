// HomeCreate.js
import React, { useState, useContext } from 'react';
import ListingsContext from '../context/listings'

function HomeCreate() {
  const { createListing } = useContext(ListingsContext);

  // Local state for input values
  const [title, setTitle] = useState("");
  const [availableDateFrom, setAvailableDateFrom] = useState("");
  const [availableDateTo, setAvailableDateTo] = useState("");
  const [price, setPrice] = useState("");
  const [numberOfRooms, setNumberOfRooms] = useState("");
  const [numberOfBathrooms, setNumberOfBathrooms] = useState("");
  const [isSingleHouse, setIsSingleHouse] = useState(false);
  const [isTownHouse, setIsTownHouse] = useState(false);
  const [isApartment, setIsApartment] = useState(false);
  const [isCondo, setIsCondo] = useState(false);
  const [image, setImage] = useState("");
  const [location, setLocation] = useState("");
  const [isAvailable, setIsAvailable] = useState(false);

  // Update State for File Upload
  const [selectedFile, setSelectedFile] = useState(null);

  const stateOptions = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
    'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
    'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri',
    'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina',
    'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
    'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
  ];

  // Handle file change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create a new listing object with the input values
    const newListing = {
      title,
      price: Number(price),
      isAvailable,
      numberOfRooms: Number(numberOfRooms),
      numberOfBathrooms: Number(numberOfBathrooms),
      isSingleHouse,
      isTownHouse,
      isApartment,
      isCondo,
      image,
      location,
      availableDateFrom,
      availableDateTo,
    };

    // Call createListing with the new listing object and selected file
    await createListing(newListing, selectedFile);

    // Reset the form after submission
    setTitle("");
    setPrice(0);
    setIsAvailable(false);
    setNumberOfRooms("");
    setNumberOfBathrooms("");
    setIsSingleHouse(false);
    setIsTownHouse(false);
    setIsApartment(false);
    setIsCondo(false);
    setImage("");
    setLocation("");
    setAvailableDateFrom("");
    setAvailableDateTo("");
  };

  return (
    <div className="home-create">
      <h3>Create a New Listing</h3>
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Available Date From</label>
        <input
          type="date"
          value={availableDateFrom}
          onChange={(e) => setAvailableDateFrom(e.target.value)}
        />

        <label>Available Date To</label>
        <input
          type="date"
          value={availableDateTo}
          onChange={(e) => setAvailableDateTo(e.target.value)}
        />

        <label>Price per Day</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          min={1}
        />

        {/* <label>Image Upload</label>
        <input type="file" onChange={handleFileChange} accept="image/png, image/jpeg, image/jpg" /> */}

        <label>Location</label>
        <select value={location} onChange={(e) => setLocation(e.target.value)}>
          <option value="">Select your area</option>
          {stateOptions.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>

        <label>Number of Rooms</label>
        <input
          type="number"
          value={numberOfRooms}
          onChange={(e) => setNumberOfRooms(e.target.value)}
          min={1}
        />

        <label>Number of Bathrooms</label>
        <input
          type="number"
          value={numberOfBathrooms}
          onChange={(e) => setNumberOfBathrooms(e.target.value)}
          min={1}
        />

        <div className="flex">
          <label>Is Available</label>
          <input
            type="checkbox"
            checked={isAvailable}
            onChange={() => setIsAvailable(!isAvailable)}
          />
        </div>

        <div className="flex">
          <label>Single House</label>
          <input
            type="checkbox"
            checked={isSingleHouse}
            onChange={() => setIsSingleHouse(!isSingleHouse)}
          />
        </div>

        <div className="flex">
          <label>Town House</label>
          <input
            type="checkbox"
            checked={isTownHouse}
            onChange={() => setIsTownHouse(!isTownHouse)}
          />
        </div>

        <div className="flex">
          <label>Apartment</label>
          <input
            type="checkbox"
            checked={isApartment}
            onChange={() => setIsApartment(!isApartment)}
          />
        </div>

        <div className="flex">
          <label>Condo</label>
          <input
            type="checkbox"
            checked={isCondo}
            onChange={() => setIsCondo(!isCondo)}
          />
        </div>

        <button type="submit">Create Listing</button>
      </form>
    </div>
  );
}

export default HomeCreate;

