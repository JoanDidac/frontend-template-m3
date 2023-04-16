// EditUserData.jsx
import React, { useState, useEffect } from 'react';
import authService from '../services/authService';
import toast from 'react-hot-toast';

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

    authService.updateProfile(updateData)
    .then((updatedUser) => {
      // Fetch updated user data from the database
      authService.me().then((data) => {
        // Update the user data in the state
        setUserData(data);
      });
      toast.success('Profile updated successfully');
    })
    .catch((error) => {
      toast.error('Failed to update profile');
      console.log(error);
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
    <div className="profile">
      <h1 className="profile__title">My Profile</h1>
      <p className="profile__info">Name: {userData.username}</p>
      <p className="profile__info">Email: {userData.email}</p>

      <h2 className="profile__subtitle">Update Profile</h2>
      <form className="profile__form" onSubmit={handleUpdateProfile}>
        <label className="profile__label">
          Name ⍛
          <input
            className="profile__input"
            type="text"
            name="username"
            defaultValue={userData.username}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label className="profile__label">
          Email •
          <input
            className="profile__input"
            type="email"
            name="email"
            defaultValue={userData.email}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label className="profile__label">
          Password ◦
          <input
            className="profile__input"
            type="password"
            name="password"
            placeholder="New password"
            onChange={handleInputChange}
          />
        </label>
        <br />
        <button className="profile__button" type="submit">Update Profile</button>
      </form>
    </div>
  );
  
}

export default EditUserData;
