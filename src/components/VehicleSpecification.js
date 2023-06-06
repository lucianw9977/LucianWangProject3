import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Define a table component to show vehicle specifications
const VehicleSpecTable = ({ specifications }) => (
  <table className="spec-table">
    <tbody>
      {/* Map over specifications and create table rows for each one */}
      {specifications.map((specification) => (
        <tr key={specification.Variable}>
          <td>{specification.Variable}</td>
          <td>{specification.Value}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

// Define a loading indicator component
const LoadingIndicator = () => <p>Loading vehicle specifications...</p>;

// Define a main component to fetch and display vehicle specifications
const VehicleSpecification = ({ vin }) => {
  // Initialize state variables for specifications, loading status, error status, and error message
  const [specifications, setSpecifications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Use useEffect hook to fetch data when VIN changes
  useEffect(() => {
    const fetchSpecifications = async () => {
      setIsError(false);
      setIsLoading(true);

      // Use try-catch to handle potential errors during fetching
      try {
        // Fetch data from the API using axios
        const response = await axios.get(
          `https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinExtended/${vin}?format=json`
        );

        // Check if response contains data
        if (response.data.Results && response.data.Results.length > 0) {
          // Map the results to get specifications
          const specs = response.data.Results.map((result) => ({
            Variable: result.Variable,
            Value: result.Value,
          }));
          // Update the specifications state
          setSpecifications(specs);
        } else {
          setSpecifications([]);
        }
      } catch (error) {
        // In case of error, update the error message and error state
        setErrorMessage('Error fetching vehicle data. Please try again.');
        setIsError(true);
      }

      // After fetching (either success or error), update the loading state
      setIsLoading(false);
    };

    // Check if VIN exists before fetching
    if (vin) {
      fetchSpecifications();
    }
  }, [vin]); // dependency array includes 'vin' as the effect should run again when 'vin' changes

  // Render different views based on loading, error, and specifications states
  return (
    <div className="vehicle-specification">
      <h2>Vehicle Specification</h2>
      <p className="vin-label">VIN: {vin}</p>
      {isLoading ? (
        <LoadingIndicator />
      ) : isError ? (
        <p className="error-message">{errorMessage}</p>
      ) : specifications.length > 0 ? (
        <VehicleSpecTable specifications={specifications} />
      ) : (
        <p>No vehicle specifications found.</p>
      )}
    </div>
  );
};

// Export the VehicleSpecification component for use in other files
export default VehicleSpecification;

