import './Footer.css'

export default function Footer() {
  return (
    <footer className='footer'>
      <p>&copy; {new Date().getFullYear()} <a href="https://github.com/YonugJones?tab=repositories">YonugJones</a></p>
    </footer>
  )
}