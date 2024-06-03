const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true} ,
  description: { type: String, required: true },
  requisites: { type: String, required: true },
  quantity_ticket: { type: Number, required: true },
  cep: { type: Number, required: true },
  place_number: { type: Number, require: true },
  date: { type: Date, require: true },
  contact_number: { type: Number, require: true }
});

mongoose.model('Events', EventSchema);