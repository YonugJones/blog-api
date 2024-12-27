import PostsList from '../PostsList/PostsList'
import './Home.css'

export default function Home() {
  const handleSelectPost = (postId) => {
    console.log(`Post selected with ID: ${postId}`);
  }

  return (
    <div className='home'>
      <div className='home-header'>
        <p>Explore the latest posts and updates below. Click on a post to read more!</p>
      </div>
      <div className='post-list'>
        <PostsList onSelectPost={handleSelectPost}/>
      </div>
    </div>
  )
}