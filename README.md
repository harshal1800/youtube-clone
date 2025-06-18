# youtube-clone


A full-stack YouTube clone built with React, Node.js, Express, MongoDB, and Tailwind CSS, styled to closely resemble the real YouTube website.

## Features
- User authentication (login/signup)
- Video browsing and playback (placeholder with thumbnails)
- Commenting and liking videos
- Channel pages with subscribe/unsubscribe
- Video uploading (title, description, thumbnail)
- Search functionality
- Subscriptions and library pages
- Toast notifications for user actions
- Responsive design mimicking YouTube's UI with Roboto font, red branding, and animations

## Tech Stack
- **Front-End**: React, Vite, Tailwind CSS, React-Toastify
- **Back-End**: Node.js, Express, MongoDB, JWT
- **Database**: MongoDB

## Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/harshal1800/youtube-clone.git

2. Install back-end dependencies:
  cd server
  npm install

3. Install front-end dependencies:

  cd ../client
  npm install

4. Set up environment variables in server/.env:

 MONGO_URI=your-mongodb-uri
JWT_SECRET=your-jwt-secret

5. Run the back-end:

cd server
npm start

6. Run the front-end:

cd client
npm run dev

7. Open http://localhost:5173 in your browser.
License
MIT License

undefined