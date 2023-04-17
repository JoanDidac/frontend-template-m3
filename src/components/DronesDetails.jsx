import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import droneService from "../services/droneService";
import reviewsService from "../services/reviewsService";
import "./DronesDetails.css";
import Ratings from "./Ratings";

export default function DroneDetails({ drone: propDrone }) {
  const [drone, setDrone] = useState(propDrone);
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);
  const [showReviewsList, setShowReviewsList] = useState(false);
  console.log("drone:", drone);

  useEffect(() => {
    if (!drone) {
      const fetchDrone = async () => {
        try {
          const response = await droneService.getDrone(id);
          console.log("response:", response);
          setDrone(response);
        } catch (error) {
          console.error(error);
        }
      };

      fetchDrone();
    }
  }, [id, drone]);

  const handleViewReviewsClick = async () => {
    const reviewsData = await reviewsService.getReviewsByDroneId(id);
    setReviews(reviewsData);
    setShowReviewsList(true);
  };

  const handleToggleReviewsList = (show) => {
    setShowReviewsList(show);
  };

  return (
    drone && (
      <div className="drone-details slide-up-detailed-drone">
        <h2 className="detailed-drone-title">{drone.model}</h2>
        <img className="drone-image" src={drone.imageUrl} alt={drone.model} />
        <div className="drone-specs">
          <p>Max Flight Time: {drone.specs.maxFlightTime} minutes</p>
          <p>Max Speed: {drone.specs.maxSpeed} km/h</p>
          <p>Range: {drone.specs.range} km</p>
          <p>Weight: {drone.specs.weight} g</p>
          <p>Dimensions: {drone.specs.dimensions}</p>
        </div>

        <button
          className="reviews-button drone-detailed-btn"
          onClick={handleViewReviewsClick}
        >
          Check all reviews for this Drone
        </button>
        {showReviewsList && (
          <div
            className="reviews-overlay2"
            onClick={() => handleToggleReviewsList(false)}
          >
            <div className="reviews-container2">
            <h1> All Reviews For : <strong>{drone.model}</strong> </h1>
              <button
                className="close-reviews2"
                onClick={() => handleToggleReviewsList(false)}
              >
                ×
              </button>
              <ul className="reviews-list2">
              
                {reviews.map((review) => (
                   
                  <li key={review._id} className="review-item2">
                    <div className="user-rating-container">
                      <Ratings className={"review-rating2 rating"} rating={review.rating} />
                    </div>
                    <p className="review-username2">{review.user.username}</p>
                    <h2 className="review-name2"> {review.name}</h2>
                    <p className="review-comment2">{review.comment}</p>
                  </li>

                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    )
  );
}
