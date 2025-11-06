//NODE UTILIANDO EXPRESS.js--> CON LOQ EU MONTAREMOS NUESTRAS APIS
const express = require('express')//importando express(lo hemos coopiado de su pagnia)
const cowsay = require("cowsay");

const app = express()//creando servidor
const port = 3000//puerto de pruebas

//Para leer ficheros .env
require('dotenv').config()

//habilitar recepción de objetos de json por mi backend
//parsear el body entrante a json ESTO YA ES UN MIDDLEWARE, es una operacion intermedia
app.use(express.json());

//Middlewares
const error404 = require("./middlewares/error404");

//Morgan
const morgan = require("./middlewares/morgan.js")

// Configuración del logger con Morgan
app.use(morgan(':method :url :status :param[id] - :response-time ms :body'));


// Rutas
const entriesRoutes = require('./routes/entries.routes.js');
const authorsRoutes = require('./routes/authors.routes.js')

//habilitando rutas: GET http://localhost:3000/
app.get('/', (req, response) => {//=(request,response)
  response.send('Hello World!');//datos a enviar
});


//API Rutas habilitadas
app.use('/api/entries',entriesRoutes);
app.use('/api/authors', authorsRoutes);

app.use(error404); //Manejo de rutas no encontradas

//esto se poner para que nuestro server escuche al port
app.listen(port, () => {
  console.log(
    cowsay.say({
      text: `Example app listening on port http://localhost:${port}`,
      f: "owl", // Use the owl ASCII art // owl
    })
  );
});