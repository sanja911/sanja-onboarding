const mongoose = require('mongoose');
const OwnerSchema = new mongoose.Schema({
    name :{
        type:String,
        
    },
    user: {
        type:String,
        enum : ['Organization','Manager', 'Member'],
        default: 'Member'
    },

   /* created: 
    {   type: Date, default: Date.now
    
    },
    updated: {
        type: Date, default: Date.now
    },*/       
    project : [
        {type: mongoose.Schema.Types.ObjectId,ref:'Project'}
    ],
    user_id : [
        {type: mongoose.Schema.Types.ObjectId,ref:'User'}
    ],
    inv_id :[
        {type:mongoose.Schema.Types.ObjectId,ref:'Inv'}
    ]
},{
    timestamps: true
})

module.exports = mongoose.model('Owner',OwnerSchema);