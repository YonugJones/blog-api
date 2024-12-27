import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPostById } from '../api/api';
import './PostDetails.css';

export default function PostDetails() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPost = async () => {
      try {
        const fetchedPost = await fetchPostById(postId);
        setPost(fetchedPost)
      } catch (error) {
        setError(error.message)
      }
    };
    loadPost()
  }, [postId])

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!post) {
    return <div>Loading post...</div>;
  }

  return (
    <div className='post-details'>
      <h1>{post.title}</h1>
      <img src={post.imageUrl} alt={post.title} className='post-image'/>
      <p>{post.content}</p>
      <p>Author: {post.author.username}</p>
      <p>Published: {new Date(post.createdAt).toLocaleString()}</p>
    </div>
  )
}