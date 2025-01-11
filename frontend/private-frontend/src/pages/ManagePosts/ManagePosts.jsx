import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchPostsAPI, softDeletePostAPI } from '../../api/postAPI';
import './ManagePosts.css';

const ManagePosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const response = await fetchPostsAPI();
        if (response.success) {
          setPosts(response.data);
        } else {
          setError('Failed to fetch posts.');
        }
      } catch (err) {
        setError('An error occurred while fetching posts.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  const handleSoftDelete = async (postId) => {
    try {
      const response = await softDeletePostAPI(postId);
      if (response.success) {
        setPosts((prevPosts) =>
          prevPosts.filter((post) => post.id !== postId)
        );
      } else {
        alert('Failed to delete post.');
      }
    } catch (err) {
      console.error('Error deleting post:', err);
    }
  };

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className='manage-posts'>
      <h2>Manage Posts</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td>{post.title}</td>
              <td>{post.author?.username}</td>
              <td>{new Date(post.createdAt).toLocaleDateString()}</td>
              <td>
                <button onClick={() => handleSoftDelete(post.id)}>Soft Delete</button>
                <button onClick={() => navigate(`/admin/posts/edit/${post.id}`)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to='/admin'>Home</Link>
    </div>
  );
};

export default ManagePosts;
