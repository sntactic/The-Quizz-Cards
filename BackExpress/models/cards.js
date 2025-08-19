const mongoose = require('mongoose') ;

cardSchema = mongoose.Schema({
    "domaine" : {type : String, required : true},
    "categorie" : {type : String, required : true},
    "question" : {type : String, required : true},
    "reponse" : {type : String, required : true} ,
    "explication" : {type : String},
    "publication" : {type : String, required : true},
    "date" : {type : Date , required : true},
    "userID" : {type : String, required : true}
})

module.exports = mongoose.model('Card', cardSchema,'cards')