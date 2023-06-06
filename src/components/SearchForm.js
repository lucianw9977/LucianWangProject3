// Import required hooks and components
import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

// Define a SearchForm component that takes an 'onSearch' prop
const SearchForm = ({ onSearch }) => {
  // Define state variables for the VIN input, whether the VIN has been entered, and error message
  const [vin, setVin] = useState('');
  const [isVinEntered, setIsVinEntered] = useState(false);
  const [error, setError] = useState('');

  // Define handleSubmit function for form submission
  const handleSubmit = (e) => {
    // Prevent default form submission behavior
    e.preventDefault();

    // Validate that the vin length is 17
    if (vin.length !== 17) {
      // If it's not, set error state
      setError('Please enter a 17 digit VIN number.');
      return;
    } else {
      // If it is, clear error state
      setError('');
    }

    // Call onSearch prop with the VIN
    onSearch(vin);
  };

  // Define handleInputChange function for input changes
  const handleInputChange = (e) => {
    // Update vin and isVinEntered state variables on input change
    setVin(e.target.value);
    setIsVinEntered(e.target.value.length > 0);
  };

  // Return for rendering
  return (
    <div className="search-form-container">
      <form onSubmit={handleSubmit} className="search-form mt-4">
        <div className="form-group">
          <label
            htmlFor="vin"
            className={`search-label ${isVinEntered ? 'hidden' : ''}`}
          >
            Please enter 17 digit VIN number
          </label>
          <input
            type="text"
            className={`form-control search-input ${vin.length === 17 ? 'valid' : vin.length > 0 ? 'invalid' : ''}`}
            id="vin"
            value={vin}
            onChange={handleInputChange}
          />
          {/* Include search icon that also triggers handleSubmit when clicked */}
          <FaSearch className="search-icon" onClick={handleSubmit} />
          {/* Show error message if it exists */}
          {error && <div className="error-message">{error}</div>}
        </div>
      </form>
    </div>
  );
};

// Export the component for use in other files
export default SearchForm;
