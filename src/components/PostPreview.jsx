import React from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';

function PostPreview({ post }) {
  const handleImageLoad = () => {
    // ...
  };

  const navigate = useNavigate();

  const handlePostClick = (postId) => {
    navigate(`/posts/${postId}`);
  };

  return (
    <div className="post-card">
      {post.media && post.media.length > 0 && (
        <div className="post-media">
          <img
            src={post.media[0]}
            alt={post.title}
            onLoad={handleImageLoad}
          />
        </div>
      )}
      <div className="post-content">
        <h3>{post.title}</h3>
        <p>{post.message}</p>
        <Link to={`/posts/${post._id}/edit`}>Edit Post</Link>
        <Link to={`/posts/${post._id}`} onClick={() => handlePostClick(post._id)}>See more</Link>
      </div>
    </div>
  );
}

PostPreview.propTypes = {
  post: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    media: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string.isRequired,
    message: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  handlePostClick: PropTypes.func.isRequired,
};

export default PostPreview;
