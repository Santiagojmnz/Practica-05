'use strict'
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

// cargar rutas
var estado_routers = require('./routes/estado');
var localidad_routers = require('./routes/localidad');
var cliente_routers = require('./routes/cliente');
var municipio_routers = require('./routes/municipio');
//Servidor
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//CORS cabecera

app.use(cors());
app.options('*', cors());

//Rutas base
app.use('/api', estado_routers);
app.use('/api', localidad_routers);
app.use('/api', cliente_routers);
app.use('/api', municipio_routers);

module.exports = app;