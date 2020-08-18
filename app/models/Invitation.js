const mongoose = require('mongoose');
const InvSchema = new mongoose.Schema({
    
    inv_date :{
        type:Date,default:Date.now
        
    },
    user_id:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }]},
{
    timestamps: true
})

module.exports = mongoose.model('Invitation',InvSchema);