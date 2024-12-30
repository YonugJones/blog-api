import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCommentsByPostId, fetchPostById } from '../../api/api';
import CommentsList from '../CommentsList/CommentsList';
import NewComment from '../NewComment/NewComment';
import './PostDetails.css';

export default function PostDetails() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
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
  }, [postId]);

  useEffect(() => {
    const loadComments = async () => {
      try {
        const fetchedComments = await fetchCommentsByPostId(postId);
        setComments(fetchedComments);
      } catch (error) {
        console.error('Error loading comments', error)
      }
    };
    loadComments();
  }, [postId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!post) {
    return <div>Loading post...</div>;
  }

  const handleNewComment = (newComment) => {
    setComments((prevComments) => [...prevComments, newComment])
  };

  return (
    <div className='post-details'>
      <img src={post.imageUrl} alt={post.title} className='post-image'/>
      <h1 className='post-title'>{post.title}</h1>
      <p className='post-content'>{post.content}</p>
      <p className='post-author'>Author: {post.author.username}</p>
      <p className='post-published'>Published: {new Date(post.createdAt).toLocaleString()}</p>
      <div className='comments-header'>
        <h2>Comments</h2>
      </div>
      <CommentsList comments={comments} />
      <NewComment postId={postId} onCommentAdded={handleNewComment} />
    </div>
  )
}