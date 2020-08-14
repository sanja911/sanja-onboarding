const mongoose = require('mongoose');
const OrganizattionSchema = new mongoose.Schema({
    name :{
        type:String,
        
    },
    user: {
        type:String,
        enum : ['Owner','Manager', 'Member'],
        default: 'Member'
    },

   /* created: 
    {   type: Date, default: Date.now
    
    },
    updated: {
        type: Date, default: Date.now
    },*/       
    /*project : [
        {type: mongoose.Schema.Types.ObjectId,ref:'Project'}
    ],*/ 
    user_id : [
        {type: mongoose.Schema.Types.ObjectId,ref:'User'}
    ]
},{
    timestamps: true
})

module.exports = mongoose.model('Organization',OrganizattionSchema); 