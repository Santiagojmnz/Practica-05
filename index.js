'use strict'
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes/localidad');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/practica-05', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


//Habilitar Body-Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Habilitar cors
app.use(cors());

app.use('/', routes());


//Servicio y puerto de ejecucion
app.listen(5000, function() {

    console.log('servidor en ejecucion')
});