'use strict'
const {Schema, model} = require('mongoose');

const localidadSchema = new Schema({
    name: {
        type: String,
        require,
        unique: true
    },
    CP: {
        type: String,
        require
    },
    mun_Id: {
        type: Schema.ObjectId,
        ref: 'municipio',
        require
    },
});
module.exports = model('Localidades', localidadSchema);