const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  description: { type: String, required: true },
  requisites: { type: String, required: true },
  cep: { type: String, required: true },
  place_number: { type: String, require: true },
  contact_number: { type: String, require: true },
  date: { type: String, require: true },
  quantity_tickets: { type: String, required: true },
  participants: [{
    id: { type: String, require: true },
    name: { type: String, required: true },
    contact_number: { type: String, required: true }
  }],
  owner_id: { type: String, required: true }
});

EventModel = mongoose.model('Events', EventSchema);

class User {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.event = null;
  }

  async getEvents() {
    this.event = await UserModel.find();
  }

  async create() {
    // console.log(this.body);
    this.event = await UserModel.create(this.body);
    console.log(this.event);

  }

  // async update() {
  //   const idToken = JSON.parse(JSON.stringify(this.body.tokenParams[0]));
  //   const emailToken = "" + JSON.parse(JSON.stringify(this.body.tokenParams[1]));

  //   this.validate();

  //   if (this.errors.length > 0) return;

  //   this.user = await UserModel.findOne({ email: this.body.email });
  //   if(this.user) {
  //     if ("" + this.user._id != idToken) {
  //       this.errors.push('Esse email ja tem dono');
  //     }
  //   }

  //   if (this.errors.length > 0) return;

  //   const salt = bcryptjs.genSaltSync();
  //   this.body.password = bcryptjs.hashSync(this.body.password, salt);

  //   this.user = await UserModel.findByIdAndUpdate( idToken,
  //     {
  //       nome: this.body.nome,
  //       email: this.body.email,
  //       password: this.body.password,
  //       contact_number: this.body.contact_number
  //     });

  //   if (!this.user) {
  //     this.errors.push('Usuário não existe');
  //     return;
  //   }
  // }

  // async delete() {
  //   this.user = await UserModel.deleteMany(this.body.id);
  // }

  // async checkById() {
  //   this.user = await UserModel.findById(this.body.id);
  //   if (!this.user) this.errors.push('Esse usuário não existe');
  // }

  // async userExists() {
  //   this.user = await UserModel.findOne({ email: this.body.email });
  //   if (this.user) this.errors.push('Esse email já foi utilizado');
  // }
}

module.exports = User;
