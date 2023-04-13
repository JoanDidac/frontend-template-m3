import React, { useEffect, useState } from 'react';
import postService from '../services/postService';
import CreatePost from './CreatePost';
import PostPreview from './PostPreview';

function PostsList() {
  const [posts, setPosts] = useState([]);
  const [showCreatePostForm, setShowCreatePostForm] = useState(false);
  // const [showPostPreview, setShowPostPreview] = useState(false); 

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await postService.getPosts();
        const postsWithMediaAsArray = response.map((post) => {
          return {
            ...post,
            media: Array.isArray(post.media) ? post.media : [post.media],
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
  // const handlePostPreviewClick = () => {
  //   setShowPostPreview(!showPostPreview);
  // };

  return (
    <div className='postsList-container'>
      <h2>All Posts</h2>
      <button onClick={handleCreatePostButtonClick}>Create new Post</button>
      {showCreatePostForm && <CreatePost />}
      <div className='postsList-card'>
        {posts.map((post) => (
          <PostPreview
            key={post._id}
            post={post}
          />
        ))}
      </div>
    </div>
  );
}

export default PostsList;
