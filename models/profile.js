const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({

    name : {
        type : String,
        required : true
    },
    username : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        default : null,
        required : true
    },
    email : {
        type : String,
        required : true,
    } ,
    photo : {
        type : String
    },
    skill : { type : [String] }, bio : { type : String} , education : {type : String },
    phone :{ type : String}, gender:{type : String}, dob:{type : String}, location : {type : String} ,
    experience : { type : String}, 
});

module.exports = mongoose.model('Profile', profileSchema);