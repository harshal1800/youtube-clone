import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import VideoGrid from '../components/VideoGrid';

function Library() {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchLibraryVideos = async () => {
      try {
        if (!user) {
          setError('Please log in to view your library');
          return;
        }
        // Placeholder: Fetch videos uploaded by the user as a "library" substitute
        const response = await axios.get(`http://localhost:5000/api/videos/user/${user.userId}`);
        setVideos(response.data);
      } catch (_err) {
        setError(_err.response?.data?.message || 'Failed to load library');
      }
    };
    fetchLibraryVideos();
  }, [user]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-4">
          <h2 className="text-2xl font-bold mb-4">Your Library</h2>
          {error ? (
            <p className="text-red-500">{error}</p>
          ) : videos.length > 0 ? (
            <VideoGrid videos={videos} />
          ) : (
            <p className="text-gray-600">
              {user ? 'No videos in your library.' : 'Log in to view your library.'}
            </p>
          )}
        </main>
      </div>
    </div>
  );
}

export default Library;