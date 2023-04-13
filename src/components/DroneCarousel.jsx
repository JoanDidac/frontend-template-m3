import React, { useState, useEffect } from 'react';
import '../App.css'
import './DroneCarousel.css';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import droneService from '../services/droneService';


  export const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1024 },
      items: 5,
      slidesToSlide : 2
    },
    desktop: {
      breakpoint: { max: 1024, min: 800 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 800, min: 464 },
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
      <h1> Drone Selection </h1>
      <Carousel responsive={responsive} itemClass="carousel-item-padding-40-px" keyBoardControl={true} autoPlay={true} autoPlaySpeed={8000} transitionDuration={1000} infinite={true} showDots={true} swipeable={true} draggable={true}>
      {drones.map((drone, index) => (
        <div key={index} className="carousel-item">
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