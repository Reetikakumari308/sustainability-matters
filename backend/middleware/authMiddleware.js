// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    // No token — redirect to register with original URL as redirect param
    return res.redirect(`/register.html?redirect=${encodeURIComponent(req.originalUrl)}`);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    // Invalid token — redirect to register
    return res.redirect(`/register.html?redirect=${encodeURIComponent(req.originalUrl)}`);
  }
};

module.exports = authMiddleware;

// const jwt = require('jsonwebtoken');

// const authMiddleware = (req, res, next) => {
//   const token = req.cookies?.token;

//   if (!token) {
//     const redirectPath = req.originalUrl;
//     return res.redirect(`/frontend/register.html?redirect=${encodeURIComponent(redirectPath)}`);
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (err) {
//     const redirectPath = req.originalUrl;
//     return res.redirect(`/frontend/register.html?redirect=${encodeURIComponent(redirectPath)}`);
//   }
// };

// module.exports = authMiddleware;
