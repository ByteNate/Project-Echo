const mongoose = require('mongoose');

const pairingSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Pairing = mongoose.model('Pairing', pairingSchema);

module.exports = Pairing;