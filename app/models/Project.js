const mongoose  = require('mongoose');
const ProjSchema = new mongoose.Schema({
    projName:{
        type:String
    },
    description :{
        type: String
    },
    users :[{
        userId:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
        role:{type:String,enum:['Owner','Manager','Member'], default:'Member'}
    }],
    task:[{
        type:mongoose.Schema.Types.ObjectId,ref:'Task'
    }]
   
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