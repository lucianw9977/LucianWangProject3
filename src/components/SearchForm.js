import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchForm = ({ onSearch }) => {
  const [vin, setVin] = useState('');
  const [isVinEntered, setIsVinEntered] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (vin.length !== 17) {
      setError('Please enter a 17 digit VIN number.');
      return;
    } else {
      setError('');
    }
    onSearch(vin);
  };

  const handleInputChange = (e) => {
    setVin(e.target.value);
    setIsVinEntered(e.target.value.length > 0);
  };

  return (
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
        <FaSearch className="search-icon" onClick={handleSubmit} />
        {error && <div className="error-message">{error}</div>}
      </div>
    </form>
  );
};

export default SearchForm;
