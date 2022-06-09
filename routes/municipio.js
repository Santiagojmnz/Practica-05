'use strict'
const express = require('express');
const api = express.Router();

const municipioController = require('../controllers/municipioController');

    //Agregar Municipio
    api.post('/municipio', municipioController.add);
    //Mostrar Municipios
    api.get('/municipios', municipioController.getLocalidades);
    //Actualizar Municipio
    api.put('/municipio/:id', municipioController.update);
    //Eliminar Municipio
    api.delete('/municipio/:id', municipioController.delete);

module.exports = api;