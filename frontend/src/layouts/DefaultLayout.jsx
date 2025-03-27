import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

/**
 * Default layout component that includes the navbar and main content
 */
const DefaultLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet />
      </main>
      <footer className="bg-gray-100 py-4 text-center">
        <p className="text-gray-600">© 2024 AI Solution Website. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default DefaultLayout;
