import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css'
import './DroneCarousel.css';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import droneService from '../services/droneService';
import reviewsService from '../services/reviewsService';
import Ratings from './Ratings';
import handleSeeMore from './LandingPage';
import Loading from './Loading';

  
  export const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1024 },
      items: 4,
      slidesToSlide : 2
    },
    desktop: {
      breakpoint: { max: 1024, min: 800 },
      items: 3,
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
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate();

  const handleSeeMore = (droneId) => {
    navigate(`/drones/${droneId}`);
  };

  useEffect(() => {
    const fetchDrones = async () => {
      try {
        setLoading(true);
        const response = await droneService.getDrones();
        const reviewResponse = await reviewsService.getReviews(); // Replace with the correct method to fetch all drones
        setDrones(response);
        console.log('Drones in carousel', response)
        console.log('reviews in carousel', reviewResponse)
        setReviews(reviewResponse);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchDrones();
  }, []);


  return (
    <div className="DroneCarousel">
      {loading ? (
        <Loading loading={loading} color="#123abc" size={100} />
      ) : (
        <>
          <h1> Drone Selection </h1>
          <Carousel responsive={responsive} itemClass="carousel-item-padding-40-px" keyBoardControl={true} autoPlay={true} autoPlaySpeed={8000} transitionDuration={1000} infinite={true} showDots={true} renderDotsOutside={true} swipeable={true} draggable={true}>
            {drones.map((drone, index) => (
              <div key={index} className="carousel-item">
                <img className='drone-img-carousel' src={drone.imageUrl} alt={drone.model} />
                <h2>{drone.model}</h2>
                <Ratings className="review-rating" reviews={reviews.filter(review => review.drone === drone._id)} /> 

                <button onClick={() => handleSeeMore(drone._id)}> Check this Drone </button>
              </div>
            ))}
          </Carousel>
        </>
      )}
    </div>
  );
}






