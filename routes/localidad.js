'use strict'
const express = require('express');
let api = express.Router();

const localidadController = require('../controllers/localidadController');


    //Agregar Localidad
    api.post('/localidad', localidadController.add);
    //Mostrar Localidades
    api.get('/localidad', localidadController.list);
    //Actualizar Localidad
    api.put('/localidad/:id', localidadController.update);
    //Eliminar Localidad
    api.delete('/localidad/:id', localidadController.delete);

module.exports = api;