'use Strict'
const Localidades = require('../models/localidad');

//Agregar Localidad
exports.add = async (req, res, next) => {
    const localidad = new Localidades(req.body);
    try {
        
            await localidad.save();
            res.json({ message: 'Se creó una nueva localidad' });

    } catch (error) {
        console.error(error);
        res.send(error);
        next();
    }
};

//Actualizar Localidad
exports.update = async (req, res, next) => {
    try {
        const localidades = await Localidades.findOneAndUpdate({ _id: req.params.id },
            req.body
        );
        res.json({ message: 'Localidad actualizada correctamente' });
    } catch (error) {
        res.status(400).json({ message: 'Error al procesar la peticion' });
        next();
    }
}

//Mostrar Localidades
exports.list = async (req, res, next) => {
    try {
        const localidades = await Localidades.aggregate([{ $lookup: { from: 'municipios', localField: 'mun_Id', foreignField: '_id', as: 'Municipio' } }]);
        res.json(localidades);
    } catch (error) {
        console.error(error);
        res.send(error);
        next();
    }
};

//Eliminar Localidad
exports.delete = async (req, res, next) => {
    try {
        await Localidades.findOneAndDelete({ _id: req.params.id });
        res.json({ message: 'La Localidad ha sido eliminado' });
    } catch (error) {
        res.status(400).json({ message: 'Error al procesar la petición' });
    }
}
