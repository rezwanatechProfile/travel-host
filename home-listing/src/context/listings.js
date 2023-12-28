// listings.js
import { createContext, useState } from "react";
import axios from 'axios';


const ListingsContext = createContext();

function Provider({ children }) {
  const [listings, setListings] = useState([]);
  const [bookingData, setBookingData] = useState({
    propertyId: null,
    dateFrom: null,
    dateTo: null,
    creditCardInfo: null,
  });
  const [savedBooking, setSavedBooking] = useState(null);


  const saveBooking = (newBooking) => {
    setSavedBooking(newBooking);
  };


  // GET all listings
  const fetchListings = async () => {
    try {
      const response = await axios.get("http://localhost:3001/listings");
      setListings(response.data);
    } catch (error) {
      console.error('Error fetching listings:', error);
      // Handle the error, e.g., show a user-friendly message
    }
  };


  // DELETE a listing by ID
  const deleteListingById = async (id) => {
    await axios.delete(`http://localhost:3001/listings/${id}`);

    const updatedListings = listings.filter((listing) => listing.id !== id);
    setListings(updatedListings);
  };


  // UPDATE a listing by ID
  const editListingById = async (id, newData) => {

    console.log('ID:', id);
    console.log('New Data:', newData);
    
    try {
      const response = await axios.put(`http://localhost:3001/listings/${id}`, newData);

      console.log(response); // Log the entire response for inspection

      const updatedListings = listings.map((listing) =>
        listing.id === id ? { ...listing, ...response.data } : listing
      );

      setListings(updatedListings);

    } catch (error) {
      console.error('Error updating listing:', error);
    }
  };

  // CREATE a new listing
  const createListing = async (newListing) => {
    const response = await axios.post("http://localhost:3001/listings", newListing);
    const updatedListings = [...listings, response.data];
    setListings(updatedListings);
  };


  // Book a property

  const bookProperty = () => {
    const { propertyId, dateFrom, dateTo, creditCardInfo } = bookingData;

    // Find the listing with the matching id
    const selectedListing = listings.find((listing) => listing.id === propertyId);

    if (selectedListing && selectedListing.isAvailable) {
      // Calculate the total days for booking
      const fromDateTime = new Date(dateFrom).getTime();
      const toDateTime = new Date(dateTo).getTime();
      const differenceInMilliseconds = Math.abs(toDateTime - fromDateTime);
      const totalDays = Math.ceil(differenceInMilliseconds / (1000 * 60 * 60 * 24));

      // Update the listing to mark it as booked
      const updatedListings = listings.map((listing) =>
        listing.id === propertyId ? { ...listing, isAvailable: false } : listing
      );

      // Property is available, update the UI or perform any additional actions
      console.log(`Property with ID ${propertyId} booked successfully for ${totalDays} days.`);

      // After booking, reset the bookingData
      setListings(updatedListings);
      setBookingData({
        propertyId: null,
        dateFrom: null,
        dateTo: null,
        creditCardInfo: null,
      });
  
      return true; // Booking successful
    } else {
      // Property is not available or not found, handle accordingly
      console.log(`Sorry, the property with ID ${propertyId} is not available for the selected dates.`);
      return false; // Booking failed
    }
  };

  const updateBookingData = (newData) => {
    setBookingData((prevData) => ({ ...prevData, ...newData, propertyId: prevData.propertyId }));
  };




  const valueToShare = {
    listings,
    createListing,
    editListingById,
    deleteListingById,
    fetchListings,
    updateBookingData,
    bookingData,
    bookProperty,
    saveBooking,
    savedBooking,
  };

  return <ListingsContext.Provider value={valueToShare}>{children}</ListingsContext.Provider>;
}

export { Provider };
export default ListingsContext;
