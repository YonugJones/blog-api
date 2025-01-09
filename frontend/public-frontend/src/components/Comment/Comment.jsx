import { useState } from 'react';
import { useAuth } from '../../context/authContext';
import { likeComment, unlikeComment, editComment, softDeleteComment } from '../../api/api';
import './Comment.css';

const Comment = ({ comment, postId, onUpdate }) => {
  const { user } = useAuth(); 
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLike = async () => {
    try {
      setIsLoading(true)
      if (comment.isLikedByUser) {
        await unlikeComment(postId, comment.id)
      } else {
        await likeComment(postId, comment.id)
      }
      onUpdate();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to like/unlike comment');
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = async () => {
    try {
      setIsLoading(true);
      const updatedComment = await editComment(postId, comment.id, { content: editedContent });
      setIsEditing(false);
      onUpdate(comment.id, updatedComment.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to edit comment');
    } finally {
      setIsLoading(false)
    }
  };

  const handleSoftDelete = async () => {
    try {
      setIsLoading(true);
      await softDeleteComment(postId, comment.id);
      onUpdate();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete comment');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="comment">
      {error && <p className="error">{error}</p>}
      <div className="comment-header">
        <span className="username">{comment.user.username}</span>
        <span className="timestamp">{new Date(comment.createdAt).toLocaleString()}</span>
      </div>

      {isEditing ? (
        <textarea
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
          disabled={isLoading}
        />
      ) : (
          <p className="content">{comment.content}</p>
      )}

      <div className="comment-footer">
        <button onClick={handleLike} disabled={isLoading}>
          {comment.isLikedByUser ? 'Unlike' : 'Like'} ({comment._count.CommentLike})
        </button>

        {user.id === comment.user.id && !isEditing && (
          <>
            <button onClick={() => setIsEditing(true)} disabled={isLoading}>
              Edit
            </button>
            <button onClick={handleSoftDelete} disabled={isLoading}>
              Delete
            </button>
          </>
        )}

        {isEditing && (
          <>
            <button onClick={handleEdit} disabled={isLoading}>
              Save
            </button>
            <button onClick={() => setIsEditing(false)} disabled={isLoading}>
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Comment;
