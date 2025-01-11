import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchPostByIdAPI, updatePostAPI } from "../../api/postAPI";
import './EditPostForm.css';

const EditPostForm = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({ title: '', content: '', imageUrl: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPost = async () => {
      try {
        const response = await fetchPostByIdAPI(postId);
        if (response.success) {
          setPost(response.data);
        } else {
          setError('Failed to load post data.');
        }
      } catch (err) {
        setError('An error occurred while loading post data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updatePostAPI(postId, post);
      if (response.success) {
        alert('Post updated successfully!');
        navigate('/admin/posts');
      } else {
        alert('Failed to update post.');
      }
    } catch (err) {
      console.error('Error updating post:', err);
    }
  }

  if (loading) return <p>Loading post...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="edit-post-form">
      <h2>Edit Post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title: </label>
          <input 
            type="text"
            id="title"
            name="title"
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })} 
            required
          />
        </div>
        <div>
          <label htmlFor="content">Content: </label>
          <textarea 
            id="content"
            name="content"
            value={post.content}
            onChange={(e) => setPost({ ...post, content: e.target.value })} 
            required
          />
        </div>
        <div>
          <label htmlFor="imageUrl">Image URL:</label>
          <input
            type="text"
            id="imageUrl"
            value={post.imageUrl}
            onChange={(e) => setPost({ ...post, imageUrl: e.target.value })}
          />
        </div>
        <button type="submit">Save change</button>
        <button type="button" onClick={() => navigate('/admin/posts')}>
          Cancel
        </button>
      </form>
    </div>
  )
}

export default EditPostForm;