'use strict'
const { Schema, model } = require('mongoose');

const EstadoSchema = new Schema({
    name: {
        type: String,
        unique: true,
        trim: true
    }


});

module.exports = model('estado', EstadoSchema);