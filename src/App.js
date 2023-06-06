// Import required modules and components
import React, { useState } from 'react';
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import Footer from './components/footer'; 
import VehicleSpecification from './components/VehicleSpecification';
import './App.css'; 

// Define the App component
const App = () => {
  // Define state variable for the VIN input
  const [vin, setVin] = useState('');

  // Define handleSearch function to update VIN state
  const handleSearch = (vin) => {
    setVin(vin);
  };

  // Render the application
  return (
    <div className="app-container">
      <Header />
      <div className="search-form-container">
        {/* Pass handleSearch function as a prop to SearchForm */}
        <SearchForm onSearch={handleSearch} />
        {/* Render VehicleSpecification component if a VIN has been entered */}
        {vin && <VehicleSpecification vin={vin} />}
      </div>
      <Footer />
    </div>
  );
};

// Export the App component for use in other files
export default App;
