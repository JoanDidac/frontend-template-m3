import React, { useState, useEffect } from "react";
import postService from "../services/postService";
import reviewsService from "../services/reviewsService.js";
import EditUserData from "./EditUserData";
import { useAuth } from "../hooks/useAuth";
import handleCreatePostButtonClick from "./PostsList";
import showCreatePostForm from "./PostsList";
import CreatePost from "./CreatePost";
import { Link } from "react-router-dom";
import EditPostData from "./EditPostData";
// import PostPreview from './PostPreview';
// import posts from './CreatePost';
//import authService from '../services/authService';

function MyProfile() {
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showMyReviews, setShowMyReviews] = useState(false);
  const [showMyPosts, setShowMyPosts] = useState(false);
  const { user, isLoggedIn } = useAuth();
  //const [userProfile, setUserProfile] = useState(null);
  const [userReviews, setUserReviews] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const [editingPostId, setEditingPostId] = useState(null);
  //   const [hasPosts] = useState(false);

  //   useEffect(() => {
  //     const fetchUserProfile = async () => {
  //       const data = await authService.me();
  //       setUserProfile(data);
  //     };
  //     fetchUserProfile();
  //   }, []);

  useEffect(() => {
    const fetchUserReviews = async () => {
      if (isLoggedIn) {
        console.log(user._id);
        const reviews = await reviewsService.getReviewsByUser();
        console.log("Reviews", reviews);
        setUserReviews(reviews);
      }
    };
    fetchUserReviews();
  }, [user, isLoggedIn]);

  useEffect(() => {
    const fetchUserPosts = async () => {
      if (isLoggedIn) {
        const posts = await postService.getPostsByUser(user._id);
        console.log("Posts", posts);
        setUserPosts(posts);
      }
    };
    fetchUserPosts();
  }, [user, isLoggedIn]);

  const handleEditProfileClick = () => {
    setShowEditProfile(!showEditProfile);
  };

  const handleMyReviewsClick = () => {
    setShowMyReviews(!showMyReviews);
  };

  const handleMyPostsClick = async () => {
    if (isLoggedIn) {
      const posts = await postService.getPostsByUser(user._id);
      setUserPosts(posts);
    }
    setShowMyPosts(!showMyPosts);
  };

  const handleEditPostClick = (postId) => {
    setEditingPostId(postId);
  };

  return (
    <div>
      <h2>My Profile</h2>
      <button onClick={handleEditProfileClick}>Edit My Profile</button>
      {showEditProfile && <EditUserData />}
      <button onClick={handleMyReviewsClick}>My Reviews</button>
      {showMyReviews && (
        <div>
          {userReviews.length === 0 ? (
            <p>No reviews found.</p>
          ) : (
            <div>
              {userReviews.map((review) => (
                <div key={review._id}>
                  <img src={review.drone.imageUrl} alt="reviewPicture" />
                  <p>{review.name}</p>
                  <p>{review.comment}</p>
                  <p>{review.rating}/5</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      <button onClick={handleMyPostsClick}>My Posts</button>
      {showMyPosts && (
        <div>
          {userPosts.length === 0 ? (
            <div>
              <p>No posts found.</p>
              <button onClick={handleCreatePostButtonClick}>
                Create new Post
              </button>
              {showCreatePostForm && <CreatePost />}
            </div>
          ) : (
            <div className="posts-grid">
              {userPosts.map((post) => (
                <div key={post._id} className="post-card">
                  <img src={post.media} alt="postPicture" />
                  <div className="post-info">
                    <h3>{post.title}</h3>
                    <p>{post.body}</p>
                    <button onClick={() => handleEditPostClick(post._id)}>
                      Edit Post
                    </button>
                    <Link to={`/posts/${post._id}`}>Check the Post</Link>
                    {editingPostId === post._id && (
                      <EditPostData postId={post._id} />
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default MyProfile;
