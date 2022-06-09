'use strict'
var express = require('express');
var clienteController = require('../controllers/clienteController');
const cliente = require('../models/cliente');
var api = express.Router();

api.post('/addCliente', clienteController.addCliente);
api.get('/clientes', clienteController.getCliente);
api.put('/updateCliente/:id', clienteController.updateCliente);
api.delete('/deleteCliente/:id', clienteController.deleteCliente);

module.exports = api;