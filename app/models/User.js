const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    name :{
        type:String,
        
    },
    username: {
        type:String,
    },
    email: {
        Type:String,
    },
    password: {
        Type:String,
    },

    project : [
        {type: mongoose.Schema.Types.ObjectId,ref:'Project'}
    ],
    user_id : [
        {type: mongoose.Schema.Types.ObjectId,ref:'User'}
    ],
  
},{
    timestamps: true
})

module.exports = mongoose.model('User',UserSchema);