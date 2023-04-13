import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import postService from "../services/postService";



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
    <div className="postDetails-container">
      <div>
        <img src={post.media} alt={post.title} />
        <div className="content-container">
        
          <h1>{post.title}</h1>
          
          <p>{post.message}</p>
          
        </div>
      </div>
    </div>
  );
}

export default PostDetails;
