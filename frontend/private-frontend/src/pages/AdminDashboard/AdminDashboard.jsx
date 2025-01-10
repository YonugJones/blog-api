import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>User ID: {user?.id}</p>
      <div>
        <h2>Dashboard Option</h2>
        <ul>
          <li>
            <button onClick={() => navigate('/admin/posts')}>Manage Posts</button>
          </li>
          <li>
            <button onClick={() => navigate('/admin/comments')}>Manage Comments</button>
          </li>
          <li>
            <button onClick={() => navigate('/admin/users')}>Manage Users</button>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default AdminDashboard;