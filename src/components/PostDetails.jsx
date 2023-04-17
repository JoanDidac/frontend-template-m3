import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import postService from "../services/postService";
import './PostDetails.css';


function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await postService.getPost(id);
        setPost(response);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [id]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="post-details-container">
      <div className="post-details-card">
        <div className="post-details-image-container">
          <img
            className="post-details-image"
            src={post.media}
            alt={post.title}
          />
        </div>
        <div className="content-container">
          <h1 className="post-details-title">{post.title}</h1>
          <p className="post-details-message">{post.message}</p>
        </div>
      </div>
    </div>
  );
  
}



export default PostDetails;
