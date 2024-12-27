const BASE_URL = 'http://localhost:3000';

export const fetchPosts = async () => {
  try {
    const response = await fetch(`${BASE_URL}/posts`);
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`)
    }
    const data = await response.json();
    console.log('Fetched posts:', data);
    return data.posts;
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    throw error;
  }
}