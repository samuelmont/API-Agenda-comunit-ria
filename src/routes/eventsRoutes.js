const express = require('express');
const router = express.Router();

const upload = require("../middleware/upload");
const loginRequired = require("../middleware/loginRequired");

const eventController = require("../controller/eventController.js");

router.get('/', eventController.getAll);                                                                // Pega todos
router.post('/one', eventController.getOne);                                                            // Pega um
router.post('/onemine', loginRequired, eventController.getMyOne);                                       // Pega um próprio
router.post('/allmine', loginRequired, eventController.getAllMine);                                     // Pega todos próprios
router.post('/enter', loginRequired, eventController.enter);                                            // Entras
router.post('/create', loginRequired, upload.single('file'), eventController.create);                   // Cria
router.put('/update', loginRequired, upload.single('file'), eventController.update);                    // Atualiza
router.delete('/delete', loginRequired, eventController.delete);                                        // Apaga

module.exports = router;
