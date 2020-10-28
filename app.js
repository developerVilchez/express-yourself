const express = require('express');
const app = express();
const path = require('path');

//Middlewares
app.use(express.static(path.join(__dirname, 'public')))

//Rutas

app.get('/expressions', (req, res, next) => {
  console.log(req)
})



const PORT = 4000 || process.env.PORT;


app.listen(PORT, () => {
  console.log(`Server is listenning on port ${PORT}`)
})