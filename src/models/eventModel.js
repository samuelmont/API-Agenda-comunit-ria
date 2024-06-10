const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  description: { type: String, required: true },
  requisites: { type: String, required: true },
  cep: { type: String, required: true },
  place_number: { type: String, required: true },
  contact_number: { type: String, required: true },
  date: { type: String, required: true },
  quantity_tickets: { type: String, required: true },
  participants: [{ idParticipant: { type: String, required: true, default: "" } }],
  file: { type: String, required: true, default: '' },
  owner_id: { type: String, required: true }
});

EventModel = mongoose.model('Events', EventSchema);

class Event {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.event = null;
  }

  async getAll() {
    this.event = await EventModel.find();
    this.event.forEach((e) => { // Essa rota não terá acesso aos participantes nem ao id do evento
      e.participants = [];
      e.owner_id = "";
    })
    if (!this.event) return this.errors.push('Não existe nenhum evento no momento');
  }

  async getAllMine() {
    this.event = await EventModel.find({ owner_id: this.body.userId });
    if (!this.event) return this.errors.push('Você não possui nenhum evento no momento');
  }

  async getOne() {
    this.event = await EventModel.findById(this.body.id);
    if (!this.event) return this.errors.push('Esse evento não existe');
    this.event.participants = []; // Essa rota não terá acesso aos participantes
    this.event.owner_id = ""; // nem ao id do dono do evento
  }

  async getMyOne() {
    this.event = await EventModel.findById(this.body.id);
    if (!this.event) return this.errors.push('Esse evento não existe');
    if (this.event.owner_id != this.body.userId) return this.errors.push('Esse evento não é seu');
  }

  async enter() {
    this.event = await EventModel.updateOne({ _id: this.body.id }, { $push: { participants: { idParticipant: this.body.userId } } })
    if (!this.event) return this.errors.push('Esse evento não está mais disponivel');
  }

  async create() {
    this.validate();
    if (this.errors.length > 0) return;
    this.event = await EventModel.create({
        name: this.body.name,
        type: this.body.type,
        description: this.body.description,
        requisites: this.body.requisites,
        cep: this.body.cep,
        place_number: this.body.place_number,
        contact_number: this.body.contact_number,
        date: this.body.date,
        quantity_tickets: this.body.quantity_tickets,
        file: this.body.file,
        owner_id: this.body.owner_id
      });
      if (!this.event) return this.errors.push('Erro de conexão');
  }

  async update() {
    this.validate();
    if (this.errors.length > 0) return;
    this.event = await EventModel.findById(this.body.id);
    if (!this.event) return this.errors.push('Esse evento não existe');
    if (this.event.owner_id != this.body.userId) return this.errors.push('Você não pode alterar esse evento')
    this.event = await EventModel.updateOne({ _id: this.body.id },{
        name: this.body.name,
        type: this.body.type,
        description: this.body.description,
        requisites: this.body.requisites,
        cep: this.body.cep,
        place_number: this.body.place_number,
        contact_number: this.body.contact_number,
        date: this.body.date,
        quantity_tickets: this.body.quantity_tickets,
        file: this.body.file,
        participants: this.body.participants
      });
    if (!this.event) return this.errors.push('Erro de conexão');
  }

  async delete() {
    this.event = await EventModel.findById(this.body.id)
    if (!this.event) return this.errors.push('Esse evento não existe');

    if (this.event.owner_id != this.body.userId) return this.errors.push('Você não pode apagar esse evento');

    this.event = await EventModel.deleteMany({ _id: this.body.id });
  }

  validate() {
    this.validateContactNumber(); // valida numero de telefone
    this.validateCep(); // Valida Cep

    if (!this.body.file) return this.errors.push('É obrigatório ter uma imagem');
  }

  validateCep() {
    const cep = this.body.cep.replace(/[\s-]/g, "");
    const isValid = cep.length === 8 && !isNaN(cep);
    if (!isValid) return this.errors.push('Cep invalido');
  }

  validateContactNumber() {
    if (!this.body.contact_number) return this.errors.push('É obrigatório ter telefone');

    const telefone = this.body.contact_number.replace(/\D/g, '');

    if (!(telefone.length >= 10 && telefone.length <= 11))
      return this.errors.push('Telefone invalido');

    if (telefone.length == 11 && parseInt(telefone.substring(2, 3)) != 9)
      return this.errors.push('Telefone invalido');

    for (var n = 0; n < 10; n++) if (telefone == new Array(11).join(n) || telefone == new Array(12).join(n))
      return this.errors.push('Telefone invalido');

    var codigosDDD = [
      11, 12, 13, 14, 15, 16, 17, 18, 19,
      21, 22, 24, 27, 28, 31, 32, 33, 34,
      35, 37, 38, 41, 42, 43, 44, 45, 46,
      47, 48, 49, 51, 53, 54, 55, 61, 62,
      64, 63, 65, 66, 67, 68, 69, 71, 73,
      74, 75, 77, 79, 81, 82, 83, 84, 85,
      86, 87, 88, 89, 91, 92, 93, 94, 95,
      96, 97, 98, 99
    ];

    if (codigosDDD.indexOf(parseInt(telefone.substring(0, 2))) == -1)
      return this.errors.push('Telefone invalido');

    if (new Date().getFullYear() < 2017) return this.errors.push('Telefone invalido');

    if (telefone.length == 10 && [2, 3, 4, 5, 7].indexOf(parseInt(telefone.substring(2, 3))) == -1)
      return this.errors.push('Telefone invalido');

    return true;
  }
}

module.exports = Event;
