import React, { useState, useEffect } from 'react';
import postService from '../services/postService';
import toast from 'react-hot-toast';

function EditPostData({ postId , inMyProfile, setSubmittingForm, setEditingPostId}) {
  const [post, setPost] = useState(null);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const formClassName = inMyProfile ? "edit-post-form-in-my-profile" : "";

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await postService.getPost(postId);
        setPost(response);
        setTitle(response.title);
        setBody(response.message);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPost();
  }, [postId]);

  const handleSubmit = async (e , setSubmittingForm) => {
    e.preventDefault();
    setSubmittingForm(true);
    const updatedPost = {
      title,
      message: body
    };

    try {
        await postService.editPost(postId, updatedPost);
        toast.success('Post updated successfully -`ღ´-');
        setSubmittingForm(false); // Set submittingForm back to false after successful submission
        setEditingPostId(null); // Hide the form after successful submission
      } catch (error) {
        toast.error('Error updating post: щ（ﾟДﾟщ）');
        setSubmittingForm(false); // Set submittingForm back to false even after an error
      }
    };


  return (
    <div className="edit-post-form-container">
      <form onSubmit={(e) => handleSubmit(e, setSubmittingForm)} className={`edit-post-form ${formClassName}`}>
      <h2>Edit Post</h2>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="body">Body:</label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default EditPostData;
