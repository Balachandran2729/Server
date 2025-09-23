const mongoose = require('mongoose');

const testdataSchema = new mongoose.Schema({
    header : {
        type: String,
    },
    image : {
        type: String,
    } ,
    description : {
        type: String,
    },
    about : {
        type: String,
    },
    about2 : {
        type: String,
    },
    subheading : {
        type: String,
    },
});

module.exports = mongoose.model('test_data', testdataSchema);