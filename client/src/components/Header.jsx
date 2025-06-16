import { useState } from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  // Placeholder for user authentication state
  const user = null; // Replace with actual user state later

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Search query:', searchQuery);
    // Implement search functionality later
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
          <span className="text-gray-700">{user.username}</span>
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