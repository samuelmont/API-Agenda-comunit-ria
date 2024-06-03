require("../models/userModel.js");
const mongoose = require("mongoose");
const Users = mongoose.model("Users");

exports.logUser = async (req, res) => {
    try {
        
        Users.find().lean().then((users) => {
            res.json({ resposta: "Usuarios" })
            console.log('Users:', users)
        });
    } catch (err) {
        res.status(500).json({ message: "Erro." });
    }
};

exports.createUser = async (req, res) => {
    try {
        const { name, email, contact_number, password } = req.body;
        const user = new Users({ name, email, contact_number, password });
        console.log(user);
        await user.save();
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: "Erro." });
    }
};

exports.updateUsers = async (req, res) => {
    try {
        Users.find().lean().then((users) => {
            res.json({ resposta: "Usuarios" })
            console.log('Users:', users)
        });
    } catch (err) {
        res.status(500).json({ message: "Erro." });
    }
};

exports.deleteUsers = async (req, res) => {
    try {
        Users.find().lean().then((users) => {
            res.json({ resposta: "Usuarios" })
            console.log('Users:', users)
        });
    } catch (err) {
        res.status(500).json({ message: "Erro." });
    }
};
