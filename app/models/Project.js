const mongoose  = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('../../config');
const auth = require('../middleware/auth');
const jwtdecode = require('jwt-decode');
const ProjSchema = new mongoose.Schema({
    projName:{
        type:String
    },
    description :{
        type: String
    },
    users :[{
        _id:false,
        userId:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
        role:{type:String,enum:['Owner','Manager','Member'], default:'Member'}
    }],
    organizationId :{
        type:mongoose.Schema.Types.ObjectId,ref:'Organization'
    },
    task:[{
        type:mongoose.Schema.Types.ObjectId,ref:'Task'
    }]
   
   
},{
    timestamps:true
})

module.exports = mongoose.model('Project',ProjSchema);
