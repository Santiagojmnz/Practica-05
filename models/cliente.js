const { Schema, model } = require('mongoose');
const ClienteSchema = new Schema({
    name: {
        type: String,
        trim: true,
        require
    },
    surname: {
        type: String,
        trim: true,
        require
    },
    rfc: {
        type: String,
        trim: true,
        unique: true,
        uppercase: true,
        require
    },
    adress: {
        localidad: {
            type: Schema.ObjectId,
            ref: 'localidades',
            require


        },
        calle: {
            type: String,
            require
        },
        noExt: {
            type: Number,
            require
        },
        noInt: {
            type: Number
        }
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        lowercase: true,
        require
    },
    phone: {
        type: String,
        trim: true,
        require,
        unique: true
    },
    status: {
        type: String,
        lowercase: true,
    }
});
module.exports = model('cliente', ClienteSchema);