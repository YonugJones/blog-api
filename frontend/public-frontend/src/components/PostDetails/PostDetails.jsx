import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPostById, fetchCommentsByPostId } from '../../api/api';
import CommentsList from '../CommentsList/CommentsList';
import NewComment from '../NewComment/NewComment';
import { CommentsContext } from '../../context/CommentsContext';
import './PostDetails.css';

export default function PostDetails() {
  const { postId } = useParams();
  const { comments, setComments, addComment } = useContext(CommentsContext);
  const [post, setPost] = useState(null);
  const [postError, setPostError] = useState(null);
  const [commentsError, setCommentsError] = useState(null);

  useEffect(() => {
    const loadPost = async () => {
      try {
        const fetchedPost = await fetchPostById(postId);
        setPost(fetchedPost)
      } catch (error) {
        setPostError(error.message)
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
        setCommentsError(error.message);
      }
    };
    loadComments();
  }, [postId, setComments]);

  if (postError) {
    return <div>Error loading post: {[postError]}</div>;
  }

  if (!post) {
    return <div>Loading post...</div>;
  }

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
      {commentsError ? (
        <div>Error loading comments: {commentsError}</div>
      ) : (
        <CommentsList comments={comments} />
      )}
      <NewComment postId={postId} onCommentAdded={addComment} />
    </div>
  )
}