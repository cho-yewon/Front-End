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

  // ✅ NavLink 클릭 시: 같은 경로면 새로고침, 아니면 메뉴만 닫기
  const handleNavClick = (path) => {
    if (location.pathname === path) {
      // 같은 메뉴 다시 누른 경우: 새로 열기 + 맨 위로
      window.location.href = path;
    } else {
      // 다른 메뉴로 이동할 때도 맨 위로
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant",   // "smooth"로 바꾸면 부드럽게 올라감
      });
      setOpen(false); // 모바일 메뉴 닫기 유지
    }
  };



  return (
    <nav ref={navRef} className={`main-nav ${open ? 'active' : ''}`}>
      <NavLink
        to="/"
        className="logo"
        onClick={() => handleNavClick('/')}
      >
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
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? 'active' : '')}
            onClick={() => handleNavClick('/')}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/resume"
            className={({ isActive }) => (isActive ? 'active' : '')}
            onClick={() => handleNavClick('/resume')}
          >
            Resume
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/projects"
            className={({ isActive }) => (isActive ? 'active' : '')}
            onClick={() => handleNavClick('/projects')}
          >
            Portfolio
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/coverletter"
            className={({ isActive }) => (isActive ? 'active' : '')}
            onClick={() => handleNavClick('/coverletter')}
          >
            Cover Letter
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contact"
            className={({ isActive }) => (isActive ? 'active' : '')}
            onClick={() => handleNavClick('/contact')}
          >
            Contact
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
