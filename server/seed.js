const mongoose = require('mongoose');
const Video = require('./models/Video');
const Channel = require('./models/Channel');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB for seeding'))
  .catch((err) => console.error('MongoDB connection error:', err));

const seedData = async () => {
  try {
    // Clear existing data
    await Video.deleteMany();
    await Channel.deleteMany();
    await User.deleteMany();

    // Seed user
    const hashedPassword = await bcrypt.hash('password123', 10);
    const user = new User({
      userId: 'user01',
      username: 'JohnDoe',
      email: 'john@example.com',
      password: hashedPassword,
      avatar: 'https://example.com/avatars/john.jpg',
      channels: ['channel01'],
    });
    await user.save();

    // Seed channel
    const channel = new Channel({
      channelId: 'channel01',
      channelName: 'Code with John',
      owner: 'user01',
      description: 'Coding tutorials and tech reviews by John Doe.',
      channelBanner: 'https://example.com/banners/john_classrooms',
      subscribers: 5200,
      videos: ['video01'],
    });
    await channel.save();

    // Seed video
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

    console.log('Sample data seeded');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding data:', error);
    mongoose.connection.close();
  }
};

seedData();