var mongoose = require('mongoose');
const Task=mongoose.model("Task",
new mongoose.Schema({  
    summary:String,
    description:String,
    created_by:String,
    due_date:{type:Date,default:Date.now},
    status:{
        type: String,
        enum : ['To Do','On Progress', 'Done'],
        default: 'To Do'
    },
    assignee:{type:Date,default:Date.now},
    created: {type: Date, default: Date.now},
    updated: {type: Date, default: Date.now}
}));
//moment().format(); 
module.exports = Task; 