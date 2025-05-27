// Import Core Dependencies
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const path = require('path');
const authMiddleware = require('./middleware/authMiddleware');

// App Initialization
const app = express();
const PORT = process.env.PORT || 5000;

// Allowed origins for CORS
const allowedOrigins = [
  'https://sustainability-matters-1.onrender.com',
  'http://localhost:3000', // for local dev (optional)
];

// Middleware
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  console.error("❌ MONGO_URI not defined in .env");
  process.exit(1);
}

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Atlas connected"))
.catch((err) => {
  console.error("❌ MongoDB connection error:", err);
  process.exit(1);
});

// Routes
app.get('/', (req, res) => {
  res.send("🌿 Backend working for Sustainability_Matters");
});

// Added this to handle any unexpected POST requests to "/"
app.post('/', (req, res) => {
  res.json({ message: 'POST to root route received — this is a fallback response.' });
});

// Auth Routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Serve static files (except goal.html and approach.html)
app.use(express.static(path.join(__dirname, 'public'), {
  index: 'index.html',
  setHeaders: (res, filePath) => {
    if (
      filePath.endsWith('goal.html') ||
      filePath.endsWith('approach.html')
    ) {
      res.status(403).end('Forbidden');
    }
  }
}));

// Protected Routes
app.get('/goal', authMiddleware, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'goal.html'));
});

app.get('/approach', authMiddleware, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'approach.html'));
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
