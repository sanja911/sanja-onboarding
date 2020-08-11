const mongoose  = require('mongoose');
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
    org_id:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Organization'
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