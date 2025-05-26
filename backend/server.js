// // Import Core Dependencies
// const express = require('express');
// const cors = require('cors');
// const mongoose = require('mongoose');
// require('dotenv').config();
// const cookieParser = require('cookie-parser');
// const path = require('path');
// const authMiddleware = require('./middleware/authMiddleware');


// // App Initialization
// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(cors({
//   origin: 'http://127.0.0.1:5500',  // <-- Your frontend URL here (make sure to match exactly)
//   credentials: true                 // <-- Allow cookies and credentials
// }));
// app.use(express.json()); // for parsing application/json
// app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
// app.use(cookieParser()); // for parsing cookies

// // MongoDB Connection
// const MONGO_URI = process.env.MONGO_URI;
// if (!MONGO_URI) {
//   console.error("❌ MONGO_URI not defined in .env");
//   process.exit(1);
// }

// mongoose.connect(MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
// .then(() => console.log("✅ MongoDB Atlas connected"))
// .catch((err) => {
//   console.error("❌ MongoDB connection error:", err);
//   process.exit(1); // Optional: exit if connection fails
// });

// // Routes
// app.get('/', (req, res) => {
//   res.send("🌿 Backend working for Sustainability_Matters");
// });

// // Auth Routes
// const authRoutes = require('./routes/auth');
// app.use('/api/auth', authRoutes);

// // Serve static files from public folder but block direct access to goal.html and approach.html
// app.use(express.static(path.join(__dirname, 'public'), {
//   index: 'index.html',
//   setHeaders: (res, filePath) => {
//     if (
//       filePath.endsWith('goal.html') ||
//       filePath.endsWith('approach.html')
//     ) {
//       // Block direct access to these files
//       res.status(403).end('Forbidden');
//     }
//   }
// }));

// // Protect /goal and /approach routes with authMiddleware and serve corresponding files
// app.get('/goal', authMiddleware, (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'goal.html'));
// });

// app.get('/approach', authMiddleware, (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'approach.html'));
// });

// // Start Server
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
// });

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

// Middleware
app.use(cors({
  origin: 'http://127.0.0.1:5500',  // <-- Your frontend URL here (make sure to match exactly)
  credentials: true                 // <-- Allow cookies and credentials
}));
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser()); // for parsing cookies

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

// Serve register.html at root /
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

// Auth Routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Serve static files from public folder but block direct access to goal.html and approach.html
app.use(express.static(path.join(__dirname, 'public'), {
  index: 'index.html',
  setHeaders: (res, filePath) => {
    if (
      filePath.endsWith('goal.html') ||
      filePath.endsWith('approach.html')
    ) {
      // Block direct access to these files
      res.status(403).end('Forbidden');
    }
  }
}));

// Protect /goal and /approach routes with authMiddleware and serve corresponding files
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
