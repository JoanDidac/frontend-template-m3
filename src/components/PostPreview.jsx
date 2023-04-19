import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


function PostPreview({ post }) {
  const handleImageLoad = () => {
    // ...
  };

  
  return (
    <div className="post-card single-post">
      {post.media && post.media.length > 0 && (
        <div className="post-media">
        <Link to={`/posts/${post._id}`}>
          <img
            src={post.media[0]}
            alt={post.title}
            onLoad={handleImageLoad}
          />
          </Link>
        </div>
      )}
      <div className="post-content">
        <h3>{post.title}</h3>
        <p className="post-message">{post.message}</p>
      </div>
      <div className='post-content-anchors'>
        <Link to={`/posts/${post._id}`} >Edit Post</Link>
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
