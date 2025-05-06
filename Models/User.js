const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  username: String,
  passwordHash: String
});
module.exports = mongoose.model('User', UserSchema);
