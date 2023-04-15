import React, { useEffect, useState } from 'react';
import { ReactComponent as DroneIcon } from '../assets/icon-rating.svg';
import { ReactComponent as DroneIconLight } from '../assets/icon-rating-light.svg';
import './Rating.css';

const Rating = ({ reviews }) => {
  const [droneIcons, setDroneIcons] = useState([]);
  const maxRating = 5;

  useEffect(() => {
    let updatedIcons = [];
      for (let i = 0; i < reviews.rating ; i++) {
        updatedIcons.push(
          <DroneIcon key={i} className="drone-rating-icon active" />
        );
      }
    if(reviews.rating !== 5){
        // Add the remaining lighter icons
        for (let i = reviews.rating; i < maxRating ; i++) {
            updatedIcons.push(
            <DroneIconLight key={i + maxRating} className="drone-rating-icon light" />
          );
        }
    }
    setDroneIcons(updatedIcons);
    },[reviews.rating])


  return <div className="drone-rating"> {droneIcons}</div>;
};

export default Rating;
