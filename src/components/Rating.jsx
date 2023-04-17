import React, { useEffect, useState } from 'react';
import { ReactComponent as DroneIcon } from '../assets/icon-rating.svg';
import { ReactComponent as DroneIconLight } from '../assets/icon-rating-light.svg';
import './Rating.css';

const Rating = ({ rating }) => {
  const [droneIcons, setDroneIcons] = useState([]);
  const maxRating = 5;

  useEffect(() => {
    let updatedIcons = [];
      for (let i = 0; i < rating ; i++) {
        updatedIcons.push(
          <DroneIcon key={i} className="drone-rating-icon active" />
        );
      }
    if(rating !== 5){
        // Add the remaining lighter icons
        for (let i = rating; i < maxRating ; i++) {
            updatedIcons.push(
            <DroneIconLight key={i + maxRating} className="drone-rating-icon light" />
          );
        }
    }
    setDroneIcons(updatedIcons);
    },[rating])


  return <div className="drone-rating"> {droneIcons}</div>;
};

export default Rating;
