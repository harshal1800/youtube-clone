const express = require('express');
const Video = require('../models/Video');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

// Get all videos (for homepage)
router.get('/', async (req, res) => {
  try {
    const videos = await Video.find();
    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get a single video by ID (for video player page)
router.get('/:id', async (req, res) => {
  try {
    const video = await Video.findOne({ videoId: req.params.id });
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }
    res.json(video);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update a video (protected, only by uploader)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const video = await Video.findOne({ videoId: req.params.id });
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }
    if (video.uploader !== req.user.userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    const updatedVideo = await Video.findOneAndUpdate(
      { videoId: req.params.id },
      { $set: req.body },
      { new: true }
    );
    res.json(updatedVideo);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete a video (protected, only by uploader)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const video = await Video.findOne({ videoId: req.params.id });
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }
    if (video.uploader !== req.user.userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    await Video.deleteOne({ videoId: req.params.id });
    res.json({ message: 'Video deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;