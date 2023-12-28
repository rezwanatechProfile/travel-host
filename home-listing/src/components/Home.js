// Home.js

import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import HomeList from './HomeList'; // Adjust the import based on your component structure
import HomeCreate from './HomeCreate'; // Adjust the import based on your component structure
import ListingsContext from '../context/listings'; // Adjust the import based on your context structure


function Home() {
  const { fetchListings } = useContext(ListingsContext);

  useEffect(() => {
    fetchListings();
  }, []);

  return (
    <div className="app-back">
        <div className='header-div'>
        <img className="logo" src={process.env.PUBLIC_URL + '/house.png'} alt="Your Image Alt Text" />
        <h1>Travel || Host</h1></div>
    <div className="app">
      <div className="content">
      <HomeCreate />
      <HomeList />
      </div>
    </div>
  </div>
  );
}

export default Home;
