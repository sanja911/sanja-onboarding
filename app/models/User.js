const mongoose  = require('mongoose');
const bcrypt = require('bcryptjs')
const saltRounds = 10
const UserSchema = new mongoose.Schema({
    name:{
        type:String
    },
    username :{
        type: String
    },
    email :{
        type: String
    },
    password :{
        type: String
    },
    project :[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Project'
    }],
    orgId:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Organization'
    }],
    invId:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Inv'
    }]
   
    /*Created:{
        type:Date, default:Date.now
    },
    Updated:{
        type:Date, default:Date.now
    }*/
},{
    timestamps:true
})


module.exports = mongoose.model('User',UserSchema);
