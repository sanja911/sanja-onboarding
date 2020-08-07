var mongoose = require('mongoose');
var moment = require('moment');
const User=mongoose.model("User",
new mongoose.Schema({  
    name: String,
    username:String,
    email:String,
    created: {type: Date, default: Date.now},
    updated: {type: Date, default: Date.now},
    organization:[
        {   
        type: mongoose.Schema.Types.ObjectId,
        name:String,
        ref: "Owner"
        }
    ],
    project:[
        {
        type: mongoose.Schema.Types.ObjectId,
        name:String,
        ref: "Project" 
        }
    ]
}));

//moment().format(); 
module.exports = User; 