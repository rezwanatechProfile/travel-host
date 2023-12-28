import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import HomeEdit from "./HomeEdit";
import ListingsContext from "../context/listings";

function HomeShow() {
  const { id } = useParams();
  const [showEdit, setShowEdit] = useState(false);
  const [creditCard, setCreditCard] = useState("");
  const {
    listings,
    deleteListingById,
    bookingData,
    updateBookingData,
    saveBooking,
    fetchListings,
    savedBooking,
  } = useContext(ListingsContext);

  const navigate = useNavigate();

  // State to store booked property information
  const [bookedProperties, setBookedProperties] = useState([]);
  const [deleting, setDeleting] = useState(false); // New state for managing deletion loading state

  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ //

  useEffect(() => {
    console.log("Updated Booked Properties:", bookedProperties);
  }, [bookedProperties]);

  const handleCancel = () => {
    setShowEdit(false);
  };

  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ //

  // Find the home with the matching id
  const home = listings.find((home) => home.id === parseInt(id));

  useEffect(() => {
    // Fetch listings data if not available

    fetchListings();
  }, [fetchListings]);

  if (!listings || !home) {
    return <div>Loading...</div>;
  }

  const handleDelete = async (listingId) => {
    try {
      // Set the loading state to true
      setDeleting(true);

      // Call the deleteListingById function
      await deleteListingById(listingId);

      // Update the state after successful deletion
      // No need to call fetchListings here; it's being done in the useEffect
    } catch (error) {
      console.error("Error deleting listing:", error);
    } finally {
      // Set the loading state back to false after the request is complete
      setDeleting(false);

      // Manually update the listings state after deletion
      setBookedProperties((prevBookedProperties) =>
        prevBookedProperties.filter(
          (booking) => booking.propertyId !== listingId
        )
      );
    }

    navigate("/");
  };

  const handleEdit = () => {
    setShowEdit(!showEdit);
  };

  const handleSubmit = () => {
    setShowEdit(false);
  };

  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ //

  // Function to check if a property is booked
  const isPropertyBooked = (propertyId) => {
    return bookedProperties.some(
      (booking) => booking.propertyId === propertyId
    );
  };

  // +++++++++++ +++++++++++++++++++++++++++++++ //

  // Function to check availability and return corresponding element
  const getAvailabilityIndicator = () => {
    const isAvailable = home.isAvailable && !isPropertyBooked(home.id);

    return isAvailable ? (
      <span style={{ color: "green" }}>Property is available</span>
    ) : (
      <>
        <span style={{ color: "blue" }}>
          {isPropertyBooked(home.id) ? "Property is booked" : ""}
        </span>
        <span style={{ color: "red" }}>
          {isPropertyBooked(home.id) ? "" : "Property is not available"}
        </span>
        {/* Additional content for booked property */}
        {isPropertyBooked(home.id) && (
          <div>
            <p style={{ color: "blue" }}>Booking details:</p>
            <p style={{ color: "blue" }}>
              Check-in: {bookedProperties[0].dateFrom}
            </p>
            <p style={{ color: "blue" }}>
              Check-out: {bookedProperties[0].dateTo}
            </p>
            {/* Add more booking details as needed */}
          </div>
        )}
      </>
    );
  };

  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ //

  // Determine the property type based on state variables
  const determinePropertyType = () => {
    if (home.isSingleHouse) {
      return "Single House";
    } else if (home.isTownHouse) {
      return "Town House";
    } else if (home.isApartment) {
      return "Apartment";
    } else if (home.isCondo) {
      return "Condo";
    } else {
      return "Unknown Property Type";
    }
  };

  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ //

  const handleBook = (event) => {
    event.preventDefault();

    // Replace this with your availability check logic
    const isAvailable = true;

    if (isAvailable) {
      // Calculate the total days for booking
      const fromDateTime = new Date(bookingData.dateFrom).getTime();
      const toDateTime = new Date(bookingData.dateTo).getTime();
      const differenceInMilliseconds = Math.abs(toDateTime - fromDateTime);
      const totalDays = Math.ceil(
        differenceInMilliseconds / (1000 * 60 * 60 * 24)
      );

      // Save the booking data
      const newBooking = {
        propertyId: home.id,
        propertyName: home.title,
        dateFrom: bookingData.dateFrom,
        dateTo: bookingData.dateTo,
        creditCardInfo: creditCard,
        totalDays: totalDays,
      };

      // Call the function to save the booking data
      saveBooking(newBooking);
      // Update the state to reflect the booked property
      setBookedProperties((prevBookedProperties) => [
        ...prevBookedProperties,
        newBooking,
      ]);

      // Redirect to the booking page
      navigate("/booking");
    } else {
      // Property is not available, handle accordingly
      console.log(
        `Sorry, the property with ID ${home.id} is not available for the selected dates.`
      );
    }
  };

  const propertyTypeText = determinePropertyType();

  return (
    <div className="home-show-container">
      <div className="image-container">
        <img
          src={`https://picsum.photos/seed/${home.id}/400/300`}
          alt="listings"
        />
        <button>
          <Link to={"/"}>Go Back</Link>
        </button>
      </div>
      <div className="details-container">
        <div className="details-card">
          {showEdit ? (
            <HomeEdit
              home={home}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
            />
          ) : (
            <>
              <h2>{home.title}</h2>
              {getAvailabilityIndicator(home.isAvailable)}
              <p>Price Per Day: ${home.price}</p>
              <p>Available Date From: {home.availableDateFrom}</p>
              <p>Available Date To: {home.availableDateTo}</p>
              <p>Number of Rooms: {home.numberOfRooms}</p>
              <p>Number of Bathrooms: {home.numberOfBathrooms}</p>
              <p>Property Type: {propertyTypeText}</p>
              <p>Location: {home.location}</p>
            </>
          )}
        </div>

        <div className="">
          {!showEdit && (
            <>
              <button
                className={showEdit ? "disabled" : ""}
                onClick={handleEdit}
                disabled={showEdit}
              >
                Edit
              </button>

              <button
                className={showEdit ? "disabled" : ""}
                onClick={() => handleDelete(home.id)}
                disabled={showEdit}
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>

              {home.isAvailable && !isPropertyBooked(home.id) && (
                <>
                  <h2>Book this property</h2>

                  <form onSubmit={handleBook}>
                    <label>Date From:</label>
                    <input
                      type="date"
                      value={bookingData.dateFrom || ""}
                      onChange={(e) =>
                        updateBookingData({ dateFrom: e.target.value })
                      }
                    />

                    <label>Date To:</label>
                    <input
                      type="date"
                      value={bookingData.dateTo || ""}
                      onChange={(e) =>
                        updateBookingData({ dateTo: e.target.value })
                      }
                    />

                    <label>Credit Card:</label>
                    <input
                      type="text"
                      value={creditCard}
                      onChange={(e) => setCreditCard(e.target.value)}
                    />

                    <button
                      type="submit"
                      className={showEdit ? "disabled" : ""}
                      disabled={showEdit}
                    >
                      Book
                    </button>
                  </form>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomeShow;
