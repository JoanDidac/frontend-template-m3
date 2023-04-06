import React, { useEffect, useState } from 'react';
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
      <h1>Sky Pulse</h1>
      {drones.map(elem => {
        return (
          <div>
          {/* <p>{elem.imageUrl}</p> */}
          {/* <p>{elem.brand}</p>  */}
          <p>{elem.model}</p>
          {/* <p>{elem.specs}</p> /*Object inside object, not accessing data*/ }
        </div>
        )
      })}
    </div>
  )
}
