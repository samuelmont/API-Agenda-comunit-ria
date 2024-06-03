const express = require('express');
const router = express.Router();
const eventControler = require("../controller/eventController.js");

router.get('/', eventControler.getEvents);
// router.get('/:id', eventControler.getEvent);
// router.post('/create', eventControler.createEvent);
// router.put('/update/:id', eventControler.updateEvents);
// router.delete('/delete/:id', eventControler.deleteEvents);



module.exports = router;