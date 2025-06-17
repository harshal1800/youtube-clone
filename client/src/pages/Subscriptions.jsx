import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import VideoGrid from '../components/VideoGrid';

function Subscriptions() {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchSubscriptionVideos = async () => {
      try {
        if (!user) {
          setError('Please log in to view subscriptions');
          return;
        }
        const response = await axios.get(
          `http://localhost:5000/api/subscriptions/videos/${user.userId}`,
          { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
        );
        setVideos(response.data);
      } catch (_err) {
        setError(_err.response?.data?.message || 'Failed to load subscription videos');
      }
    };
    fetchSubscriptionVideos();
  }, [user]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-4">
          <h2 className="text-2xl font-bold mb-4">Subscriptions</h2>
          {error ? (
            <p className="text-red-500">{error}</p>
          ) : videos.length > 0 ? (
            <VideoGrid videos={videos} />
          ) : (
            <p className="text-gray-600">
              {user ? 'No videos from subscribed channels.' : 'Log in to view subscriptions.'}
            </p>
          )}
        </main>
      </div>
    </div>
  );
}

export default Subscriptions;