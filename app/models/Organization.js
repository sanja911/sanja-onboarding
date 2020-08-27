const mongoose = require('mongoose');
const OrganizationSchema = new mongoose.Schema({
    name :{
        type:String,
        
    },
    users :{
        id:[
            {type:mongoose.Schema.Types.ObjectId,ref:'User'}
           ],
           role:{type:String}},
        
},{
    timestamps: true
});


module.exports = mongoose.model('Organization',OrganizationSchema); 