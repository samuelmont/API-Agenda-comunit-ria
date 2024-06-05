const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  contact_number: { type: String, required: false, default: "" }
});

UserModel = mongoose.model('Users', UserSchema);

class User {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.user = null;
  }

  async login() {
    this.validate();
    if (this.errors.length > 0) return;
    this.user = await UserModel.findOne({ email: this.body.email });

    if (!this.user) {
      this.errors.push('Usuário não existe');
      return;
    }

    if (!bcryptjs.compareSync(this.body.password, this.user.password)) {
      this.errors.push('Senha Inválida');
      this.user = null;
      return;
    }
  }

  async register() {
    this.validate();
    if (this.errors.length > 0) return;   // retorna se o tamanho do erro for maior que 0

    await this.userExists();

    if (this.errors.length > 0) return;

    const salt = bcryptjs.genSaltSync();
    this.body.password = bcryptjs.hashSync(this.body.password, salt);

    this.user = await UserModel.create(this.body);
  }

  async update() {
    const idToken = JSON.parse(JSON.stringify(this.body.idToken));

    this.validate();

    if (this.errors.length > 0) return;

    this.user = await UserModel.findOne({ email: this.body.email });
    if(this.user) {
      if ("" + this.user._id != idToken) {
        this.errors.push('Esse email ja tem dono');
      }
    }

    if (this.errors.length > 0) return;

    const salt = bcryptjs.genSaltSync();
    this.body.password = bcryptjs.hashSync(this.body.password, salt);

    this.user = await UserModel.findByIdAndUpdate( idToken,
      {
        nome: this.body.nome,
        email: this.body.email,
        password: this.body.password,
        contact_number: this.body.contact_number
      });

    if (!this.user) {
      this.errors.push('Usuário não existe');
      return;
    }
  }

  async delete() {
    this.user = await UserModel.deleteMany(this.body.id);
  }

  async checkById() {
    this.user = await UserModel.findById(this.body.id);
    if (!this.user) this.errors.push('Esse usuário não existe');
  }

  async userExists() {
    this.user = await UserModel.findOne({ email: this.body.email });
    if (this.user) this.errors.push('Esse email já foi utilizado');
  }

  validate() {
    this.cleanUp();

    // Validação
    // O e-mail precisa ser valido
    if (!validator.isEmail(this.body.email)) this.errors.push('E-mail inválido');
    // A senha precisa ter entre 3 e 50 caracteres
    if (this.body.password.length < 3 || this.body.password.length > 50) {
      this.errors.push('A senha precisa ter entre 3 e 50 caracteres');
    }
  }

  cleanUp() { // Se não for string ele deixa ele vazio
    for (const key in this.body) {
      if (typeof this.body[key] !== 'string') {
        this.body[key] = '';
      }
    }

    this.body = {
      email: this.body.email,
      password: this.body.password,
      name: this.body.name,
      contact_number: this.body.contact_number ? this.body.contact_number : ""
    };
  }
}

module.exports = User;
