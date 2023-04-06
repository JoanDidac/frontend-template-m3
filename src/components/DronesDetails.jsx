// components/DroneDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import droneService from '../services/droneService';

export default function DroneDetails() {
  const [drone, setDrone] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchDrone = async () => {
      try {
        const response = await droneService.getDrone(id);
        setDrone(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDrone();
  }, [id]);

  return (
    drone && (
      <div>
        <h1>{drone.model}</h1>
        <img src={drone.imageUrl} alt={drone.model} />
        {/* Add other drone details here */}
      </div>
    )
  );
}
