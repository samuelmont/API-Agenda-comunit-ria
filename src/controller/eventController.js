const mongoose = require("mongoose");
require("../models/eventModel.js");
const Events = mongoose.model("Events");

exports.getEvents = async (req, res) => {
    try {
        Events.find().lean().then((events) => {
            res.json({ resposta: "Olá Mundo" })
            console.log('Eventos:', events)
        });
    } catch (err) {
        res.status(500).json({ message: "Erro ao salvar a imagem." });
    }
};

