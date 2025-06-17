import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

function VideoPlayer() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [error, setError] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/videos/${id}`);
        setVideo(response.data);
      } catch (_err) {
        setError('Failed to load video');
      }
    };
    fetchVideo();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError('Please log in to comment');
      return;
    }
    try {
      const response = await axios.post(
        'http://localhost:5000/api/comments',
        {
          videoId: id,
          commentId: `comment${Date.now()}`,
          text: commentText,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      setVideo({
        ...video,
        comments: [...video.comments, response.data],
      });
      setCommentText('');
    } catch (_err) {
      setError(_err.response?.data?.message || 'Failed to add comment');
    }
  };

  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;
  if (!video) return <p className="text-gray-500 text-center mt-10">Loading...</p>;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-4">
          <div className="mb-4">
            <h2 className="text-2xl font-bold">{video.title}</h2>
            <p className="text-gray-600">{video.uploader} • {video.views} views</p>
            <div className="w-full h-96 bg-gray-200 flex items-center justify-center">
              <p>Video Player Placeholder (URL: {video.thumbnailUrl})</p>
            </div>
            <p className="mt-2">{video.description}</p>
          </div>
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-4">Comments</h3>
            {user ? (
              <form onSubmit={handleCommentSubmit} className="mb-4">
                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Add a comment..."
                  className="w-full p-2 border rounded-lg"
                  rows="4"
                  required
                />
                <button
                  type="submit"
                  className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Comment
                </button>
              </form>
            ) : (
              <p className="text-gray-600 mb-4">
                <Link to="/login" className="text-blue-600 hover:underline">
                  Log in
                </Link>{' '}
                to add a comment.
              </p>
            )}
            {video.comments.length > 0 ? (
              video.comments.map((comment) => (
                <div key={comment.commentId} className="mb-4 p-4 bg-gray-100 rounded-lg">
                  <p className="text-gray-700">{comment.text}</p>
                  <p className="text-gray-500 text-sm">
                    By {comment.userId} • {new Date(comment.timestamp).toLocaleString()}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No comments yet.</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default VideoPlayer;