import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import VideoPlayer from './pages/VideoPlayer';
import Channel from './pages/Channel';
import Upload from './pages/Upload';
import SearchResults from './pages/SearchResults';
import Subscriptions from './pages/Subscriptions';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/video/:id" element={<VideoPlayer />} />
        <Route path="/channel/:userId" element={<Channel />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/subscriptions" element={<Subscriptions />} />
      </Routes>
    </Router>
  );
}

export default App;