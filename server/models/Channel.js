const mongoose = require('mongoose');

const channelSchema = new mongoose.Schema({
  channelId: { type: String, required: true, unique: true },
  channelName: { type: String, required: true },
  owner: { type: String, required: true }, // userId of the owner
  description: { type: String },
  channelBanner: { type: String },
  subscribers: { type: Number, default: 0 },
  videos: [{ type: String }], // Array of video IDs
});

module.exports = mongoose.model('Channel', channelSchema);