const mongoose = require('mongoose');
const OrganizationSchema = new mongoose.Schema({
    name :{
        type:String,
        
    },
    users :[{
      userId:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
      role:{type:String,enum:['Owner','Manager','Member'], default:'Member'}
      }]
},{
    timestamps: true
});


module.exports = mongoose.model('Organization',OrganizationSchema); 