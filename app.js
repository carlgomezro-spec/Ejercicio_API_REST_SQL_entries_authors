//NODE UTILIANDO EXPRESS.js--> CON LOQ EU MONTAREMOS NUESTRAS APIS
//aqui se pone la configuración
const express = require('express')//importando express(lo hemos coopiado de su pagnia)
const cowsay = require("cowsay");

const app = express()//creando servidor
const port = 3000//puerto de pruebas
//habilitar recepción de objetos de json por mi backend
//parsear el body entrante a json
app.use(express.json());

// Rutas
const entriesRoutes = require('./routes/entries.routes.js');

//habilitando rutas: GET http://localhost:3000/
app.get('/', (req, response) => {//=(request,response)
  response.send('Hello World!');//datos a enviar
});


//API Rutas habilitadas
app.use('/api/entries',entriesRoutes);


//esto se poner para que nuestro server escuche al port
app.listen(port, () => {
  console.log(
    cowsay.say({
      text: `Example app listening on port http://localhost:${port}`,
      f: "owl", // Use the owl ASCII art // owl
    })
  );
});