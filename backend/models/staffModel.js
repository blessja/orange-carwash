const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const staffSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  carwash: { type: Schema.Types.ObjectId, ref: 'Carwash', required: true },
  users: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

const Staff = mongoose.model('Staff', staffSchema);

module.exports = Staff;
