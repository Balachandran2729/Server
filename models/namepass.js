const mongoose = require('mongoose');

const namepassSchema = new mongoose.Schema({

    name :{
        type: String,
        required: true,
        unique: true
    },
    password :{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('name_pass', namepassSchema);