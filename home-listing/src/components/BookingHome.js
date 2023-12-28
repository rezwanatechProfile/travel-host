import React, { useContext, useEffect, useState } from 'react';
import ListingsContext from '../context/listings';
import { Link } from 'react-router-dom';


function BookingHome() {
  const { listings, savedBooking } = useContext(ListingsContext);

  // State to store the selectedListing and totalDays
  const [selectedListing, setSelectedListing] = useState(null);
  const [totalDays, setTotalDays] = useState(null);

  useEffect(() => {
    // Retrieve the booking information from savedBooking
    const bookingData = savedBooking; // savedBooking is directly the booking data

    // Ensure bookingData is defined and not null before accessing its properties
    if (bookingData && bookingData.propertyId) {
      // Find the selected listing based on the propertyId in bookingData
      const listing = listings.find(
        (listing) => listing.id === bookingData.propertyId
      );

      // Set the state with the selected listing and totalDays
      setSelectedListing(listing);
      setTotalDays(bookingData.totalDays);
    }
  }, [listings, savedBooking]);

  return (
    <div>
      <h2>Booking Confirmation</h2>

      {selectedListing ? (
        <p>
          You have booked property <b>{selectedListing.title}</b> for{" "}
          {totalDays} days.
        </p>
      ) : (
        <p>No booking information available.</p>
      )}

      <button>
        <Link to={"/"}>Go Back</Link>
      </button>
    </div>
  );
}

export default BookingHome;

