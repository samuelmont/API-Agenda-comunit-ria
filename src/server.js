const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('./db.js');
const eventRouter = require('./routes/eventsRoutes.js');
const userRouter = require('./routes/userRoutes.js');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Rotas
app.use('/eventos', eventRouter);
app.use('/usuarios', userRouter);

const PORT = 5001;
app.listen(PORT, () => {
  console.log('Servidor Rodando');
});
