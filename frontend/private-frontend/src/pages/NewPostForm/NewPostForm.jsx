import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { createPostAPI } from "../../api/postAPI"
import './NewPostForm.css';


const NewPostForm = () => {
  const navigate = useNavigate();
  const [post, setPost] = useState({ title: '', content: '', imageUrl: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createPostAPI(post);
      if (response.success) {
        alert('Post created successfully!');
        navigate('/admin/posts');
      }
    } catch (err) {
      console.error('Error creating post:', err);
    }
  }

  return (
    <div className="new-post-form">
      <h2>Create Post</h2>
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
        <div className="button-container">
          <button type="submit">Create Post</button>
          <button type="button" onClick={() => navigate('/admin')}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default NewPostForm;