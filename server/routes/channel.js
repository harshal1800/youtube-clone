const express = require('express');
const Channel = require('../models/Channel');
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

// Create a new channel (protected)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { channelId, channelName, description, channelBanner } = req.body;
    const userId = req.user.userId;

    // Check if channel ID already exists
    const existingChannel = await Channel.findOne({ channelId });
    if (existingChannel) {
      return res.status(400).json({ message: 'Channel ID already exists' });
    }

    // Create new channel
    const channel = new Channel({
      channelId,
      channelName,
      owner: userId,
      description,
      channelBanner,
      subscribers: 0,
      videos: [],
    });

    await channel.save();

    // Add channel to user's channels array
    await User.findOneAndUpdate(
      { userId },
      { $push: { channels: channelId } }
    );

    res.status(201).json(channel);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get channel details by ID
router.get('/:id', async (req, res) => {
  try {
    const channel = await Channel.findOne({ channelId: req.params.id });
    if (!channel) {
      return res.status(404).json({ message: 'Channel not found' });
    }
    res.json(channel);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;