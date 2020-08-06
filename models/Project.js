var mongoose = require('mongoose');

const Project=mongoose.model("Project",
new mongoose.Schema({  
    name:String,
    description:String,
    UID:[
        {   
        type: mongoose.Schema.Types.ObjectId,
        name:String,
        ref: "User"
        }
    ],
    created_by:String,
    created: {type: Date, default: Date.now},
    updated: {type: Date, default: Date.now}
}));
//moment().format(); 
module.exports = Project; 