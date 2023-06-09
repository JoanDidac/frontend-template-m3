import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import reviewsService from '../services/reviewsService';
import toast from 'react-hot-toast';
import './EditReviewForm.css'

const EditReview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [review, setReview] = useState({ name: '', comment: '', rating: 1 });

  useEffect(() => {
    const fetchReview = async () => {
      const reviewData = await reviewsService.getReview(id);
      setReview(reviewData);
    };
    fetchReview();
  }, [id]);

  const handleChange = (e) => {
    setReview({ ...review, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await reviewsService.editReview(id, review);
        toast.success('Review updated successfully ᕙ(⇀‸↼‶)ᕗ');
        navigate('/myprofile');
      } catch (error) {
        toast.error('Failed to update review щ（ﾟДﾟщ）');
        console.log(error);
      }
    };

    return (
        <div className="edit-review-container">
          <h2 className="edit-review-title">Edit Drone Review</h2>
          <form className="edit-review-form" onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input type="text" name="name" value={review.name} onChange={handleChange} />
            <label htmlFor="comment">Comment:</label>
            <textarea name="comment" value={review.comment} onChange={handleChange} />
            <label htmlFor="rating">Rating:</label>
            <input type="number" name="rating" min="1" max="5" value={review.rating} onChange={handleChange} />
            <button type="submit">Save</button>
          </form>
        </div>
      );
      
};

export default EditReview;
