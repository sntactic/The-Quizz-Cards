const mongoose = require('mongoose') ;

cardSchema = mongoose.Schema({
    "id" : {type : String, required : false},
    "name" : {type : String, required : true},
    "email" : {type : String, required : true, unique: true},
    "password" : {type : String, required : true}
})

module.exports = mongoose.model('User', cardSchema,'users')