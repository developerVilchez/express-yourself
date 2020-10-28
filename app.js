const express = require('express');
const app = express();
const path = require('path');
const { seedElements, getElementById} = require('./utils');

const arrExpressions = [];
// Poblamos la función arrExpressions
seedElements(arrExpressions, 'expressions');



//Middlewares
app.use(express.static(path.join(__dirname, 'public')))

//Rutas
app.get('/expressions', (req, res, next) => {
  res.send(arrExpressions);
})

//Rutas con parámetros
app.get('/expressions/:id/:name', (req, res, next) => {
  console.log(req.params)
})


const PORT = 4000 || process.env.PORT;


app.listen(PORT, () => {
  console.log(`Server is listenning on port ${PORT}`)
})