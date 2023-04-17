import React, { useEffect, useState } from "react";
import postService from "../services/postService";
import CreatePost from "./CreatePost";
import PostPreview from "./PostPreview";
import { CircleLoader } from "react-spinners";

function PostsList() {
  const [posts, setPosts] = useState([]);
  const [showCreatePostForm, setShowCreatePostForm] = useState(false);
  const [loading, setLoading] = useState(true);
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
        setLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
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
    <div className="postsList-container">
      <h2>All Posts Collection</h2>
      <p className="postsList-slogan">Fly, Share, Enjoy, Repeat...</p>
      <button
        className="add-drone-button"
        onClick={handleCreatePostButtonClick}
      >
        Create new Post
      </button>
      {showCreatePostForm && <CreatePost />}
      {loading ? ( // Render the ClimbingBoxLoader when loading
        <div className="spinner-container">
          <CircleLoader color="#2995ec" size={75} speedMultiplier={58} />
        </div>
      ) : (
        <div className="postsList-card">
          {posts.map((post) => (
            <PostPreview key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}

export default PostsList;
