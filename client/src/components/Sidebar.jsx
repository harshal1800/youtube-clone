import { useState } from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button
        onClick={toggleSidebar}
        className="p-2 text-gray-700 md:hidden"
      >
        ☰
      </button>
      <div
        className={`bg-white shadow-md w-64 h-screen fixed top-0 left-0 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition-transform duration-300`}
      >
        <div className="p-4">
          <h2 className="text-xl font-bold">Menu</h2>
          <ul className="mt-4">
            <li>
              <Link to="/" className="block p-2 hover:bg-gray-100">
                Home
              </Link>
            </li>
            <li>
              <Link to="/subscriptions" className="block p-2 hover:bg-gray-100">
                Subscriptions
              </Link>
            </li>
            <li>
              <Link to="/library" className="block p-2 hover:bg-gray-100">
                Library
              </Link>
            </li>
            <li>
              <Link to="/upload" className="block p-2 hover:bg-gray-100">
                Upload Video
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;