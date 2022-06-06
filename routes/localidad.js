'use strict'
const express = require('express');
const router = express.Router();

const localidadController = require('../controllers/localidadController');

module.exports = function() {
    //Agregar Localidad
    router.post('/localidad', localidadController.add);
    //Mostrar Localidades
    router.get('/localidad', localidadController.list);
    //Mostrar Localidades con municipio
    router.get('/localidadMunicipio', localidadController.GetMunicipio);
    //Mostrar Localidad por id
    router.get('/localidad/:id', localidadController.show);
    //Actualizar Localidad
    router.put('/localidad/:id', localidadController.update);
    //Eliminar Localidad
    router.delete('/localidad/:id', localidadController.delete);




    return router;

};