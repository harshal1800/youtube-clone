const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  commentId: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  text: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const videoSchema = new mongoose.Schema({
  videoId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  thumbnailUrl: { type: String, required: true },
  description: { type: String },
  channelId: { type: String, required: true },
  uploader: { type: String, required: true },
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  uploadDate: { type: Date, default: Date.now },
  comments: [commentSchema],
});

module.exports = mongoose.model('Video', videoSchema);