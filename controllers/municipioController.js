'use Strict'
const Municipios = require('../models/municipio');

//Agregar Municipio
exports.add = async (req, res, next) => {
    const municipio = new Municipios(req.body);
    try {
        await municipio.save();
        res.json({ message: 'Se creó un nuevo municipio' })

    } catch (error) {
        console.error(error);
        res.send(error);
        next();
    }
};

//Actualizar Municipio
exports.update = async (req, res, next) => {
    try {
        const municipio = await Municipios.findOneAndUpdate({ _id: req.params.id },
            req.body
        );
        res.json({ message: 'Municipio actualizado correctamente' });
    } catch (error) {
        res.status(400).json({ message: 'Error al procesar la petición' });
        next();
    }
}

//Mostrar Municipios
exports.getLocalidades = async (req, res, next) => {
    try {
        const municipios = await Municipios.aggregate([{ $lookup: { from: 'localidades', localField: '_id', foreignField: 'mun_Id', as: 'Localidades' } }]);
        res.json(municipios);
    } catch (error) {
        console.error(error);
        res.send(error);
        next();
    }
};

//Eliminar Municipio
exports.delete = async (req, res, next) => {
    try {
        await Municipios.findOneAndDelete({ _id: req.params.id });
        res.json({ message: 'El municipio ha sido eliminado' });
    } catch (error) {
        res.status(400).json({ message: 'Error al procesar la petición' });
    }
}

