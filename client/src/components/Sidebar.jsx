import { useState } from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`sidebar bg-white w-60 h-screen fixed top-0 left-0 z-40 transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } md:w-20 md:translate-x-0 transition-transform duration-200 ease-in-out border-r border-gray-200 pt-14`}
    >
      <div className="p-2 flex flex-col h-full">
        <ul className="space-y-1 mt-2">
          <li>
            <Link
              to="/"
              className="flex items-center p-3 md:p-4 hover:bg-gray-100 rounded-lg text-sm text-gray-900"
              onClick={() => setIsOpen(false)}
            >
              <svg className="w-6 h-6 mr-4 md:mr-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10h3v-3h4v3h3V10m-4-7v7" />
              </svg>
              <span className="md:hidden">Home</span>
            </Link>
          </li>
          <li>
            <Link
              to="/subscriptions"
              className="flex items-center p-3 md:p-4 hover:bg-gray-100 rounded-lg text-sm text-gray-900"
              onClick={() => setIsOpen(false)}
            >
              <svg className="w-6 h-6 mr-4 md:mr-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l-4 4-4-4m-3 4h14v6H4v-6z" />
              </svg>
              <span className="md:hidden">Subscriptions</span>
            </Link>
          </li>
          <li>
            <Link
              to="/library"
              className="flex items-center p-3 md:p-4 hover:bg-gray-100 rounded-lg text-sm text-gray-900"
              onClick={() => setIsOpen(false)}
            >
              <svg className="w-6 h-6 mr-4 md:mr-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z" />
              </svg>
              <span className="md:hidden">Library</span>
            </Link>
          </li>
          <li>
            <Link
              to="/upload"
              className="flex items-center p-3 md:p-4 hover:bg-gray-100 rounded-lg text-sm text-gray-900"
              onClick={() => setIsOpen(false)}
            >
              <svg className="w-6 h-6 mr-4 md:mr-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              <span className="md:hidden">Upload Video</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;