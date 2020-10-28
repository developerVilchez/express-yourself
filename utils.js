let expressionIdCounter = 0; // 😀, 😎, 😴
let animalIdCounter = 0;  // 🐶, 🐍, 🐱


// Array de objetos [{'id': 1 , 'emoji': 😀, 'name'  : happy}]
const getElementById = (id, elementList) => {
  return elementList.find((element) => {
    return element.id === Number(id);
  });
};

// Obtienes la posicion de un elementos en un array dado la propiedad id 
const getIndexById = (id, elementList) => {
  return elementList.findIndex((element) => {
    return element.id === Number(id);
  });
};

/*
  Para crear tienes que enviar el emoji y el name sino no se crea
  el id se autogenera a través de un contador
  Crear un objeto tipo expressions o animals, se asegura que se envíe 
  {id: 1, emoji: '=)', name: 'happy'}

*/

const createElement = (elementType, queryArguments) => {
  if (queryArguments.hasOwnProperty('emoji') &&
      queryArguments.hasOwnProperty('name')) {
    let currentId;
    if (elementType === 'expressions') {
      expressionIdCounter += 1;
      currentId = expressionIdCounter;
    } else {
      animalIdCounter += 1;
      currentId = animalIdCounter;
    }
    return {
      'id':    currentId,
      'emoji': queryArguments.emoji,
      'name':  queryArguments.name,
    };
  } else {
    return false;
  }
};

/* 
  Para actualizar, necesitamos saber que elemento del array quiero modificar
  y los nuevos valores que quiero que tome ese elemento en el array
*/
const updateElement = (id, queryArguments, elementList) => {
  const elementIndex = getIndexById(id, elementList);

  if (elementIndex === -1) {
    throw new Error('updateElement must be called with a valid id parameter');
  }
  if (!queryArguments.id) {
    queryArguments.id = Number(id);
  }
  //Aquí se usa object.assing para fusionar el objeto del array original con 
  //el objeto que viene de entrada en queryArguments
  //se modifica el array original.
  Object.assign(elementList[elementIndex], queryArguments);
  
  //retorna el objeto modificado
  return elementList[elementIndex];
};


//Cargar elementos
const seedElements = (arr, type) => {
  if (type === 'expressions') {
    arr.push(createElement('expressions', {'emoji': '😀', 'name': 'happy'}));
    arr.push(createElement('expressions', {'emoji': '😎', 'name': 'shades'}));
    arr.push(createElement('expressions', {'emoji': '😴', 'name': 'sleepy'}));
  } else if (type === 'animals') {
    arr.push(createElement('animals', {'emoji': '🐶', 'name': 'Pupper'}));
    arr.push(createElement('animals', {'emoji': '🐍', 'name': 'Snek'}));
    arr.push(createElement('animals', {'emoji': '🐱', 'name': 'Maru'}));
  } else {
    throw new Error(`seed type must be either 'expression' or 'animal'`);
  }
  return arr;
};

const deleteElementById = (id, elementList) => {
  const index = getIndexById(id, elementList);
  if(index === -1) {
    return false;
  } else {
    return elementList.splice(index,1);
  }
}

module.exports = {
  createElement: createElement,
  getIndexById: getIndexById,
  getElementById: getElementById,
  updateElement: updateElement,
  seedElements: seedElements,
  deleteElementById : deleteElementById
};
