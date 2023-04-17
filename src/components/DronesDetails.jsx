// components/DroneDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import droneService from '../services/droneService';
import './DronesDetails.css';

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
      <div className="drone-details slide-up-detailed-drone">
        <h1 className="drone-model detailed-drone-title">{drone.model}</h1>
        <img className="drone-image" src={drone.imageUrl} alt={drone.model} />
        <div className="drone-specs">
          <h2>{drone.brand}</h2>
          <p><strong>Max Flight Time:</strong> {drone.specs?.maxFlightTime || "N/A"} minutes</p>
          <p><strong> Speed:</strong> {drone.specs?.maxSpeed || "N/A"} km/h</p>
          <p><strong>Range:</strong> {drone.specs?.range || "N/A"} km</p>
          <p><strong>Weight:</strong> {drone.specs?.weight || "N/A"} kg</p>
          <p><strong>Dimensions: </strong>{drone.specs?.dimensions || "N/A"}</p>
        </div>
        <button className="reviews-button drone-detailed-btn">Check all reviews for this Drone</button>
        {/* add Reviews component here */}
      </div>
    )
  );
}

