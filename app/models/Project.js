const mongoose  = require('mongoose');
const ProjSchema = new mongoose.Schema({
    proj_name:{
        type:String,
    },
    description :{
        type: String
    },
    user :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Owner'
    },
    /*Created:{
        type:Date, default:Date.now
    },
    Updated:{
        type:Date, default:Date.now
    }*/
},{
    timestamps:true
})

module.exports = mongoose.model('Project',ProjSchema);