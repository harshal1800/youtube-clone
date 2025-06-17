import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import VideoGrid from '../components/VideoGrid';

function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/videos/search?q=${encodeURIComponent(query)}`);
        setVideos(response.data);
      } catch (_err) {
        setError('Failed to load search results');
      }
    };
    if (query) {
      fetchSearchResults();
    }
  }, [query]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-4">
          <h2 className="text-2xl font-bold mb-4">Search Results for "{query}"</h2>
          {error ? (
            <p className="text-red-500">{error}</p>
          ) : videos.length > 0 ? (
            <VideoGrid videos={videos} />
          ) : (
            <p className="text-gray-600">No videos found.</p>
          )}
        </main>
      </div>
    </div>
  );
}

export default SearchResults;