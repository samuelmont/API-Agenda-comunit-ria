require("../models/userModel.js");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.login = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.login();

    if (user.errors.length > 0) {
      res.status(401).json({ errors: user.errors }); // mostra o erro
      return;
    }

    const id = user.user._id;
    const email = user.user.email;

    const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });
    console.log("Entrou");
    return res.status(201).json({ token: token });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ errors: [e] });
  }
};

exports.register = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.register();

    if (user.errors.length > 0) {
      res.status(401).json({ errors: user.errors }); // Retorna os erros
      return;
    }
    console.log("Resgitrou");
    return res.status(201).json({ success: 'Conta cadastrada com sucesso' }); // Cadastrou
  } catch (e) {
    console.log(e);
    return res.status(400).json({ errors: [e] });
  }
};

exports.update = async (req, res) => {
  try {
    req.body.idToken = req.userId;

    const user = new User(req.body);
    await user.update();

    if (user.errors.length > 0) {
      res.status(401).json({ errors: user.errors }); // Retorna os erros
      return;
    }
    console.log("Atualizou");
    return res.json({ success: "Dados atualizados com sucesso" });
  } catch (e) {
    return res.status(400).json({ errors: [e] });
  }
};

exports.delete = async (req, res) => {
  try {
    const user = new User(req.userId);
    await user.delete();

    if (user.errors.length > 0) {
      res.status(401).json({ errors: user.errors }); // mostra o erro
      return;
    }
    console.log("Excluiu");
    return res.status(200).json({ success: "Conta excluida com sucesso"});
  } catch (e) {
    return res.status(400).json({ errors: [e] });
  }
};
