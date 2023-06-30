const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const staffSchema = new Schema({
  phone: { type: String, required: true },
  password: { type: String, required: true },
  carwash: { type: Schema.Types.ObjectId, ref: 'Carwash', required: false },
  users: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

const Staff = mongoose.model('Staff', staffSchema);

module.exports = Staff;