const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        index:true,
        unique:true,
        required : true,
    },
    info: {
        type:Object,
        index : true,
    },
    hash : {
        type:String,
        index : true,
        unique : true,
        required : true,
    },
    created : {
        type : Date,
        index : true,
        default : Date.now,
    },
    activated : {
        type : Boolean,
    },
});
module.exports = mongoose.model('User', userSchema);