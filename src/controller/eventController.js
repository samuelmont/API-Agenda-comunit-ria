require("../models/eventModel.js");
const Event = require("../models/eventModel");

exports.getEvents = async (req, res) => { // Mostra todos eventos
  try {
    const events = new Event();
    await events.getEvents();

    return res.status(200).json({ events: events.event });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ errors: [e] });
  }
};

// exports.getEvent = async (req, res) => { // Mostra somente um evento
//     try {
//         Events.find().lean().then((events) => {
//             res.json({ resposta: "Eventos" })
//             console.log('Eventos:', events)
//         });
//     } catch (err) {
//         res.status(500).json({ message: "Erro." });
//     }
// };

exports.createEvent = async (req, res) => { // Mostra somente um evento
  try {
    req.body.owner_id = req.userId;
    console.log(req.body);
    const events = new Event(req.body);
    await events.create();
    console.log("aqui")
    return res.status(201).json({ events: events.event });
  } catch (err) {
    res.status(500).json({ message: "Erro." });
  }
};

// exports.updateEvents = async (req, res) => { // Atualiza evento
//     try {
//         Events.find().lean().then((events) => {
//             res.json({ resposta: "Eventos" })
//             console.log('Eventos:', events)
//         });
//     } catch (err) {
//         res.status(500).json({ message: "Erro." });
//     }
// };

// exports.getEvents = async (req, res) => { // Exclui eventos
//     try {
//         Events.find().lean().then((events) => {
//             res.json({ resposta: "Eventos" })
//             console.log('Eventos:', events)
//         });
//     } catch (err) {
//         res.status(500).json({ message: "Erro." });
//     }
// };
