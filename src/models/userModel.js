const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');
const jwt = require("jsonwebtoken");

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

    if (!this.user) return this.errors.push('Usuário não existe');

    if (!bcryptjs.compareSync(this.body.password, this.user.password)) {
      this.user = null;
      return this.errors.push('Senha Inválida');
    }

    const id = this.user._id;
    const email = this.user.email;

    this.user.token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });
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
    if (this.user) {
      if ("" + this.user._id != idToken) {
        this.errors.push('Esse email ja tem dono');
        return;
      }
    }

    const salt = bcryptjs.genSaltSync();
    this.body.password = bcryptjs.hashSync(this.body.password, salt);

    this.user = await UserModel.findByIdAndUpdate(idToken,
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

  async delete() { // Ja foi validado pelo loginRequired
    this.user = await UserModel.deleteMany({ _id: this.body.id});
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

    if(this.body.contact_number) this.validateContactNumber(); // CHECKAR SE TA FUNFANDO ------------------------
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

  validateContactNumber() {
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

module.exports = User;
