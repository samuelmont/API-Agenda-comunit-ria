const express = require('express');
const router = express.Router();
const eventControler = require("../controller/eventController.js");

router.get('/', eventControler.getEvents);

module.exports = router;