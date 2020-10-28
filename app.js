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
//Se envían todas las expresiones
app.get('/expressions', (req, res, next) => {
  res.send(arrExpressions);
})

//Rutas con parámetros
//Se envia solo una expresión seleccionado por el atributo id
app.get('/expressions/:id', (req, res, next) => {
  const id = req.params.id
  const elemento = getElementById(id, arrExpressions);
  !elemento ? res.status(404).send('no hay expresion para ese id') : res.send(elemento);
})


const PORT = 4000 || process.env.PORT;


app.listen(PORT, () => {
  console.log(`Server is listenning on port ${PORT}`)
})