'use strict'
const {Schema, model} = require('mongoose');
const municipioSchema = new Schema({
    name: {
        type: String,
    },
    estado: {
        type: Schema.ObjectId,
        ref: 'municipio',
        require
    }
});
module.exports = model('Municipios', municipioSchema);