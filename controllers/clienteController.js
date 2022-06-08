'use strict'
var Cliente = require('../models/cliente');

function addCliente(req, res, next) {
    const cliente = new Cliente(req.body);
    const params = req.body;
    cliente.status = "activo";
    if (cliente.name != null && cliente.surname != null && cliente.rfc != null && cliente.adress.localidad != null && cliente.adress.calle != null && cliente.adress.noExt != null && cliente.email != null && cliente.phone != null && cliente.name != "" && cliente.surname != "" && cliente.rfc != "" && cliente.adress.localidad != "" && cliente.adress.calle != "" && cliente.adress.noExt != "" && cliente.email != "" && cliente.phone != "") {
        Cliente.find({ rfc: cliente.rfc })
            .then((rfcClient) => {
                if (rfcClient.length) {

                    return res.status(500).send({ message: 'El RFC ingresado ya se encuentra en uso: ' + cliente.rfc });

                }
                Cliente.find({ email: cliente.email })
                    .then((emailClient) => {
                        if (emailClient.length) {

                            return res.status(500).send({ message: 'El email ingresado ya se encuentra en uso: ' + cliente.email });

                        }
                        Cliente.find({ phone: cliente.phone })
                            .then((phoneClient) => {
                                if (phoneClient.length) {

                                    return res.status(500).send({ message: 'El telefono ingresado ya se encuentra en uso: ' + cliente.phone })

                                } else {

                                    cliente.save();
                                    return res.status(200).send({ message: 'Cliente registrado' })

                                }

                            })
                    })


            }).catch((err) => { res.status(500).send({ err }) });

    } else {
        res.status(500).send({ message: "Información incompleta" })

    }
}

function getCliente(req, res) {
    Cliente.aggregate([{
                $lookup: {
                    from: 'localidades',
                    localField: 'adress.localidad',
                    foreignField: '_id',
                    as: 'adress.localidad'
                }
            },
            {
                $lookup: {
                    from: 'municipios',
                    localField: 'adress.localidad.mun_Id',
                    foreignField: '_id',
                    as: 'adress.municipio'
                }
            },
            {
                $lookup: {
                    from: 'estados',
                    localField: 'adress.municipio.estado',
                    foreignField: '_id',
                    as: 'adress.estado'
                }
            }, {
                $project: {
                    _id: 1,
                    name: 1,
                    surname: 1,
                    rfc: 1,
                    adress: {
                        localidad: {
                            name: 1
                        },
                        calle: 1,
                        noExt: 1,
                        noInt: 1,
                        municipio: {
                            name: 1
                        },
                        estado: {
                            name: 1
                        }
                    },
                    email: 1,
                    phone: 1,
                    status: 1
                }
            }
        ])
        .then(clientes => {

            return res.status(200).send({ clientes });
        }).catch(error => res.status(500).send({ message: 'No se tiene registro de estados' }));


}

function updateCliente(req, res) {
    var clienteId = req.params.id;
    var cliente = req.body;

    if (cliente.name != null && cliente.surname != null && cliente.rfc != null && cliente.adress.localidad != null && cliente.adress.calle != null && cliente.adress.noExt != null && cliente.email != null && cliente.phone != null && cliente.name != "" && cliente.surname != "" && cliente.rfc != "" && cliente.adress.localidad != "" && cliente.adress.calle != "" && cliente.adress.noExt != "" && cliente.email != "" && cliente.phone != "") {

        Cliente.find({ _id: { $ne: clienteId }, rfc: cliente.rfc })
            .then((rfcClient) => {
                if (rfcClient.length) {

                    return res.status(500).send({ message: 'El RFC ingresado ya se encuentra en uso: ' + cliente.rfc });

                }
                Cliente.find({ _id: { $ne: clienteId }, email: cliente.email })
                    .then((emailClient) => {
                        if (emailClient.length) {

                            return res.status(500).send({ message: 'El email ingresado ya se encuentra en uso: ' + cliente.email });

                        }
                        Cliente.find({ _id: { $ne: clienteId }, phone: cliente.phone })
                            .then((phoneClient) => {
                                if (phoneClient.length) {

                                    return res.status(500).send({ message: 'El telefono ingresado ya se encuentra en uso: ' + cliente.phone })

                                } else {

                                    Cliente.findByIdAndUpdate(clienteId, cliente)
                                        .then((clienteUpdate) => {
                                            if (clienteUpdate) {
                                                return res.status(200).send({ message: 'Cliente actualizado' });
                                            } else {
                                                return res.status(500).send({ message: 'No se encontro el cliente' });
                                            }

                                        }).catch((err) => {
                                            return res.status(500).send({ message: 'Error al actualizar el cliente' });

                                        });
                                }
                            })
                    })

            }).catch((err) => { res.status(500).send({ err }) });
    } else {
        res.status(500).send({ message: 'Informacion incompleta' })
    }
}

function deleteCliente(req, res) {
    var clienteId = req.params.id;
    Cliente.findByIdAndDelete(clienteId)

    .then(cliente => {
        if (cliente) {
            res.status(200).send({ message: 'Cliente eliminado' });
        } else {
            res.status(500).send({ message: 'No se encontro el cliente' });
        }
    }).catch((err) => {
        res.status(500).send({ message: 'Error al eliminar el cliente' });

    });
}


module.exports = {
    addCliente,
    getCliente,
    updateCliente,
    deleteCliente
}