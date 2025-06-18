import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  return (
    <header className="bg-white border-b border-gray-200 py-2 fixed top-0 left-0 right-0 z-50">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            id="menu-toggle"
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-full"
            onClick={() => document.querySelector('.sidebar').classList.toggle('translate-x-0')}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <Link to="/" className="flex items-center">
            <img src="https://www.youtube.com/s/desktop/ae4a304e/img/favicon_32.png" alt="YouTube Logo" className="w-8 h-8" />
            <span className="text-xl font-bold text-[#0f0f0f] ml-2">YouTube</span>
          </Link>
        </div>
        <form onSubmit={handleSearch} className="flex-grow max-w-[600px] mx-4">
          <div className="flex">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search"
              className="flex-grow p-2 border border-gray-300 rounded-l-full focus:outline-none focus:border-blue-500 text-sm"
            />
            <button className="bg-gray-100 p-2 border border-gray-300 rounded-r-full hover:bg-gray-200">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </form>
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Link to={`/channel/${user.userId}`} className="text-sm text-gray-600 hover:text-[#cc0000]">
                {user.username}
              </Link>
              <button
                onClick={handleSignOut}
                className="btn-secondary"
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link to="/login" className="btn-primary">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;