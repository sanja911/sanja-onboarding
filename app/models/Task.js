const mongoose  = require('mongoose');
const TaskSchema = new mongoose.Schema({
    project:[
        {type: mongoose.Schema.Types.ObjectId,ref:'Project'}
    ],
    summary:{
        type:String,
    },
    description :{
        type: String
    },
  
    created_by:{
        type:String
    },
    due_date:{
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