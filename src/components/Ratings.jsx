import React, { useEffect, useState } from 'react';
import { ReactComponent as DroneIcon } from '../assets/icon-rating.svg';
import { ReactComponent as DroneIconLight } from '../assets/icon-rating-light.svg';
import './Rating.css';

const calculateAverageRating = (reviews) => {
  if (!reviews || reviews.length === 0) return 0;
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  return Math.round(totalRating / reviews.length);
};

const Ratings = ({ reviews, rating }) => {
    console.log('Reviews', reviews)
  //const averageRating = calculateAverageRating(reviews);
  const [avg, setAvg] = useState(0);
  const [droneIcons, setDroneIcons] = useState([]);
  const maxRating = 5;

  useEffect(() => {
    if (rating) {
      setAvg(rating);
    } else {
      const avgReviews = calculateAverageRating(reviews);
      setAvg(avgReviews);
    }
  }, [reviews, rating]);


  useEffect(() => {
    let updatedIcons = [];
      for (let i = 0; i < avg ; i++) {
        updatedIcons.push(
          <DroneIcon key={i} className="drone-rating-icon active" />
        );
      }
    if(avg !== 5){
        // Add the remaining lighter icons
        for (let i = avg; i < maxRating ; i++) {
            updatedIcons.push(
            <DroneIconLight key={i + maxRating} className="drone-rating-icon light" />
          );
        }
    }
    setDroneIcons(updatedIcons);
    },[avg])


  return <div className="drone-rating"> {droneIcons}</div>;
};

export default Ratings;
