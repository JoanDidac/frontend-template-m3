import React, { useEffect, useState } from 'react';
import droneService from '../services/droneService';
import authService from '../services/authService';
import CreateDrone from './CreateDrone';
import CreateReview from './CreateReview';

function DronesList() {
  const [drones, setDrones] = useState([]);
  const [showCreateDroneForm, setShowCreateDroneForm] = useState(false);
  const [userId, setUserId] = useState(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [selectedDrone, setSelectedDrone] = useState(null);

    // Fetch user ID when the component mounts
    useEffect(() => {
        const fetchUserId = async () => {
          try {
            const user = await authService.me();
            setUserId(user._id);
          } catch (error) {
            console.error('Error fetching user:', error);
          }
        };
    
        fetchUserId();
      }, []);

  const fetchDrones = async () => {
    try {
      const response = await droneService.getDrones();
      setDrones(response);
    } catch (error) {
      console.error('Error fetching drones:', error);
    }
  };

  useEffect(() => {
    fetchDrones();
  }, []);

  const handleCreateDroneButtonClick = () => {
    setShowCreateDroneForm(!showCreateDroneForm);
  };

  const handleReviewButtonClick = (droneId) => {
    if (selectedDrone === droneId) {
      setShowReviewForm(!showReviewForm);
    } else {
      setSelectedDrone(droneId);
      setShowReviewForm(true);
    }
  };

  const handleReviewSave = (newReview) => {
    // Reload drone list after a new review is saved
    fetchDrones();
  };

  return (
    <div>
      <h2>All Drones</h2>
      <button onClick={handleCreateDroneButtonClick}>Create new Drone</button>
      {showCreateDroneForm && <CreateDrone />}
      <ul>
        {drones.map((drone) => (
          <React.Fragment key={drone._id}>
            <h1>{drone.model}</h1>
            <img src={drone.imageUrl} alt={drone.model} />
            <button onClick={() => handleReviewButtonClick(drone._id)}>
              Review this Drone
            </button>
            {showReviewForm && selectedDrone === drone._id && (
              <CreateReview
                droneId={drone._id}
                userId={userId}
                onSave={handleReviewSave}
              />
            )}
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
}

export default DronesList;
