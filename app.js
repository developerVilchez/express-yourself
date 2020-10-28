const express = require('express');
const app = express();
const path = require('path');
const PORT = 4000 || process.env.PORT;

//Metodos uitls para utilizar
const { 
        seedElements, 
        getElementById, 
        updateElement, 
        createElement,
        deleteElementById
      } = require('./utils');

//console.log(createElement('expressions', {name:'teresa', emoji:'=)'}))     
const arrExpressions = [];

// Poblamos la función arrExpressions
seedElements(arrExpressions, 'expressions');

//Middlewares
app.use(express.static(path.join(__dirname, 'public')));

//Rutas
//Se envían todas las expresiones
app.get('/expressions', (req, res, next) => {
  res.send(arrExpressions);
});

//Rutas con parámetros
//Se envia solo una expresión seleccionado por el atributo id
app.get('/expressions/:id', (req, res, next) => {
  const id = req.params.id
  const elemento = getElementById(id, arrExpressions);
  !elemento ? res.status(404).send('no hay expresion para ese id') : res.send(elemento);
});

/*
Esta ruta permitirá actualizar una el nombre o emoji de una expression que ya se 
encuentre en la bd. Por esa razón pedimos como parámetro un valor único por el cual se pueda identificar el recurso a actualizar
*/

app.put('/expressions/:id', (req, res, next) => {
 const id = req.params.id;
 const query = req.query; 
 const expression = getElementById(id, arrExpressions);
 !expression ? res.status(404).send('No existe expresion con ese id') : res.send(updateElement(id, query, arrExpressions));
});

/*
Ruta que me permite crear una nueva expresión utilizando el queryString como herramienta
para los atributos y valores que quiero que tenga el nuevo objeto
*/

app.post('/expressions', (req, res, next) => {
  const query = req.query;
  
  if(query.hasOwnProperty('name') && query.hasOwnProperty('emoji')){
    if(query.name !== '' && query.emoji !== '') {
      const nuevaExpression = createElement('expressions', query);
      arrExpressions.push(nuevaExpression);
      res.status(201).send(nuevaExpression)
    } else {
      res.status(400).send('no se aceptan valores vacios')
    }
  } else {
    res.status(400).send('objeto no valido para crear una nueva expresion')
  }
})

/* 
 ruta que me permite eliminar un elemento de la db, necesito indicar un valor único
 que me permita identifcar que recurso eliminar
*/

app.delete('/expressions/:id', (req, res, next) => {
  const id = req.params.id;
  const elementDelete = deleteElementById(id, arrExpressions);
  if(!elementDelete) {
    res.status(400).send('El elemento a eliminar no existe')
  } else {
    res.status(204).send(elementDelete[0])
  }

})

app.listen(PORT, () => {
  console.log(`Server is listenning on port ${PORT}`)
})