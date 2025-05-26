const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true, 
    trim: true 
  },
  password: { 
    type: String, 
    required: true 
  }
}, { timestamps: true }); // adds createdAt and updatedAt

module.exports = mongoose.model('User', userSchema);
