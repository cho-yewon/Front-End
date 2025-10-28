import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="main-nav">
      <NavLink to="/" className="logo">[Cho Yewon]</NavLink>
      <ul>
        <li><NavLink to="/" end className={({isActive})=> isActive ? 'active' : ''}>Home</NavLink></li>
        <li><NavLink to="/about" className={({isActive})=> isActive ? 'active' : ''}>About</NavLink></li>
        <li><NavLink to="/projects" className={({isActive})=> isActive ? 'active' : ''}>Portfolio</NavLink></li>
        <li><NavLink to="/resume" className={({isActive})=> isActive ? 'active' : ''}>Resume</NavLink></li>
        <li><NavLink to="/contact" className={({isActive})=> isActive ? 'active' : ''}>Contact</NavLink></li>
      </ul>
    </nav>
  );
}
