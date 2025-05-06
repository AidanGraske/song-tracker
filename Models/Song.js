const mongoose = require('mongoose');
const SongSchema = new mongoose.Schema({
  title: String,
  artist: String,
  genre: String,
  recommended: [mongoose.Schema.Types.ObjectId]
});
module.exports = mongoose.model('Song', SongSchema);
