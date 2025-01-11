import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCommentsByPostIdAPI, adminSoftDeleteCommentAPI } from "../../api/commentAPI";
import './ManageComments.css';

const ManageComments = () => {
  const { postId } = useParams();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadComments = async () => {
      try {
        const response = await fetchCommentsByPostIdAPI(postId);
        if (response.success) {
          setComments(response.data);
        } else {
          setError('Failed to fetch comments');
        }
      } catch (err) {
        setError('An error occurred while fetching comments.');
        console.error(err);
      } finally {
        setLoading(false)
      }
    };

    loadComments();
  }, [postId])

  const handleAdminSoftDelete = async (postId, commentId) => {
    try {
      const response = await adminSoftDeleteCommentAPI(postId, commentId);
      console.log(postId, commentId);
      if (response.success) {
        setComments((prevComments) => 
          prevComments.filter((comment) => comment.id !== commentId)
        );
      } else {
        alert('Failed to delete comment');
      }
    } catch (err) {
      console.error('Error deleting comment:', err);
    }
  }

  if (loading) return <p>Loading comments...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className='manage-comments'>
      <h2>Manage Comments</h2>
      <table>
        <thead>
          <tr>
            <th>Author</th>
            <th>Content</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {comments.map((comment) => (
            <tr key={comment.id}>
              <td>{comment.user.username}</td>
              <td>{comment.content}</td>
              <td>{new Date(comment.createdAt).toLocaleDateString()}</td>
              <td>
                <button onClick={() => handleAdminSoftDelete(postId, comment.id)}>Soft Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
  );
}

export default ManageComments;