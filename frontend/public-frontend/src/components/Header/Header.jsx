import './Header.css';

export default function Header() {
  return (
    <header className='header'>
      <h1 className='header-title'>My Blog</h1>
      <nav>
        <ul className='nav-links'>
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </nav>
    </header>
  )
}