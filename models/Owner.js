var mongoose = require('mongoose');
var moment = require('moment');
const Owner=mongoose.model("Owner",
new mongoose.Schema({  
    name: String,
    user:{
        type: String,
        enum : ['Organization','Manager', 'Member'],
        default: 'Member'
    },
    project:[
        {   
        type:String
        
        }
    ],
    created: {type: Date, default: Date.now},
    updated: {type: Date, default: Date.now},
    project:String
}));

//moment().format(); 
module.exports = Owner; 