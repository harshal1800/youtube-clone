import { Link } from 'react-router-dom';

function VideoGrid({ videos }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {videos.map((video) => (
        <Link to={`/video/${video.videoId}`} key={video.videoId}>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={video.thumbnailUrl}
              alt={video.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{video.title}</h3>
              <p className="text-gray-600">{video.uploader}</p>
              <p className="text-gray-500">{video.views} views</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default VideoGrid;