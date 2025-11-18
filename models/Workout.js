const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: [true, 'Exercise name is required']
  },
  duration: {
    type: String,
    required: [true, 'Duration is required']
  },
  status: {
    type: String,
    default: "pending"
  },
  dateAdded: {
    type: Date,
    default: Date.now
  }
}, { timestamps: false });

module.exports = mongoose.model('Workout', workoutSchema);
