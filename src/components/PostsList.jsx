import React, { useEffect, useState } from 'react';
import postService from '../services/postService';
import CreatePost from './CreatePost';
import PostPreview from './PostPreview';
import { useNavigate } from 'react-router-dom';

function PostsList() {
  const [posts, setPosts] = useState([]);
  const [showCreatePostForm, setShowCreatePostForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await postService.getPosts();
        const postsWithMediaAsArray = response.map(post => {
          return {
            ...post,
            media: Array.isArray(post.media) ? post.media : [post.media]
          };
        });
        setPosts(postsWithMediaAsArray);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    
    fetchPosts();
  }, []);

  const handleCreatePostButtonClick = () => {
    setShowCreatePostForm(!showCreatePostForm);
  };

  const handlePostClick = (postId) => {
    navigate(`/posts/${postId}`);
  };

  return (
    <div>
      <h2>All Posts</h2>
      <button onClick={handleCreatePostButtonClick}>Create new Post</button>
      {showCreatePostForm && <CreatePost />}
      <div>
        {posts.map((post) => (
          <PostPreview
            key={post._id}
            post={post}
            handlePostClick={handlePostClick}
          />
        ))}
      </div>
    </div>
  );
}

export default PostsList;
