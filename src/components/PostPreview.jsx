import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function PostPreview({ post }) {
  const handleImageLoad = () => {
    // ...
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
        <Link to={`/posts/${post._id}`}>See more</Link>
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
};

export default PostPreview;
