const express = require('express');
require('dotenv').config();

const mongoose = require('mongoose');

const cors = require('cors');
const methodOverride = require('method-override');

const app = express();
const Home = require('./models/listings')

const listingController = require('./controllers/listingController')


//connect database
mongoose.connect(process.env.DATABASE_URL || 'mongodb+srv://admin:abcd1234@sei-1205.2datzhk.mongodb.net/homes?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
//Mongo error/success
const db = mongoose.connection

db.on('error', (err) => {
    console.log(`${err.message} is MONGODB not running?`)
})
db.on('connected', () => {
    console.log(`mongo connected`)
})
db.on('disconnected', () => {
    console.log(`mongo disconnected`)
})


// MIDDLEWARE
app.use(cors('*'));
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(methodOverride("_method"));
// This will allow us to make delete and put request
// app.use('/', indexController)
// Use the listingController for routes and pass homeSeed
const routes = require('./routes/index')
app.use('/', routes)

// catch route if it doesn't match to anything we will send this response 
app.use((req, res) => {
	res.status(404).json({message: "NOT A PROPER ROUTE"})
})

//PORT
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});


