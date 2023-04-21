import React, { useEffect, useState } from "react";
import droneService from "../services/droneService";
import authService from "../services/authService";
import CreateDrone from "./CreateDrone";
import CreateReview from "./CreateReview";
import reviewsService from "../services/reviewsService";
import { useAuth } from "../hooks/useAuth";
import Rating from "./Rating";
import { CircleLoader } from 'react-spinners';
import { useNavigate } from "react-router-dom";

function DronesList() {
  const [drones, setDrones] = useState([]);
  const [showCreateDroneForm, setShowCreateDroneForm] = useState(false);
  const [userId, setUserId] = useState(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [selectedDrone, setSelectedDrone] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [showReviewsList, setShowReviewsList] = useState(false);
  const [ setUserReviews] = useState([]);
  const [showMyReviews, setShowMyReviews] = useState(false);
  const { isLoggedIn } = useAuth();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();



 

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
      setLoading(false)
    } catch (error) {
      console.error("Error fetching drones:", error);
    }
  };

  useEffect(() => {
    fetchDrones();
  }, []);

  const handleCreateDroneButtonClick = () => {
    if (isLoggedIn) {
    setShowCreateDroneForm(!showCreateDroneForm);
    } else {
      navigate('/login');
    }
  };

  const handleReviewButtonClick = async (droneId) => {
    if (selectedDrone === droneId ) {
      setShowReviewForm(!showReviewForm);
    } else {
      setSelectedDrone(droneId);
      setShowReviewForm(true); // Hide the review form when displaying the reviews
    }
    if (isLoggedIn){
      setShowReviewForm(!showReviewForm);
    } else {
      navigate('/login');
    }
  };

  const handleViewReviewsClick = async (droneId) => {
    setSelectedDrone(droneId);
    setShowReviewForm(false); // Hide the review form when displaying the reviews
    const reviewsData = await reviewsService.getReviewsByDroneId(droneId);
    console.log("Fetched reviews:", reviewsData); 
    setReviews(reviewsData);
    setShowReviewsList(true);
  };
  

  const handleToggleReviewsList = (show) => {
    setShowReviewsList(show);
  };

  const handleMyReviewsClick = async (droneId) => {
    if (isLoggedIn) {
      const reviews = await reviewsService.getReviewsByDroneId(droneId);
      console.log("Reviews", reviews);
      setUserReviews(reviews);
    }
    setShowMyReviews(!showMyReviews);
  };

  const handleFormSubmitted = () => {
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 1000); // Reset the state after the animation duration
  };

  
  const handleReviewSave = () => {
    // Reload drone list after a new review is saved
    fetchDrones();
    setShowReviewForm(false);
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 2000); // Reset the state after the animation duration
  };
  


  return (
    <div className="droneList-header">
      <h2 className="droneList-title">Drones Selection</h2>
      <p>Feel the World, Ride the Wind</p>
      <button
        className="add-drone-button"
        onClick={handleCreateDroneButtonClick}
      >
        + Add new Drone
      </button>
      {showCreateDroneForm && <CreateDrone />}
      <div className="drones-list">
        {loading ? (
          <div className="loading-container">
            <CircleLoader color="#2995ec" size={65} speedMultiplier={58} />
          </div>
        ) : (
          drones.map((drone) => (
            <React.Fragment key={`drone-fragment-${drone._id}`}>
              <div className="drone-item">
                <h1>{drone.model}</h1>
                <img
                  src={drone.imageUrl}
                  alt={drone.model}
                  className="drone-image"
                />
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
                  className={`create-review-form${formSubmitted ? " create-review-form-submitted" : ""}`}
                  droneId={drone._id}
                  userId={userId}
                  onSave={handleReviewSave}
                  onFormSubmitted={handleFormSubmitted}
                />
              )}
              {showReviewsList && selectedDrone === drone._id && (
                <div
                  className="reviews-overlay"
                  onClick={() => handleToggleReviewsList(false)}
                >
                  <div
                    className={`reviews-container${
                      showReviewsList && selectedDrone === drone._id
                        ? " visible"
                        : ""
                    }`}
                  >
                    <button
                      className="close-reviews"
                      onClick={() => handleToggleReviewsList(false)}
                    >
                      ×
                    </button>
                    <ul className="reviews-list">
                      {reviews.map((review) => (
                        <li key={review._id} className="review-item">
                          <p className="review-username">
                            {review.user.username}
                          </p>
                          <h2 className="review-name"> {review.name}</h2>
                          <p className="review-comment">{review.comment}</p>
                          <Rating className="review-rating" reviews={review} />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </React.Fragment>
          ))
        )}
      </div>
    </div>
  );
  

}

export default DronesList;
