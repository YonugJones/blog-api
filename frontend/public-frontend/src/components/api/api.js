const BASE_URL = 'http://localhost:3000';

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

export const fetchComments = async (postId) => {
  try {
    const response = await fetch(`${BASE_URL}/posts/${postId}/comments`)
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