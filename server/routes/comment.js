const express = require('express');
const Video = require('../models/Video');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

// Add a comment to a video (protected)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { videoId, commentId, text } = req.body;
    const userId = req.user.userId;

    // Find the video
    const video = await Video.findOne({ videoId });
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    // Add comment to video
    const comment = {
      commentId,
      userId,
      text,
      timestamp: new Date(),
    };

    video.comments.push(comment);
    await video.save();

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get comments for a video
router.get('/:videoId', async (req, res) => {
  try {
    const video = await Video.findOne({ videoId: req.params.videoId });
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }
    res.json(video.comments);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;