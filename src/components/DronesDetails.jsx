// components/DroneDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import droneService from '../services/droneService';

export default function DroneDetails({ drone: propDrone }) {
  const [drone, setDrone] = useState(propDrone);
  const { id } = useParams();

  useEffect(() => {
    if (!drone) {
      const fetchDrone = async () => {
        try {
          const response = await droneService.getDrone(id);
          setDrone(response);
        } catch (error) {
          console.error(error);
        }
      };

      fetchDrone();
    }
  }, [id, drone]);

  return (
    drone && (
      <div>
        <h1>{drone.model}</h1>
        <img src={drone.imageUrl} alt={drone.model} />
        <p>{drone.brand}</p>
        <p>Max Flight Time: {drone.specs?.maxFlightTime || "N/A"} minutes</p>
        <p>Max Speed: {drone.specs?.maxSpeed || "N/A"} km/h</p>
        <p>Range: {drone.specs?.range || "N/A"} km</p>
        <p>Weight: {drone.specs?.weight || "N/A"} kg</p>
        <p>Dimensions: {drone.specs?.dimensions || "N/A"}</p>
      </div>
    )
  );
}

