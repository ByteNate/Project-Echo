const mongoose = require('mongoose');

const substituteSchema = new mongoose.Schema({
  ta: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  classSchedule: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ClassSchedule',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Substitute = mongoose.model('Substitute', substituteSchema);

module.exports = Substitute;