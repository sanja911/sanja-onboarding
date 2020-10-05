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
/*UserSchema.pre('create',function(next){
    this.password = bcrypt.hashSync(this.password, saltRounds);
    next()
})*/
UserSchema.methods.comparePassword = function (input, callback) {
    bcrypt.compare(input, this.password, function (err, isMatch) {
        if (err) return callback(err);
        callback(null, isMatch);
    });
};

module.exports = mongoose.model('User',UserSchema);