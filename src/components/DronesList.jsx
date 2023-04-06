import React, { useEffect, useState } from 'react';
import droneService from '../services/droneService';

function DronesList() {
  const [drones, setDrones] = useState([]);

  useEffect(() => {
    const fetchDrones = async () => {
      try {
        const response = await droneService.getDrones();
        setDrones(response);
      } catch (error) {
        console.error('Error fetching drones:', error);
      }
    };
    fetchDrones();
  }, []);

  return (
    <div>
      <h2>All Drones</h2>
      <ul>
        {drones.map(drone => (
          <React.Fragment key={drone._id}>
          <h1>{drone.model}</h1>
            <img src={drone.imageUrl} alt={drone.model} />
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
}

export default DronesList;
