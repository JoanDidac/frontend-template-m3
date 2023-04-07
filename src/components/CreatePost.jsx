import React, { useState } from 'react';
import postService from '../services/postService';

function CreatePost() {
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    media: "",
    location: {
      latitude: "",
      longitude: "",
    },
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name.startsWith("location.")) {
      const locationName = name.replace("location.", "");
      setPostData({
        ...postData,
        location: { ...postData.location, [locationName]: value },
      });
    } else {
      setPostData({ ...postData, [name]: value });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await postService.createPost(postData);
      alert("Post created successfully!");
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Error creating post, please try again.");
    }
  };

  return (
    <div>
      <h2>Create a new Post</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          name="title"
          value={postData.title}
          onChange={handleChange}
        />

        <label htmlFor="message">Message:</label>
        <textarea
          name="message"
          value={postData.message}
          onChange={handleChange}
        />

        <label htmlFor="media">Media URL:</label>
        <input
          type="text"
          name="media"
          value={postData.media}
          onChange={handleChange}
        />
        {/* ---------------------- MAP LOCATION where img/vid were shot---------------------- */}
        
        <label htmlFor="location.latitude">Latitude:</label>
        <input
          type="number"
          step="any"
          name="location.latitude"
          value={postData.location.latitude}
          onChange={handleChange}
        />

        <label htmlFor="location.longitude">Longitude:</label>
        <input
          type="number"
          step="any"
          name="location.longitude"
          value={postData.location.longitude}
          onChange={handleChange}
        />

        <button type="submit">Create Post</button>
      </form>
    </div>
  );
}

export default CreatePost;
