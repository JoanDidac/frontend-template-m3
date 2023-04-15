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
        const droneWithVideo = { ...response[0], videoUrl: 'https://res.cloudinary.com/ddcimekqb/video/upload/v1681432329/colorful-trees-fall_kbgrzl.mp4' };
        setDrone(droneWithVideo);
      
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
      
        <video
          src={drone.videoUrl}
          autoPlay
          muted
          loop
          className="landing-video"
        />
        <div className="overlay">
        <h3>Footage of the Month recorded with Drone: </h3>
          <h2 className="drone-model">{drone.model}</h2>
          <button onClick={handleSeeMore} className="see-more-btn">
            Check this Drone
          </button>
        </div>
      </div>
    )
  );
}
