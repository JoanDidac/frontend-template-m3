import React, { useEffect, useState } from 'react';
import LandingPage from '../components/LandingPage';
import droneService from '../services/droneService';
import  DroneCarousel from '../components/DroneCarousel.jsx';
import Carousel from 'react-multi-carousel';
import { responsive }  from '../components/DroneCarousel';
import VideoSection from '../components/ImageSection';

export default function Home() {
  const [drones, setDrones] = useState([])

  const getDrones = async() => {
    try {
      const response = await droneService.getDrones()
      console.log(response)
      setDrones(response)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getDrones()
  }, [])

  return (
    <div>
      <LandingPage />
      <Carousel responsive={responsive}>
      <DroneCarousel />
      </Carousel>
      <VideoSection/>
      
    </div>
  )
}
