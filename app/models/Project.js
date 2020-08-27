const mongoose  = require('mongoose');
const ProjSchema = new mongoose.Schema({
    projName:{
        type:String
    },
    role:{
        type:String,  enum : ['Owner','Manager', 'Member'],
        default: 'Member'
    },
    description :{
        type: String
    },
    userid :[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    task:[{
        type:mongoose.Schema.Types.ObjectId
        ,ref:'Task'
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