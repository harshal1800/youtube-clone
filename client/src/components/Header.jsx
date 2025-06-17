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
    console.log('Search query:', searchQuery);
    // Implement search later
  };

  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-md p-4 flex items-center justify-between">
      <Link to="/" className="text-2xl font-bold text-red-600">
        YouTube Clone
      </Link>
      <form onSubmit={handleSearch} className="flex-grow mx-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search videos..."
          className="w-full p-2 border rounded-lg"
        />
      </form>
      <div>
        {user ? (
          <div className="flex items-center gap-4">
            <Link to={`/channel/${user.userId}`} className="text-gray-700 hover:underline">
              {user.username}
            </Link>
            <button
              onClick={handleSignOut}
              className="text-blue-600 hover:underline"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <Link to="/login" className="text-blue-600 hover:underline">
            Sign In
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;