// models/listing.js
const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  title: String,
  price: Number,
  isAvailable: Boolean,
  numberOfRooms: Number,
  numberOfBathrooms: Number,
  isSingleHouse: Boolean,
  isTownHouse: Boolean,
  isApartment: Boolean,
  isCondo: Boolean,
  image: String,
  location: String,
  availableDateFrom: Date,
  availableDateTo: Date,
});

// Create a model based on the schema
const Home = mongoose.model('Home', listingSchema);

module.exports = Home;