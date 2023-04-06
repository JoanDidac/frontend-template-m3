import React, { useEffect, useState } from 'react';
import postService from '../services/postService';

function PostsList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await postService.getPosts();
        setPosts(response);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div>
      <h2>All Posts</h2>
      <ul>
        {posts.map(post => (
            
        
          <React.Fragment key={post._id}>
            <img src={post.media} alt={post.title} />
            <li>{post.title}</li>
            <li>{post.message}</li>
          </React.Fragment>
          
        
        ))}
      </ul>
    </div>
  );
}

export default PostsList;
