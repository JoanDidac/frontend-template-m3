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
    
    <div className="create-review-container">
    
      <h2 className="create-review-title" >Review Drone</h2>
      <form onSubmit={handleSubmit} className="create-review-form">
        <label htmlFor="name" className="create-review-label" >Title:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={reviewData.name}
          onChange={handleChange}
          required
        />
        <br />

        <label htmlFor="comment" className="create-review-label">Comment:</label>
        <textarea
          id="comment"
          name="comment"
          value={reviewData.comment}
          onChange={handleChange}
          required
        />
        <br />

        <label htmlFor="rating" className="create-review-label" >Rating:</label>
        <input
          type="number"
          id="rating"
          name="rating"
          min="1"
          max="5"
          value={reviewData.rating}
          onChange={handleChange}
          required
          className="create-review-input"
        />
        <br />

        <button type="submit" className="create-review-submit">Submit Review</button>
      </form>
    </div>
  );
}

export default CreateReview;
