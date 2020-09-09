const mongoose  = require('mongoose');
const TaskSchema = new mongoose.Schema({
    projectId:[
        {type: mongoose.Schema.Types.ObjectId,ref:'Project'}
    ],
    summary:{
        type:String,
    },
    description :{
        type: String
    },
  
    createdBy:{
        type:String
    },
    dueDate:{
        type:Date, default:Date.now
    },
    status:{
        type:String,
        enum:['To Do','On Progress','Done'],
        default:'To Do'
    },
    assignee:{
        type:String
    }
},{
    timestamps:true
})

module.exports = mongoose.model('Task',TaskSchema);