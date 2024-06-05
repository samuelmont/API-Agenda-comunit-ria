const express = require("express");
const router = express.Router();

const loginRequired = require("../middleware/loginRequired");
const userController = require("../controller/userController");

router.post('/login', userController.login);                      // Entra
router.post('/register', userController.register);                // Cadastra
router.put('/update', loginRequired, userController.update);      // Atualiza
router.delete('/delete', loginRequired, userController.delete);   // Apaga

module.exports = router;
