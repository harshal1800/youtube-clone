import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import VideoGrid from '../components/VideoGrid';

function Channel() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchChannelData = async () => {
      try {
        // Fetch user profile
        const userResponse = await axios.get(`http://localhost:5000/api/users/${userId}`);
        setUser(userResponse.data);
        // Fetch user's videos
        const videosResponse = await axios.get(`http://localhost:5000/api/videos/user/${userId}`);
        setVideos(videosResponse.data);
      } catch (_err) {
        setError('Failed to load channel data');
      }
    };
    fetchChannelData();
  }, [userId]);

  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;
  if (!user) return <p className="text-gray-500 text-center mt-10">Loading...</p>;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-4">
          <div className="mb-6">
            <h2 className="text-2xl font-bold">{user.username}'s Channel</h2>
            <p className="text-gray-600">Email: {user.email}</p>
            <p className="text-gray-600">Joined: {new Date(user.createdAt).toLocaleDateString()}</p>
          </div>
          <h3 className="text-xl font-semibold mb-4">Uploaded Videos</h3>
          {videos.length > 0 ? (
            <VideoGrid videos={videos} />
          ) : (
            <p className="text-gray-600">No videos uploaded yet.</p>
          )}
        </main>
      </div>
    </div>
  );
}

export default Channel;