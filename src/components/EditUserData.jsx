// EditUserData.jsx
import React, { useState, useEffect } from 'react';
import authService from '../services/authService';

const EditUserData = () => {
  const [userData, setUserData] = useState(null);
  const [updateData, setUpdateData] = useState({});

  // Fetch user data when the component mounts
  useEffect(() => {
    authService.me().then((data) => {
      setUserData(data);
    });
  }, []);

  // This function will be called when the update profile form is submitted
  const handleUpdateProfile = (e) => {
    e.preventDefault();

    authService.updateProfile(updateData).then((updatedUser) => {
      console.log('Profile updated successfully', updatedUser);
      // Update the user data in the state
      setUserData(updatedUser);
    });
  };

  // Function to handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateData({ ...updateData, [name]: value });
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>My Profile</h1>
      <p>Name: {userData.username}</p>
      <p>Email: {userData.email}</p>

      <h2>Update Profile</h2>
      <form onSubmit={handleUpdateProfile}>
        <label>
          Name:
          <input
            type="text"
            name="username"
            defaultValue={userData.username}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default EditUserData;
