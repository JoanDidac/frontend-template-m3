import React, { useState } from 'react';
import droneService from '../services/droneService';

function CreateDrone() {
  const [droneData, setDroneData] = useState({
    model: "",
    brand: "",
    imageUrl: "",
    specs: {
      maxFlightTime: "",
      maxSpeed: "",
      range: "",
      weight: "",
      dimensions: "",
    },
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name.startsWith("specs.")) {
      const specName = name.replace("specs.", "");
      setDroneData({
        ...droneData,
        specs: { ...droneData.specs, [specName]: value },
      });
    } else {
      setDroneData({ ...droneData, [name]: value });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await droneService.createDrone(droneData);
      alert("Drone created successfully!");
    } catch (error) {
      console.error("Error creating drone:", error);
      alert("Error creating drone, please try again.");
    }
  };

  return (
    <div>
      <h2>Create a new Drone</h2>
      <form onSubmit={handleSubmit}>
        <label>Model:</label>
        <input
          type="text"
          name="model"
          value={droneData.model}
          onChange={handleChange}
        />
        <br />
        <label>Brand:</label>
        <input
          type="text"
          name="brand"
          value={droneData.brand}
          onChange={handleChange}
        />
        <br />
        <label>Image URL:</label>
        <input
          type="text"
          name="imageUrl"
          value={droneData.imageUrl}
          onChange={handleChange}
        />
        <br />
        <label>Max Flight Time:</label>
        <input
          type="number"
          name="specs.maxFlightTime"
          value={droneData.specs.maxFlightTime}
          onChange={handleChange}
        />
        <br />
        <label>Max Speed:</label>
        <input
          type="number"
          name="specs.maxSpeed"
          value={droneData.specs.maxSpeed}
          onChange={handleChange}
        />
        <br />
        <label>Range:</label>
        <input
          type="number"
          name="specs.range"
          value={droneData.specs.range}
          onChange={handleChange}
        />
        <br />
        <label>Weight:</label>
        <input
          type="number"
          name="specs.weigth"
          value={droneData.specs.weigth}
          onChange={handleChange}
        />
         <br />
        <label>Dimensions:</label>
        <input
          type="number"
          name="specs.dimensions"
          value={droneData.specs.dimensions}
          onChange={handleChange}
        />
        
        
        <button type="submit">Create Drone</button>
      </form>
    </div>
  );
}

export default CreateDrone;
