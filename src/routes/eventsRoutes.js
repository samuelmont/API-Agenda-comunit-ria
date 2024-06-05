const express = require('express');
const router = express.Router();

const loginRequired = require("../middleware/loginRequired");
const eventController = require("../controller/eventController.js");

router.get('/', eventController.getEvents); // Pegar todos eventos
// router.get('/:id', eventControler.getEvent); // Pegar um evento
// router.post('/enter', loginRequired, eventControler.enterEvent); //  Entrar em um evento
router.post('/create', loginRequired, eventController.createEvent); // Criar evento
// router.put('/update', loginRequired, eventControler.updateEvents); // Atualizar evento
// router.delete('/delete', loginRequired, eventControler.deleteEvents); // Excluir evento

module.exports = router;
