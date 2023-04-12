import React, { useState } from 'react';
import reviewsService from '../services/reviewsService';
import toast from 'react-hot-toast';

function CreateReview({ droneId, userId, onSave }) {
  const [reviewData, setReviewData] = useState({
    name: '',
    comment: '',
    rating: '',
    drone: droneId,
  });

  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setReviewData({ ...reviewData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const reviewExists = await reviewsService.checkReviewExists(droneId, userId);
      if (reviewExists) {
        toast.error('You already reviewed this drone!');
        onSave();
      } else {
        await reviewsService.createReview(reviewData);
        toast.success('Review submitted successfully!');
        onSave();
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Error submitting review, please try again.');
    }
  };

  

  return (
    
    <div>
    
      <h2>Review Drone</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={reviewData.name}
          onChange={handleChange}
          required
        />
        <br />

        <label htmlFor="comment">Comment:</label>
        <textarea
          id="comment"
          name="comment"
          value={reviewData.comment}
          onChange={handleChange}
          required
        />
        <br />

        <label htmlFor="rating">Rating:</label>
        <input
          type="number"
          id="rating"
          name="rating"
          min="1"
          max="5"
          value={reviewData.rating}
          onChange={handleChange}
          required
        />
        <br />

        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
}

export default CreateReview;
