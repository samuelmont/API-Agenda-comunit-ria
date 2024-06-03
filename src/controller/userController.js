const mongoose = require("mongoose");
require("../models/userModel.js");
const Users = mongoose.model("Users");

exports.getUsers = async (req, res) => {
    try {
        Users.find().lean().then((users) => {
            res.json({ resposta: "Olá Mundo" })
            console.log('Users:', users)
        });
    } catch (err) {
        res.status(500).json({ message: "Erro ao salvar a imagem." });
    }
};