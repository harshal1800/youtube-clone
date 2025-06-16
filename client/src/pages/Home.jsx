import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import VideoGrid from '../components/VideoGrid';

function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-4">
          <VideoGrid />
        </main>
      </div>
    </div>
  );
}

export default Home;