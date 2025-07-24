const mongo  = require('mongoose');

const Schema  = mongo.Schema({
    nom:{
        type:String,
        required:true
    },
    prenom :{
        type:String,
        required:true
    },
    email: {
        type:String ,
        required:true
    },
    age: {
        type:Number,
        required:true
    },
    dateInscription:{
        type:Date,
        default:Date.now
    }

})


module.exports =  mongo.model('User',Schema);