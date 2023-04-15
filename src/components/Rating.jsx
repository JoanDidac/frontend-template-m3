import React from 'react';
import droneIcon from '../assets/icon-rating.png';
import droneIconDark from '../assets/icon-rating-light.png';
import './Rating.css';

const calculateAverageRating = (reviews) => {
  if (!reviews || reviews.length === 0) return 0;
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  return totalRating / reviews.length;
};

const Rating = ({ reviews }) => {
  const averageRating = calculateAverageRating(reviews);
  const droneIcons = [];
  const maxRating = 5;

  for (let i = 0; i < Math.round(averageRating); i++) {
    droneIcons.push(
      <img key={i} src={droneIcon} alt="Drone" className="drone-rating-icon" />
    );
  }

  // Add the remaining darker icons
  for (let i = Math.round(averageRating); i < maxRating; i++) {
    droneIcons.push(
      <img key={i + maxRating} src={droneIconDark} alt="Drone" className="drone-rating-icon" />
    );
  }

  return <div className="drone-rating">{droneIcons}</div>;
};

export default Rating;
