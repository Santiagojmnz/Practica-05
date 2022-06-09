'use strict'
var Estado = require('../models/estado');

function addEstado(req, res) {
    const estado = new Estado(req.body);
    const params = req.body;
    console.log(params.name);

    if (params.name === null || params.name === undefined || params.name == "") {
        res.status(500).send({ message: "Información incompleta" })

    } else {

        Estado.find({ name: params.name })

        .then((estados) => {
            if (estados.length) {
                res.status(500).send({ message: 'Estado existente name: ' + params.name });
            } else {
                estado.save();
                res.status(200).send({ message: 'Estado registrado' });
            }

        }).catch((err) => res.status(500).send({ error }));
    }

}

function getEstado(req, res) {
    Estado.aggregate([{ $lookup: { from: 'municipios', localField: '_id', foreignField: 'estado', as: 'municipios' } }])

    .then(estados => {

        return res.status(200).send({ estados });
    }).catch(error => res.status(500).send({ message: 'No se tiene registro de estados' }));

}

function updateEstado(req, res) {
    var estadoId = req.params.id;
    var params = req.body;
    Estado.findByIdAndUpdate(estadoId, params)
        .then((estadoUpdate) => {
            if (estadoUpdate) {
                res.status(200).send({ message: 'Estado actualizado' });
            } else {
                res.status(500).send({ message: 'No se encontro el estado' });
            }

        }).catch((err) => {
            res.status(500).send({ message: 'Error al actualizar el estado' });

        });
}

function deleteEstado(req, res) {
    var estadoId = req.params.id;
    Estado.findByIdAndDelete({ _id: estadoId })

    .then(estado => {
        if (estado) {
            res.status(200).send({ message: 'Estado eliminado' });
        } else {
            res.status(500).send({ message: 'No se encontro el estado' });
        }
    }).catch((err) => {
        res.status(500).send({ message: 'Error al eliminar el estado' });

    });
}

module.exports = {
    addEstado,
    getEstado,
    updateEstado,
    deleteEstado
}