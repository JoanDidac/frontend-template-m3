// components/LandingPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import droneService from '../services/droneService';

export default function LandingPage() {
  const [drone, setDrone] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDrone = async () => {
      try {
        const response = await droneService.getDrones();
        // display hardcoded drone as the landing page drone, in the future will display the drone with more likes.
        setDrone(response[8]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDrone();
  }, []);

  const handleSeeMore = () => {
    if (drone) {
      navigate(`/drones/${drone._id}`);
    }
  };

  return (
    drone && (
      <div className="landing-page">
        <img src={drone.imageUrl} alt={drone.model} className="landing-image" />
        <h2 className="drone-model">{drone.model}</h2>
        <button onClick={handleSeeMore} className="see-more-btn">
          See more
        </button>
      </div>
    )
  );
}
