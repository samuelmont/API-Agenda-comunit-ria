const express = require('express');
const router = express.Router();
const userControler = require("../controller/userController.js");

router.get('/', userControler.getUsers);

module.exports = router;