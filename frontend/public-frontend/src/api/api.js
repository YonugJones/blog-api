const BASE_URL = 'http://localhost:3000';

export const signup = async (formData) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error response:', errorData); 
      throw new Error(errorData.message || 'Signup failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Signup failed:', error.error);
    throw error;
  }
}

export const login = async (credentials) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    }) 

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error response:', errorData);
      throw new Error(errorData.message || 'Signup failed');
    }

    const data = await response.json();
    return data
  } catch (error) {
    console.error('Login failed:', error.error);
    throw error;
  }
}

export const logout = () => {
  localStorage.removeItem('token');
  window.location.reload();
}

export const fetchPosts = async () => {
  try {
    const response = await fetch(`${BASE_URL}/posts`);
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`)
    }
    const data = await response.json();
    return data.posts;
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    throw error;
  }
}

export const fetchPostById = async (postId) => {
  try {
    const response = await fetch(`${BASE_URL}/posts/${postId}`)
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`)
    }
    const data = await response.json();
    return data.post;
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    throw error;
  }
}

export const fetchCommentsByPostId = async (postId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${BASE_URL}/posts/${postId}/comments`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`)
    }
    const data = await response.json();
    return data.comments;
  } catch (error) {
    console.error('Failed to fetch comments:', error);
    throw error;
  }
} 