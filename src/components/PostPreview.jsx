import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function PostPreview(props) {
  const { post, handlePostClick } = props;
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <React.Fragment key={post._id}>
      {post.media && post.media.length > 0 && (
        <div className="post-media">
          <img
            src={post.media[0]}
            alt={post.title}
            onLoad={handleImageLoad}
            style={{ display: imageLoaded ? 'block' : 'none' }}
          />
        </div>
      )}
      <div className="post-content">
        <h3>{post.title}</h3>
        <Link to={`/posts/${post._id}/edit`}>Edit Post</Link>
        <button onClick={() => handlePostClick(post._id)}>See more</button>
      </div>
    </React.Fragment>
  );
}

PostPreview.propTypes = {
  post: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    media: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string.isRequired
  }).isRequired,
  handlePostClick: PropTypes.func.isRequired,
};

export default PostPreview;
