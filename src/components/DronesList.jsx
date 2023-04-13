import React, { useEffect, useState } from "react";
import droneService from "../services/droneService";
import authService from "../services/authService";
import CreateDrone from "./CreateDrone";
import CreateReview from "./CreateReview";
import reviewsService from "../services/reviewsService";
import { useAuth } from "../hooks/useAuth";

function DronesList() {
  const [drones, setDrones] = useState([]);
  const [showCreateDroneForm, setShowCreateDroneForm] = useState(false);
  const [userId, setUserId] = useState(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [selectedDrone, setSelectedDrone] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [showReviewsList, setShowReviewsList] = useState(false);
  const [userReviews, setUserReviews] = useState([]);
  const [showMyReviews, setShowMyReviews] = useState(false);
  const { isLoggedIn } = useAuth();

  // Fetch user ID when the component mounts
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const user = await authService.me();
        setUserId(user._id);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUserId();
  }, []);

  const fetchDrones = async () => {
    try {
      const response = await droneService.getDrones();
      setDrones(response);
    } catch (error) {
      console.error("Error fetching drones:", error);
    }
  };

  useEffect(() => {
    fetchDrones();
  }, []);

  const handleCreateDroneButtonClick = () => {
    setShowCreateDroneForm(!showCreateDroneForm);
  };

  const handleReviewButtonClick = async (droneId) => {
    if (selectedDrone === droneId) {
      setShowReviewForm(!showReviewForm);
    } else {
      setSelectedDrone(droneId);
      setShowReviewForm(false); // Hide the review form when displaying the reviews
    }
  };

  const handleViewReviewsClick = async (droneId) => {
    setSelectedDrone(droneId);
    setShowReviewForm(false); // Hide the review form when displaying the reviews
    const reviewsData = await reviewsService.getReviewsByDroneId(droneId);
    setReviews(reviewsData);
    setShowReviewsList(true);
  };
  const handleMyReviewsClick = async (droneId) => {
    if (isLoggedIn) {
      const reviews = await reviewsService.getReviewsByDroneId(droneId);
      console.log("Reviews", reviews);
      setUserReviews(reviews);
    }
    setShowMyReviews(!showMyReviews);
  };

  const handleReviewSave = () => {
    // Reload drone list after a new review is saved
    fetchDrones();
    setShowReviewForm(false);
  };

  return (
    <div className="droneList-header">
      <h2 className="droneList-title">Drones Selection</h2>
      <p>Feel the World, Ride the Wind</p>
      <button className="add-drone-button" onClick={handleCreateDroneButtonClick}>+ Add new Drone</button>
      {showCreateDroneForm && <CreateDrone />}
      <div className="drones-list">
        {drones.map((drone) => (
          <React.Fragment key={drone._id}>
            <div className="drone-item">
              <h1>{drone.model}</h1>
              
              <img src={drone.imageUrl} alt={drone.model} className="drone-image" />
              <div className="drone-buttons">
                <button
                  className="drone-button"
                  onClick={() => handleReviewButtonClick(drone._id)}
                >
                  Review this Drone
                </button>
                <button
                  className="drone-button"
                  onClick={() => handleViewReviewsClick(drone._id)}
                >
                  View Reviews
                </button>
              </div>
            </div>
            {showReviewForm && selectedDrone === drone._id && (
              <CreateReview
                droneId={drone._id}
                userId={userId}
                onSave={handleReviewSave}
              />
            )}
            {showReviewsList &&
              selectedDrone === drone._id &&
              !showReviewForm && (
                <ul>
                  {reviews.map((review) => (
                    <li key={review._id}>
                      <p>{review.user.username}</p>
                      <p> {review.name}</p>
                      <p>{review.comment}</p>
                      <p>Rating: {review.rating}</p>
                    </li>
                  ))}
                </ul>
              )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
  

export default DronesList;
