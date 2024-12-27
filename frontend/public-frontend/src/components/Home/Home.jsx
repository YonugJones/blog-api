import PostsList from '../PostsList/PostsList'

export default function Home() {
  const handleSelectPost = (postId) => {
    console.log(`Post selected with ID: ${postId}`);
  }

  return (
    <div className='home'>
      <h2>Welcome to my blog!</h2>
      <p>Explore the latest posts and updates below. Click on a post to read more!</p>
      <div className='post-list'>
        <PostsList onSelectPost={handleSelectPost}/>
      </div>
    </div>
  )
}