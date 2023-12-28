import React, { useState, useContext } from 'react'
import ListingsContext from '../context/listings'

function HomeEdit({ home, onSubmit, onCancel}) {

  const { editListingById } = useContext(ListingsContext)

  const [editedHome, setEditedHome] = useState({ ...home });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedHome({ ...editedHome, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setEditedHome({ ...editedHome, [name]: checked });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit()
    editListingById(editedHome.id, editedHome)

  };

  const handleCancel = () => {
    onCancel();
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
    <form onSubmit={handleSubmit} className='homeEdit-form'>
      <label>Title</label>
      <input
        type="text"
        name="title"
        value={editedHome.title}
        onChange={handleChange}
      />

      <label>Price</label>
      <input
        type="number"
        name="price"
        value={editedHome.price}
        onChange={handleChange}
      />

      <label>Available Date From</label>
      <input
        type="date"
        name="availableDateFrom"
        value={editedHome.availableDateFrom}
        onChange={handleChange}
      />

      <label>Available Date To</label>
      <input
        type="date"
        name="availableDateTo"
        value={editedHome.availableDateTo}
        onChange={handleChange}
      />

      <label>Number of Rooms</label>
      <input
        type="number"
        name="numberOfRooms"
        value={editedHome.numberOfRooms}
        onChange={handleChange}
      />

      <label>Number of Bathrooms</label>
      <input
        type="number"
        name="numberOfBathrooms"
        value={editedHome.numberOfBathrooms}
        onChange={handleChange}
      />

      <label>Location</label>
      <select
        type="text"
        name="location"
        value={editedHome.location}
        onChange={handleChange}
      >
        <option value="">Select your area</option>
        {stateOptions.map((state) => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </select>

      <label>Single House</label>
      <input
        type="checkbox"
        name="isSingleHouse"
        checked={editedHome.isSingleHouse}
        onChange={handleCheckboxChange}
      />

      {/* Add other checkboxes and inputs here */}
      <div className='flex-div'>

      <button type="submit">Save Changes</button>
      <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
      </div>
    </form>
  );
}

export default HomeEdit
