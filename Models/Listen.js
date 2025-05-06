const mongoose = require('mongoose');
const ListenSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  songId: mongoose.Schema.Types.ObjectId,
  playCount: { type: Number, default: 1 }
});
module.exports = mongoose.model('Listen', ListenSchema);
