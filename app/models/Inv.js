const mongoose = require('mongoose');
const InvSchema = new mongoose.Schema({
    description:{
        type:String
    },
    inv_date :{
        type:Date,default:Date.now
        
    },
    id_user: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Owner'
    } 
},{
    timestamps: true
})

module.exports = mongoose.model('Inv',InvSchema);