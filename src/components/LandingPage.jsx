import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import droneService from '../services/droneService';
import { CircleLoader } from "react-spinners"; // Import the Loading component
import './Loading.css';

export default function LandingPage() {
  const [drone, setDrone] = useState(null);
  const [loading, setLoading] = useState(true); // Add a loading state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDrone = async () => {
      try {
        const response = await droneService.getDrones();
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

  const handleVideoLoad = () => {
    setLoading(false); // Update the loading state when the video is loaded
  };

  return (
    <div className="landing-page">
      {drone && (
        <>
          <div className="spinner-container">
            {loading && (
              
          <CircleLoader color="#2995ec" size={75} speedMultiplier={58} />
       
            )}
            <video
              src={drone.videoUrl}
              autoPlay
              muted
              loop
              className="landing-video"
              onLoadedData={handleVideoLoad}
            />
          </div>
          <div className="overlay">
            <h3>Footage of the Month recorded with Drone: </h3>
            <h2 className="drone-model">{drone.model}</h2>
            <button onClick={handleSeeMore} className="see-more-btn">
              Check this Drone
            </button>
          </div>
        </>
      )}
    </div>
  );
  
}
