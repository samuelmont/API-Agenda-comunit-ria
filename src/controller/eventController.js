require("../models/eventModel.js");
const mongoose = require("mongoose");
const Events = mongoose.model("Events");

exports.getEvents = async (req, res) => { // Mostra todos eventos
    try {
        Events.find().lean().then((events) => {
            res.json({ resposta: "Eventos" })
            console.log('Eventos:', events)
        });
    } catch (err) {
        res.status(500).json({ message: "Erro." });
    }
};

exports.getEvent = async (req, res) => { // Mostra somente um evento
    try {
        Events.find().lean().then((events) => {
            res.json({ resposta: "Eventos" })
            console.log('Eventos:', events)
        });
    } catch (err) {
        res.status(500).json({ message: "Erro." });
    }
};

exports.createEvent = async (req, res) => { // Mostra somente um evento
    try {
        Events.find().lean().then((events) => {
            res.json({ resposta: "Eventos" })
            console.log('Eventos:', events)
        });
    } catch (err) {
        res.status(500).json({ message: "Erro." });
    }
};

exports.updateEvents = async (req, res) => { // Atualiza evento
    try {
        Events.find().lean().then((events) => {
            res.json({ resposta: "Eventos" })
            console.log('Eventos:', events)
        });
    } catch (err) {
        res.status(500).json({ message: "Erro." });
    }
};

exports.getEvents = async (req, res) => { // Exclui eventos
    try {
        Events.find().lean().then((events) => {
            res.json({ resposta: "Eventos" })
            console.log('Eventos:', events)
        });
    } catch (err) {
        res.status(500).json({ message: "Erro." });
    }
};
