const express = require('express');
const app = express();
const path = require('path');
const PORT = 4000 || process.env.PORT;

//Metodos uitls para utilizar
const { seedElements, getElementById, updateElement} = require('./utils');

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

/*

Esta ruta permitirá actualizar una el nombre o emoji de una expression que ya se 
encuentre en la bd. Por esa razón pedimos como parámetro un valor único por el cual se pueda identificar el recurso a actualizar
*/
app.put('/expressions/:id', (req, res, next) => {
 const id = req.params.id;
 const query = req.query; 
 const expression = getElementById(id, arrExpressions);
 !expression ? res.status(404).send('No existe expresion con ese id') : res.send(updateElement(id, query, arrExpressions))
})



app.listen(PORT, () => {
  console.log(`Server is listenning on port ${PORT}`)
})