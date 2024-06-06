require('dotenv').config();
require('./db.js');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const userRouter = require('./src/routes/userRoutes.js');
const eventRouter = require('./src/routes/eventsRoutes.js');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Rotas
app.use('/login', userRouter);
app.use('/events', eventRouter);

app.listen(process.env.APP_PORT , () => {
  console.log('Servidor Rodando');
});
