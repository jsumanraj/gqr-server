const mongoose = require("mongoose");
const  roschema=mongoose.Schema({
    usename:{
        type:String,
        default:"dubby"
    },
    phonenumber:{
        type:String,
        default:"1234567891"

    },
    reason:{
        type:String,
        default:"nothing"
    },
    trust:{
        type:Boolean,
        default:false
    },
    feedback:{
        type:String,
        default:"reason"
    },
    verified:{
        type:Boolean,
        default:false
    },
})
module.exports=mongoose.model('Return',roschema)

