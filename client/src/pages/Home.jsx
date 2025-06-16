import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import VideoGrid from '../components/VideoGrid';
import FilterBar from '../components/FilterBar';

function Home() {
  const [videos, setVideos] = useState([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/videos');
        // Apply filter (simplified, assumes videos have a category field)
        let filteredVideos = response.data;
        if (filter !== 'All') {
          filteredVideos = response.data.filter((video) =>
            video.title.toLowerCase().includes(filter.toLowerCase())
          );
        }
        setVideos(filteredVideos);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };
    fetchVideos();
  }, [filter]);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-4">
          <FilterBar onFilterChange={handleFilterChange} />
          <VideoGrid videos={videos} />
        </main>
      </div>
    </div>
  );
}

export default Home;