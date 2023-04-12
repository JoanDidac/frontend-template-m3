import React, { useState, useEffect } from 'react';
import postService from '../services/postService';

function EditPostData({ postId }) {
  const [post, setPost] = useState(null);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await postService.getPost(postId);
        setPost(response);
        setTitle(response.title);
        setBody(response.body);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPost();
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedPost = {
      title,
      body
    };

    try {
      await postService.editPost(postId, updatedPost);
      alert('Post updated successfully');
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Edit Post</h2>
      <form onSubmit={handleSubmit}>
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
