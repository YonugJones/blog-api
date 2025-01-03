import PostsList from '../PostsList/PostsList'
import './Home.css'

export default function Home() {

  return (
    <div className='home'>
      <div className='post-list'>
        <PostsList />
      </div>
    </div>
  )
}