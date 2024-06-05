require("../models/eventModel.js");
const e = require("express");
const Event = require("../models/eventModel");
const User = require('../models/userModel');

exports.getAll = async (req, res) => { // Mostra todos eventos
  try {
    const events = new Event();
    await events.getAll();

    if (events.errors.length > 0) return res.status(401).json({ errors: events.errors });

    console.log("Mostrou todos");
    return res.status(200).json({ events: events.event });
  } catch (e) {
    return res.status(400).json({ errors: [e] });
  }
};

exports.getAllMine = async (req, res) => { // Mostra todos eventos próprios
  try {
    req.body.userId = req.userId;
    const events = new Event(req.body);
    await events.getAllMine();

    if (events.errors.length > 0) return res.status(401).json({ errors: events.errors });

    console.log("Mostrou todos os meus");
    return res.status(200).json({ events: events.event });
  } catch (e) {
    return res.status(400).json({ errors: [e] });
  }
};

exports.getOne = async (req, res) => { // Mostra somente um evento
  try {
    const events = new Event(req.body);
    await events.getOne();

    if (events.errors.length > 0) return res.status(401).json({ errors: events.errors });

    console.log("Mostrou um");
    return res.status(201).json({ events: events.event });
  } catch (e) {
    return res.status(500).json({ errors: [e] });
  }
};

exports.getMyOne = async (req, res) => { // Mostra somente um evento próprio
  try {
    req.body.userId = req.userId;
    const events = new Event(req.body);
    await events.getMyOne();

    if (events.errors.length > 0) return res.status(401).json({ errors: events.errors });

    console.log("Mostrou um meu");
    return res.status(201).json({ events: events.event });
  } catch (e) {
    return res.status(500).json({ errors: [e] });
  }
};

exports.enter = async (req, res) => { // Entra no evento
  try {
    req.body.userId = req.userId;
    const events = new Event(req.body);
    await events.enter();

    if (events.errors.length > 0) return res.status(401).json({ errors: events.errors });

    console.log("Entrou");
    return res.status(201).json({ events: events.event });
  } catch (e) {
    return res.status(500).json({ errors: [e] });
  }
};

exports.create = async (req, res) => { // Cria evento
  try {
    req.body.owner_id = req.userId;
    const events = new Event(req.body);
    await events.create();

    if (events.errors.length > 0) return res.status(401).json({ errors: events.errors });

    console.log("Criou");
    return res.status(201).json({ events: events.event });
  } catch (e) {
    return res.status(500).json({ errors: [e] });
  }
};

exports.update = async (req, res) => { // Atualiza evento
  try {
    req.body.userId = req.userId;
    const events = new Event(req.body);
    await events.update();

    if (events.errors.length > 0) return res.status(401).json({ errors: events.errors });

    console.log("Atualizou");
    return res.status(201).json({ events: events.event });
  } catch (e) {
    return res.status(500).json({ errors: ["e"] });
  }
};

exports.delete = async (req, res) => { // Apaga evento
  try {
    req.body.userId = req.userId;
    const events = new Event(req.body);
    await events.delete();

    if (events.errors.length > 0) return res.status(401).json({ errors: events.errors });

    console.log("Apagou");
    return res.status(201).json({ events: events.event });
  } catch (e) {
    return res.status(500).json({ errors: [e] });
  }
};
