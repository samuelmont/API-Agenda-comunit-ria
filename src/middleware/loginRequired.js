const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const loginRequired = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({
      errors: ['Login required'],
    });
  }
  const [, token] = authorization.split(' ');

  try {
    const dados = jwt.verify(token, process.env.TOKEN_SECRET);
    const { id, email } = dados;

    const user = new User({ id: id , email: email});
    await user.loginRequired();

    if (user.errors.length > 0) return res.status(401).json({ errors: user.errors }); // Retorna os erros

    req.userId = id;
    req.userEmail = email;
    return next();
    } catch (e) {
    return res.status(401).json({
      errors: ['Token expirado ou inválido.'],
    });
  }
};

module.exports = loginRequired;
