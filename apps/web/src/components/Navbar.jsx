import { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navRef = useRef(null);

  // ✅ 라우트 변경 시 메뉴 자동 닫기
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // ✅ 바깥 클릭 시 메뉴 닫기
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [open]);

  // 메뉴 닫기 함수 (NavLink 클릭 시 사용)
  const closeMenu = () => setOpen(false);

  return (
    <nav ref={navRef} className={`main-nav ${open ? 'active' : ''}`}>
      <NavLink to="/" className="logo" onClick={closeMenu}>
        [Cho Yewon]
      </NavLink>

      <button
        className="menu-toggle"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label="Toggle navigation menu"
      >
        ☰
      </button>

      <ul>
        <li>
          <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''} onClick={closeMenu}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/resume" className={({ isActive }) => isActive ? 'active' : ''} onClick={closeMenu}>
            Resume
          </NavLink>
        </li>
        <li>
          <NavLink to="/projects" className={({ isActive }) => isActive ? 'active' : ''} onClick={closeMenu}>
            Portfolio
          </NavLink>
        </li>
        <li>
          <NavLink to="/coverletter" className={({ isActive }) => isActive ? 'active' : ''} onClick={closeMenu}>
            Cover Letter
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact" className={({ isActive }) => isActive ? 'active' : ''} onClick={closeMenu}>
            Contact
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
