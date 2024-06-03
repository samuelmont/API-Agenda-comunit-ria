const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  contact_number: { type: String, required: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model('Users', UserSchema);