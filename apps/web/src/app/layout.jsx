import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Layout() {
  return (
    <>
      <header className="main-header">
        <div className="container">
          <Navbar />
        </div>
      </header>
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
