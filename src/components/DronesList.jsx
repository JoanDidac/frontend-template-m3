import React, { useEffect, useState } from 'react';
import axios from 'axios';

function DronesList() {
  const [drones, setDrones] = useState([]);

  useEffect(() => {
    const fetchDrones = async () => {
      try {
        const response = await axios.get('/drones');
        setDrones(response.data);
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
          <li key={drone._id}>{drone.name} - {drone.description}</li>
        ))}
      </ul>
    </div>
  );
}

export default DronesList;
