import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';

// Replace with actual make and model options from API
const makeOptions = [{ value: 'Toyota', label: 'Toyota' }, { value: 'Honda', label: 'Honda' }];
const modelOptions = [{ value: 'Camry', label: 'Camry' }, { value: 'Civic', label: 'Civic' }];

function App() {
  const [vehicleInfo, setVehicleInfo] = useState([]);
  const [selectedMake, setSelectedMake] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [favorites, setFavorites] = useState([]);

  const handleMakeChange = (selectedOption) => {
    setSelectedMake(selectedOption);
  };

  const handleModelChange = (selectedOption) => {
    setSelectedModel(selectedOption);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedMake || !selectedModel) {
      alert('Please select a make and model.');
      return;
    }

    try {
      const response = await axios.get(
        `https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformake/${selectedMake.value}?format=json`
      );
      setVehicleInfo(response.data.Results.filter(vehicle => vehicle.Model_Name === selectedModel.value));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Vehicle InfoFinder</h1>
      <form onSubmit={handleSubmit} className="search-form">
        <div className="input-group-inline">
          <label>Make</label>
          <Select
            className="select-input"
            value={selectedMake}
            onChange={handleMakeChange}
            options={makeOptions}
          />
        </div>
        <div className="input-group-inline">
          <label>Model</label>
          <Select
            className="select-input"
            value={selectedModel}
            onChange={handleModelChange}
            options={modelOptions}
          />
        </div>
        <button type="submit">Search</button>
      </form>
      <ul>
        {vehicleInfo.map((vehicle, index) => (
          <li key={index}>
            {vehicle.Make_Name} {vehicle.Model_Name}
            <button onClick={() => setFavorites([...favorites, vehicle])}>Add to Favorites</button>
          </li>
        ))}
      </ul>
      <h2>Favorites</h2>
      <ul>
        {favorites.map((vehicle, index) => (
          <li key={index}>
            {vehicle.Make_Name} {vehicle.Model_Name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
