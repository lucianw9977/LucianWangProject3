import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Define the VehicleSpecTable component
const VehicleSpecTable = ({ specifications }) => (
  <table className="spec-table">
    <tbody>
      {specifications.map((specification) => (
        <tr key={specification.Variable}>
          <td>{specification.Variable}</td>
          <td>{specification.Value}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

// Define the LoadingIndicator component
const LoadingIndicator = () => <p>Loading vehicle specifications...</p>;

const VehicleSpecification = ({ vin }) => {
  const [specifications, setSpecifications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchSpecifications = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const response = await axios.get(
          `https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinExtended/${vin}?format=json`
        );

        if (response.data.Results && response.data.Results.length > 0) {
          const specs = response.data.Results.map((result) => ({
            Variable: result.Variable,
            Value: result.Value,
          }));
          setSpecifications(specs);
        } else {
          setSpecifications([]);
        }
      } catch (error) {
        setErrorMessage('Error fetching vehicle data. Please try again.');
        setIsError(true);
      }

      setIsLoading(false);
    };

    if (vin) {
      fetchSpecifications();
    }
  }, [vin]);

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

export default VehicleSpecification;
