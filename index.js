const express = require('express');
const cors = require('cors')
const { dbConnection } = require('./database/config');
require('dotenv').config();

// console.log( process.env )


// crear el servidor de express

const app = express();

// Base de Datos
dbConnection();

// CORS

app.use(cors());

// Directorio Publico

app.use( express.static('public'))

// Lectura Body

app.use( express.json() );

// rutas

// tODO auth // crear, login, renew
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

// TODO CRUD: eventos



// escuchar peticiones

app.listen(process.env.PORT, () => {
    console.log(`Servidor Corriendo en puerto ${ process.env.PORT }` )
});