import React, { useState } from 'react';
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import Footer from './components/footer'; 
import VehicleSpecification from './components/VehicleSpecification';
import './App.css'; 

const App = () => {
  const [vin, setVin] = useState('');

  const handleSearch = (vin) => {
    setVin(vin);
  };

  return (
    <div className="app-container">
      <Header />
      <div className="search-form-container">
        <SearchForm onSearch={handleSearch} />
        {vin && <VehicleSpecification vin={vin} />}
      </div>
      <Footer />
    </div>
  );
};

export default App;


