'use strict'
var express = require('express');
var estadoController = require('../controllers/estadoController');
const estado = require('../models/estado');
var api = express.Router();

api.get('/estados', estadoController.getEstado);
api.post('/addEstado', estadoController.addEstado);
api.put('/updateEstado/:id', estadoController.updateEstado);
api.delete('/deleteEstado/:id', estadoController.deleteEstado);


module.exports = api;