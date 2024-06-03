const express = require('express');
const router = express.Router();
const userControler = require("../controller/userController.js");

// router.get('/login', userControler.logUser);
router.post('/signin', userControler.createUser);
// router.get('/update', userControler.updateUser);
// router.get('/delete', userControler.deleteUser);

module.exports = router;