const mongoose = require('mongoose');

const URL_SCHEMA = mongoose.Schema({
    longUrl:{
        type:String,
        required:true
    },
    shortURL:{
        type:String,
    },
    options:{
        type:[String],        
    },
    clicks:{
        type:Number,
        default: 0
    }
}, {timestamps:true});

const URL = mongoose.model('url',URL_SCHEMA);

module.exports = URL;