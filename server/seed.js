const mongoose = require('mongoose');
const Video = require('./models/Video');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB for seeding'))
  .catch((err) => console.error('MongoDB connection error:', err));

const seedVideos = async () => {
  try {
    await Video.deleteMany(); // Clear existing videos
    await Video.insertMany([
      {
        videoId: 'video01',
        title: 'Learn React in 30 Minutes',
        thumbnailUrl: 'https://example.com/thumbnails/react30min.png',
        description: 'A quick tutorial to get started with React.',
        channelId: 'channel01',
        uploader: 'user01',
        views: 15200,
        likes: 1023,
        dislikes: 45,
        uploadDate: new Date('2024-09-20'),
        comments: [
          {
            commentId: 'comment01',
            userId: 'user02',
            text: 'Great video! Very helpful.',
            timestamp: new Date('2024-09-21T08:30:00Z'),
          },
        ],
      },
    ]);
    console.log('Sample videos seeded');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding data:', error);
    mongoose.connection.close();
  }
};

seedVideos();