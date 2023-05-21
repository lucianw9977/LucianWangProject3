import React, { useEffect, useState } from 'react';
import axios from 'axios';

const VehicleSpecification = ({ vin }) => {
  const [specifications, setSpecifications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

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
        console.error('Error fetching vehicle data:', error);
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
      <p>Loading vehicle specifications...</p>
    ) : isError ? (
      <p>Error fetching vehicle specifications. Please try again.</p>
    ) : specifications.length > 0 ? (
      <table className="spec-table">
    <tbody>
        {specifications.map((specification, index) => (
            <tr key={index}>
                <td>{specification.Variable}</td>
                <td>{specification.Value}</td>
            </tr>
        ))}
    </tbody>
</table>

    ) : (
      <p>No vehicle specifications found.</p>
    )}
  </div>
);

};

export default VehicleSpecification;
