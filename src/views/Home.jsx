import React, { useEffect, useState } from 'react';
import LandingPage from '../components/LandingPage';
import droneService from '../services/droneService';

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
      {/* Add slider component here */}
      {drones.map(elem => {
        return (
          <div key={elem._id}>
            <p>{elem.model}</p>
            <img src={elem.imageUrl} alt={`${elem.model}`} />
            <p>{elem.brand}</p> 
            <p>Max Flight Time: {elem.specs?.maxFlightTime || "N/A"} minutes</p>
            <p>Max Speed: {elem.specs?.maxSpeed || "N/A"} km/h</p>
            <p>Range: {elem.specs?.range || "N/A"} km</p>
            <p>Weight: {elem.specs?.weight || "N/A"} kg</p>
            <p>Dimensions: {elem.specs?.dimensions || "N/A"}</p>
          </div>
        );
      })}
    </div>
  )
}
