const express = require("express");
const router = express.Router();

const loginRequired = require("../middleware/loginRequired");
const userController = require("../controller/userController");

router.post('/login', userController.login);
router.post('/register', userController.register);
router.put('/update', loginRequired, userController.update);
router.delete('/delete', loginRequired, userController.delete);

module.exports = router;
