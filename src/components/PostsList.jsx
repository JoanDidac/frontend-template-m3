import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PostsList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('/posts');
        setPosts(response.data);
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
          <li key={post._id}>{post.title} - {post.message}</li>
        ))}
      </ul>
    </div>
  );
}

export default PostsList;
