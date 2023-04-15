import React, { useState, useEffect } from "react";
import postService from "../services/postService";
import reviewsService from "../services/reviewsService.js";
import EditUserData from "./EditUserData";
import { useAuth } from "../hooks/useAuth";
import CreatePost from "./CreatePost";
import { Link } from "react-router-dom";
import EditPostData from "./EditPostData";
import { CircleLoader } from "react-spinners";

function MyProfile() {
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showMyReviews, setShowMyReviews] = useState(false);
  const [showMyPosts, setShowMyPosts] = useState(false);
  const { user, isLoggedIn } = useAuth();
  const [userReviews, setUserReviews] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const [editingPostId, setEditingPostId] = useState(null);
  const [showCreatePostForm, setShowCreatePostForm] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserReviews = async () => {
      if (isLoggedIn) {
        console.log(user._id);
        const reviews = await reviewsService.getReviewsByUser(user._id);
        console.log("Reviews", reviews);
        setUserReviews(reviews);
      }
    };
    fetchUserReviews();
  }, [user, isLoggedIn]);

  useEffect(() => {
    const fetchUserPosts = async () => {
      if (isLoggedIn) {
        setLoading(true);
        const posts = await postService.getPostsByUser(user._id);
        console.log("Posts", posts);
        setTimeout(() => {
            setUserPosts(posts);
            setLoading(false);
          }, 2000);
      }
    };
    fetchUserPosts();
  }, [user, isLoggedIn]);

  const handleEditProfileClick = () => {
    setShowEditProfile(!showEditProfile);
  };

  const handleMyReviewsClick = async () => {
    if (isLoggedIn) {
      const reviews = await reviewsService.getReviewsByUser(user._id);
      setUserReviews(reviews);
    }
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

  const handleCreatePostButtonClick = () => {
    setShowCreatePostForm(!showCreatePostForm);
  };


  return (
    <div className="my-profile">
      <h2>My Profile</h2>
      <div className="glowing-btn-container">
        <div
          className="glowing-btn glowing-btn-posts glowing-btn-my-posts"
          onClick={handleMyPostsClick}
        >
          <span className="glowing-txt">My Posts ⌽</span>
        </div>
        <div
          className="glowing-btn glowing-btn-reviews glowing-btn-my-reviews"
          onClick={handleMyReviewsClick}
        >
          <span className="glowing-txt">My Reviews ⌘</span>
        </div>
        <div
          className="glowing-btn glowing-btn-edit-profile"
          onClick={handleEditProfileClick}
        >
          <span className="glowing-txt">Edit My Profile ⍜</span>
        </div>
      </div>
      {showEditProfile && <EditUserData />}
      {showMyReviews && (
        <div>
          {userReviews.length === 0 ? (
            <p>No reviews found.</p>
          ) : (
            <div>
              {userReviews.map((review) => (
                <div key={review._id} className="review-item">
                  <img src={review.drone.imageUrl} alt="reviewPicture" />
                  <p>{review.name}</p>
                  <p>{review.comment}</p>
                  <p>{review.rating}/5</p>
                  <Link to={`/reviews/edit/${review._id}`}>Edit Review</Link>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      {showMyPosts && (
        <div className="my-posts-container">
          {loading ? (
            <div className="loading-container">
              <CircleLoader color="#2995ec" size={65} speedMultiplier={58} />
            </div>
          ) : (
            <>
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
                    <div key={post._id} className="post-item">
                      <img src={post.media} alt={post.title} />
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
            </>
          )}
        </div>
      )}
    </div>
  );
}  
      




export default MyProfile;
