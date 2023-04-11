// MyProfile.jsx
import React, { useState, useEffect } from 'react';
import postService from '../services/postService';
import reviewsService from '../services/reviewsService.js';
import EditUserData from './EditUserData';
//import authService from '../services/authService';
import { useAuth } from '../hooks/useAuth';


function MyProfile() {
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showMyReviews, setShowMyReviews] = useState(false);
  const [showMyPosts, setShowMyPosts] = useState(false);
  const { user, isLoggedIn } = useAuth();
  //const [userProfile, setUserProfile] = useState(null);
  const [userReviews, setUserReviews] = useState([]);
  const [userPosts, setUserPosts] = useState([]);

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
        console.log('Reviews', reviews)
        setUserReviews(reviews);
      }
    };
    fetchUserReviews();
  }, [user, isLoggedIn]);

  useEffect(() => {
    const fetchUserPosts = async () => {
      if (isLoggedIn) {
        const posts = await postService.getPostsByUser(user._id);
        console.log('Posts', posts)
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

  const handleMyPostsClick = () => {
    setShowMyPosts(!showMyPosts);
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
                <img src={review.drone.imageUrl} alt='reviewPicture' />
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
            <p>No posts found.</p>
          ) : (
            <ul>
              {userPosts.map((post) => (
                <li key={post._id}>
                  <p>{post.title}</p>
                  <p>{post.body}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default MyProfile;
