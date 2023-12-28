import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import ListingsContext from '../context/listings';

function HomeList() {
  const { listings, savedBooking } =
    useContext(ListingsContext);

  const [filteredHomes, setFilteredHomes] = useState(listings);

  // State to store booked property information
  const [bookedProperties, setBookedProperties] = useState([]);



  // Update bookedProperties when savedBooking changes
  useEffect(() => {
    if (savedBooking) {
      setBookedProperties((prevBookedProperties) => [
        ...prevBookedProperties,
        savedBooking,
      ]);
    }
  }, [savedBooking]);

  const handleSearch = (fromDate, toDate, location) => {
    // Use the filter method to create a new array of homes that match the search criteria
    const filteredResults = listings.filter((home) => {
      // Check if the selectedDate falls within the available date range of the home

      console.log("Home Location:", home.location);
      console.log("Selected Location:", location);
      // Check if the selectedDate falls within the available date range of the home
      const fromDateObject = new Date(fromDate);
      const toDateObject = new Date(toDate);
      const availableFromDate = new Date(home.availableDateFrom);
      const availableToDate = new Date(home.availableDateTo);

      const dateCondition =
        (!fromDate || availableFromDate <= fromDateObject) &&
        (!toDate || availableToDate >= toDateObject);

      const locationCondition =
        home.location && location ? home.location === location : true;

      console.log("Date Condition:", dateCondition);
      console.log("Location Condition:", locationCondition);

      // Combine the conditions using logical AND
      return dateCondition && locationCondition;
    });

    console.log(filteredResults);

    // Update the state with the filtered results
    setFilteredHomes(filteredResults);
  };

  // +++++++++++ ++++++++++++++++++++++++++++++++++++++++//
  // Update the state with the filtered results


  // +++++++++++ ++++++++++++++++++++++++++++++++++++++++//

  // Function to check if a property is booked
  const isPropertyBooked = (propertyId) => {
    return bookedProperties.some(
      (booking) => booking.propertyId === propertyId
    );
  };

  // +++++++++++ +++++++++++++++++++++++++++++++ //

  // Function to check availability and return corresponding element
  const getAvailabilityIndicator = (listing) => {
    const isAvailable = listing.isAvailable && !isPropertyBooked(listing.id);

    return isAvailable ? (
      <span style={{ color: "green" }}>Property is available</span>
    ) : (
      <>
        <span style={{ color: "blue" }}>
          {isPropertyBooked(listing.id) ? "Property is booked" : ""}
        </span>
        <span style={{ color: "red" }}>
          {isPropertyBooked(listing.id) ? "" : "Property is not available"}
        </span>
      </>
    );
  };


  const homesToRender = filteredHomes.length > 0 ? filteredHomes : listings;

  const renderedListings = homesToRender.map((listing) => (
    <div key={listing.id} className="listing-card">
      <Link to={`/listing/${listing.id}`}>
        <img
          src={`https://picsum.photos/seed/${listing.id}/300/200`}
          alt="listings"
        />
        <div className="">
          <p>{listing.title}</p>
          <p>Price/Day: ${listing.price}</p>
          <p>Location: {listing.location}</p>
        </div>


        {getAvailabilityIndicator(listing)}
      </Link>
    </div>
  ));

  return (
    <div className="home-list-container">
      <SearchBar onSearch={handleSearch} />
      <div className="home-list">{renderedListings}</div>
    </div>
  );
}

export default HomeList;

