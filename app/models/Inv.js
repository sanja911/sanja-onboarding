const mongoose = require('mongoose');
const InvSchema = new mongoose.Schema({
    
    inv_date :{
        type:Date,default:Date.now
        
    },
    id_user:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }]
        
    
},{
    timestamps: true
})

module.exports = mongoose.model('Inv',InvSchema);