
const express = require('express');
const Home = require('../models/listings.js')
const homeSeed = require('../models/homeSeed.js')



// GET all homes
const getSeed = (req, res) => {
  try {
    res.json(homeSeed);
  } catch (error) {
    console.error('Error fetching homes:', error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};


//getHomes
const getHomes = (req, res) => {
	Home.find({})
	.then((allHomes) => {
		if(!allHomes) {
			res.status(404).json({message: "Cannot find Homes"})
		} else {
			res.status(200).json({data: allHomes})
		}
	})
}



//create Homes
const createHomes = (req, res) => {
  Home.create(req.body)
    .then((createdHome) => {
      if (!createdHome) {
        // Log an error message and send a 404 response
        console.error('Failed to create home:', req.body);
        res.status(404).json({ message: 'Cannot create Home' });
      } else {
        // Log the created home and send a 201 response
        console.log('Created home:', createdHome);
        res.status(201).json({ message: 'Home created successfully', data: createdHome });
      }
    })
    .catch((error) => {
      // Log any errors that occurred during the creation process
      console.error('Error creating home:', error);
      res.status(500).json({ error: 'Internal Server Error', message: error.message });
    });
};



//Update Homes
const updateHome = (req, res) => {
	Home.findByIdAndUpdate(req.params.id, req.body, {new: true})
	.then((updatedHome) => {
	if(!updatedHome) {
			res.status(400).json({message: "Cannot update Home"})
		} else {
			res.status(200).json({data: updatedHome, message: 'updated Home'})
		}
	})
}


//delete Home
const deleteHome = (req, res) => {
	Home.findByIdAndDelete(req.params.id)
	.then((deletedHome) => {
		if(!deletedHome) {
			res.status(400).json({message: "Could not delete Home"})
		} else {
			res.status(200).json({data: deletedHome, message: 'deleted Home'})
		}
	})
}

module.exports = {
	getHomes,
	createHomes,
	updateHome,
	deleteHome,
  getSeed,


}