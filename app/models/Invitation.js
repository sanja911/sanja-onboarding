const mongoose = require('mongoose');
const InvSchema = new mongoose.Schema({
    
    invDate :{
        type:Date,default:Date.now
        
    },
    userId:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }]},
{
    timestamps: true
})

module.exports = mongoose.model('Invitation',InvSchema);