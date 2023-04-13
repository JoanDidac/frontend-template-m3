import React, { useState, useEffect } from 'react';
import '../App.css'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import droneService from '../services/droneService';


  export const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  export default function DroneCarousel() {
  const [drones, setDrones] = useState([]);


  useEffect(() => {
    const fetchDrones = async () => {
      try {
        const response = await droneService.getDrones(); // Replace with the correct method to fetch all drones
        setDrones(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDrones();
  }, []);


  return (
    <div className="DroneCarousel">
      <h1> Drone Carousel </h1>
      <Carousel responsive={responsive}>
      {drones.map((drone, index) => (
        <div key={index}>
            <img className='drone-img-carousel' src={drone.imageUrl} alt={drone.model} />
            console.log({drone.model});
             <h2>{drone.model}</h2>
             <p>rating : {drone.rating} </p>
             <button> + Check the Drone</button>
        </div>
      ))}
      </Carousel>
      ;
    </div>
  );
}